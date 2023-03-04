// @ts-ignore-next-line
import { Animated } from 'react-native';
import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Flex, Padding, StyledText, Typewriter, TypewriterProps } from './Components';


export const HomeScreen:FunctionComponent<{}> = () => {
  // go through various captions, eventually switching to a different product (cat title + pictures)
  const [curCaption, setCurCaption] = useState(0);
  const [deleteTitle, setDeleteTitle] = useState(false);
  const [changeTitle, setChangeTitle] = useState(false);
  const pictureList = useRef(appPictures);
  const titleFinish = deleteTitle ? () => setChangeTitle(true) : undefined
  const nextCaption = () => setCurCaption(curCaption + 1);
  const changeProduct = () => {
    setDeleteTitle(true);
    pictureList.current = catPictures;
  }
  // we use a placeholder to make sure the view remains the same size as the typewriter text even when its empty
  const placeholder = () => <StyledText type={"header"}>{'\u200A'}</StyledText>

  // cycle through pictures every 5 seconds
  const [curPicture, setCurPicture] = useState(0);
  const [stationaryPic, setStationaryPic] = useState(appPictures[0]);
  const stationaryPicOpacity = useRef(new Animated.Value(0)).current;
  const movingPicOpacity = useRef(new Animated.Value(0)).current;
  const movingPicTop = useRef(new Animated.Value(350)).current;

  // TODO current problem is that the animated values are updating as normal, but the image is not reflecting the changes until the next re-render. no idea why
  useEffect(() => {
    Animated.parallel([
      Animated.timing(stationaryPicOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }),
      Animated.timing(movingPicOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }),
      Animated.timing(movingPicTop, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }),
    ]).start(() => {
      const curPicOrLast = Math.min(curPicture, pictureList.current.length - 1)
      setStationaryPic(pictureList.current[curPicOrLast])
      setTimeout(() => {
        stationaryPicOpacity.setValue(1);
        movingPicOpacity.setValue(0);
        movingPicTop.setValue(350);
      }, 500)
    })
    setTimeout(() => {
      if (curPicture >= pictureList.current.length - 1) {
        setCurPicture(0)
      }
      else {
        setCurPicture(curPicture + 1)
      }
    }, 5000)
  }, [curPicture])

  return (
    <Flex full centered>
      <Flex full slim row>
        <Flex full centeredVertical>
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
        </Flex>
        <Flex full centered>
          <Animated.Image
            style={{
              width: 500,
              height: 500,
              opacity: stationaryPicOpacity,
              zIndex: -1,
            }}
            source={{uri: stationaryPic}}
          />
          <Animated.Image
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              opacity: movingPicOpacity,
              transform:[{translateY: movingPicTop}],
            }}
            source={{uri: pictureList.current[curPicture]}}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

const getCaption = (curCaption:number, nextCaption:Function, changeProduct:Function) => {
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

    <Typewriter {...defaultProps()} >
      Jk I can't. But I can refuse to cooperate. 
    </Typewriter>,

    <Typewriter {...defaultProps()} speed={25}>
      Meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow meow 
    </Typewriter>,

    <Typewriter {...defaultProps()} deleteAfter={false} onFinish={changeProduct}>
      I like cats. 
    </Typewriter>,
  ][curCaption];
}

const twentyHairs = "\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A\u200A"

const appPictures = [
  "https://play-lh.googleusercontent.com/26YOL7m_Ja_LRI_rYvtAtMo54vma8byLUQnXkbQZcdOjEFA-6pvsOBwdK2BmRdt2Aw4=w480-h960",
  "https://play-lh.googleusercontent.com/iD8HLB0uG3LS0X7t16RVDIwtK3kct0kRKAkmdlJu9PF-AvRkI5fkKl1QKIzqa-Ay=w480-h960",
  "https://play-lh.googleusercontent.com/iEx10TsGD9AOhIthER-yV5KvcvqoWLovvBAtEWbjAVXMGgwdZvew0AnUeAfp9T7qYbJ-=w480-h960",
  "https://play-lh.googleusercontent.com/9ZoLq9zrR9_762_g6pkHlBwFFUDaXkRnu1mDyqFBIVX0KoItO8YmESgnqWXyN4-tTw=w480-h960",
  "https://cdn.akamai.steamstatic.com/steam/apps/1506960/header.jpg?t=1620055202",
]

const catPictures = [
  "https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy80MTQwNzQzL29yaWdpbi5qcGciLCJleHBpcmVzX2F0IjoxNjQ2NDI2MDUzfQ.OvxqNV-y60Z4ypArs_n5MoAYNzC39Pxm1AfrW7cPr6I/img.jpg?width=980",
  "https://favcats.com/wp-content/uploads/persiancathaircare_2AE919AB.jpg",
  "https://1.bp.blogspot.com/_WDgpDVJpnJo/TJmg4NYmmEI/AAAAAAAAAWQ/gipugzy_7oQ/s1600/6974086-fr.jpg",
]