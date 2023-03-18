// @ts-ignore-next-line
import { Text } from 'react-native';
import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { Flex, Padding, StyledText, Typewriter, TypewriterProps } from '../Components';
import { ThemeContext } from '../Theme';

export const CAT_CAPTION = 10
const CAT_MODE_KEY = "laplantAppsCatMode 90124986496340230485789523042983752"
const CAT_CLARIFICATION_DELAY = 20 * 1000

type HomeScreenMessageProps = {
  setCatMode: (mode:boolean) => void;
}

// This component is used to display the home screen messages. These are typed onto the screen one at a time,
// changing to the next one after a short delay. Eventually, the final message will cause the homescreen to 
// switch to showing a cat-themed product
export const HomeScreenMessage:FunctionComponent<HomeScreenMessageProps> = ({ setCatMode }) => {
  const theme = useContext(ThemeContext);
  // lookup if we're already in cat mode from previous sessions
  const startWithCatModeText = React.useRef(Boolean(localStorage.getItem(CAT_MODE_KEY))).current
  const [curCaption, setCurCaption] = useState(startWithCatModeText ? CAT_CAPTION: 0);
  const [deleteTitle, setDeleteTitle] = useState(startWithCatModeText);
  const [changeTitle, setChangeTitle] = useState(false);
  const titleFinish = deleteTitle ? () => {
    setCatMode(true)
    setChangeTitle(true)
   } : undefined
  const nextCaption = () => setCurCaption(curCaption + 1);
  // when we change to cat mode, change the title and pictures.
  // also setup a 20sec timer to show the extended cat caption
  const changeProduct = () => {
    setDeleteTitle(true);
    setCurCaption(curCaption + 1)
    setTimeout(() => {
      setCurCaption((cur) => cur + 1)
    }, CAT_CLARIFICATION_DELAY)
  }
  // if we start in cat mode, setup a 20sec timer to show the extended cat caption
  useEffect(() => {
    if (startWithCatModeText) {
      setTimeout(() => {
        setCurCaption(curCaption + 1)
      }, CAT_CLARIFICATION_DELAY)
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
      <Flex row style={{ height: theme.messageHeightHolder }}>
        { placeholder() }
        { getCaption(curCaption, nextCaption, changeProduct) }
      </Flex>
    </>
  )
}

// this allows us to step through our list of captions simply
export const getCaption = (curCaption:number, nextCaption:Function, changeProduct:Function) => {
  let counter = 0;
  // all captions share the same default props, but some are overriden to change speed, etc for certain captions
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

    // We use hairs here for consistent spacing and speed
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

    // Once the user sees the next caption (the meows), we assume they've made it to cat mode on subsequent visits
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
    
    // We have a duplicate of the caption here so that we can show the extended caption appropriately on subsequent loads
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
