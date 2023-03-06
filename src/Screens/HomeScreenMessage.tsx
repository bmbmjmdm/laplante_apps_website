// @ts-ignore-next-line
import { Text } from 'react-native';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Flex, Padding, StyledText, Typewriter, TypewriterProps } from '../Components';

export const CAT_CAPTION = 10
const CAT_MODE_KEY = "laplantAppsCatMode 90124986496340230485789523042983752"

type HomeScreenMessageProps = {
  setCatMode: (mode:boolean) => void;
}

export const HomeScreenMessage:FunctionComponent<HomeScreenMessageProps> = ({ setCatMode }) => {
  const startWithCatModeText = React.useRef(Boolean(localStorage.getItem(CAT_MODE_KEY))).current
  // go through various captions, eventually switching to a different product (cat title + pictures)
  const [curCaption, setCurCaption] = useState(startWithCatModeText ? CAT_CAPTION: 0);
  const [deleteTitle, setDeleteTitle] = useState(startWithCatModeText);
  const [changeTitle, setChangeTitle] = useState(false);
  const titleFinish = deleteTitle ? () => {
    setCatMode(true)
    setChangeTitle(true)
   } : undefined
  const nextCaption = () => setCurCaption(curCaption + 1);
  const changeProduct = () => {
    setDeleteTitle(true);
    setCurCaption(curCaption + 1)
    setTimeout(() => {
      setCurCaption((cur) => cur + 1)
    }, 20 * 1000)
  }
  // if we start in cat mode, setup a 20sec timer to show the extended caption still
  useEffect(() => {
    if (startWithCatModeText) {
      setTimeout(() => {
        setCurCaption(curCaption + 1)
      }, 20 * 1000)
    }
  }, [])

  // we use a placeholder to make sure the view remains the same size as the typewriter text even when its empty
  const placeholder = () => <StyledText type={"header"}>{'\u200A'}</StyledText>
    
  return (
    <>
      <Flex row>
        { placeholder() }
        {!changeTitle && (
          <Typewriter type={"header"} startFull deleteAfter={deleteTitle} onFinish={titleFinish}>
            LaPlante Apps
          </Typewriter>
        )}
        {changeTitle && (
          <Typewriter type={"header"}>
            LaCat Apps :3
          </Typewriter>
        )}
      </Flex>
      <Padding vertical={15} />
      <Flex row style={{ height: 100 }}>
        { placeholder() }
        { getCaption(curCaption, nextCaption, changeProduct) }
      </Flex>
    </>
  )
}

export const getCaption = (curCaption:number, nextCaption:Function, changeProduct:Function) => {
  let counter = 0;
  const defaultProps = ():Omit<TypewriterProps, "children"> & {key: number} => {
    counter++;
    return {
      key: counter,
      deleteAfter: true,
      speed: 50,
      deleteSpeed: 20,
      pauseTime: 500,
      onFinish: nextCaption,
      type: "caption",
    }
  }
  return [
    <Typewriter {...defaultProps()} pauseTime={1000} >
      This is a caption that I'll make informative and interesting and everything :). Not that you're reading it. Oh, you are? Ok, here we go!
    </Typewriter>,

    <Typewriter {...defaultProps()} pauseTime={1000} >
      This site is dedicated to LaPlante Apps (well, I guess that's obvious), a little business that makes mobile apps, board games, computer games, and more!{twentyHairs} .  .  .  Happy?
    </Typewriter>,

    <Typewriter {...defaultProps()} pauseTime={1000} >
      .  .  .  You're still here? I mean, it's just a landing page. Not much to see  .  .  .
    </Typewriter>,

    <Typewriter {...defaultProps()} >
      Navigate elsewhere, wierdo. 
    </Typewriter>,

    <Typewriter {...defaultProps()} >
      FOR REAL NOW
    </Typewriter>,

    <Typewriter {...defaultProps()} >
      I CANT KEEP DOING THIS FOREVER
    </Typewriter>,

    <Typewriter {...defaultProps()} >
      Or can I?
    </Typewriter>,

    <Typewriter {...defaultProps()} onFinish={() => {
      nextCaption();
      localStorage.setItem(CAT_MODE_KEY, "yes")
    }}>
      Jk I can't. But I can refuse to cooperate. 
    </Typewriter>,

    <Typewriter {...defaultProps()} speed={25}>
      Meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow 
    </Typewriter>,

    <Typewriter {...defaultProps()} deleteAfter={false} onFinish={changeProduct}>
      I like cats. 
    </Typewriter>,
    
    <StyledText type={"caption"}>
      I like cats. 
    </StyledText>,

    <Text>
      <StyledText type={"caption"}>
        I like cats. 
      </StyledText>
      <Typewriter {...defaultProps()} pauseTime={5000} onFinish={undefined}>
        {"    .    .    .    (Actually it would be spelled LeChatte)"}
      </Typewriter>,
    </Text>,
  ][curCaption];
}

const twentyHairs = "\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A"
