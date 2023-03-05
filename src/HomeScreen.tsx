// @ts-ignore-next-line
import { Animated, Easing, Text, Image, Dimensions } from 'react-native';
import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Flex, Padding, StyledText, Typewriter, TypewriterProps } from './Components';
import { easeOutBack } from './CustomEasing';
// @ts-ignore-next-line
import phone_back from './assets/phone_back.png';
// @ts-ignore-next-line
import phone_front from './assets/phone_front.png';
import CardFlip, {CardFlipRef} from './CardFlip';

const FINAL_CAPTION = 10
const CAT_MODE_KEY = "laplantAppsCatMode 90124986496340230485789523042983752"

// TODO make images responsive
// TODO extra out hardcoded styles/etc
export const HomeScreen:FunctionComponent<{}> = () => {
  // if the user already saw the cat mode (or close enough), we want to start in cat mode
  const alreadyInCatMode = React.useRef(Boolean(localStorage.getItem(CAT_MODE_KEY))).current

  // go through various captions, eventually switching to a different product (cat title + pictures)
  const [curCaption, setCurCaption] = useState(alreadyInCatMode ? FINAL_CAPTION: 0);
  const [deleteTitle, setDeleteTitle] = useState(alreadyInCatMode);
  const [changeTitle, setChangeTitle] = useState(false);
  const catMode = useRef(false);
  const titleFinish = deleteTitle ? () => {
    catMode.current = true;
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
    if (alreadyInCatMode) {
      setTimeout(() => {
        setCurCaption(curCaption + 1)
      }, 20 * 1000)
    }
  }, [])

  // we use a placeholder to make sure the view remains the same size as the typewriter text even when its empty
  const placeholder = () => <StyledText type={"header"}>{'\u200A'}</StyledText>

  // animate in a phone with a picture of the app on it
  const windowHeight = Dimensions.get('window').height/2;
  const phoneTop = useRef(new Animated.Value(windowHeight)).current;
  const phoneScale = useRef(new Animated.Value(1.25)).current;
  const cardRef = useRef<CardFlipRef>(null);
  const [phoneDone, setPhoneDone] = useState(false);

  useEffect(() => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(phoneTop, {
        toValue: windowHeight - 500,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.delay(500),
      Animated.timing(phoneTop, {
        toValue: windowHeight,
        duration: 4000,
        useNativeDriver: false
      }),
      Animated.delay(800),
      Animated.timing(phoneTop, {
        toValue: windowHeight - 350,
        duration: 500,
        useNativeDriver: false
      }),
      Animated.delay(100),
      Animated.timing(phoneTop, {
        toValue: windowHeight,
        duration: 300,
        useNativeDriver: false
      }),
      Animated.delay(1000),
      Animated.parallel([
        Animated.timing(phoneTop, {
          toValue: -1240 / 2,
          easing: easeOutBack, // TODO make this slow down at the end for a softer landing
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(phoneScale, {
          toValue: 0.65,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.delay(1500),
      ])
    ]).start(() => {
      cardRef.current?.flip()
    })
  }, [])

  // cycle through pictures every 5 seconds
  const pictureList = useRef(appPictures);
  const [curPicture, setCurPicture] = useState(0);
  const [stationaryPic, setStationaryPic] = useState(appPictures[0]);
  const stationaryPicOpacity = useRef(new Animated.Value(0)).current;
  const movingPicOpacity = useRef(new Animated.Value(0)).current;
  const movingPicTop = useRef(new Animated.Value(350)).current;

  useEffect(() => {
    if (phoneDone) {
      // animate the new image just below the current one, fading new one in and old one out, and drag the new one up into the old one's place
      Animated.parallel([
        Animated.timing(stationaryPicOpacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false
        }),
        Animated.timing(movingPicOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false
        }),
        Animated.timing(movingPicTop, {
          toValue: 0,
          easing: easeOutBack,
          duration: 800,
          useNativeDriver: false
        }),
      ]).start(() => {
        // now make the old component use the new image, reset the new component's position, and reset both their opacities
        const curPicOrLast = Math.min(curPicture, pictureList.current.length - 1)
        setStationaryPic(pictureList.current[curPicOrLast])
        setTimeout(() => {
          stationaryPicOpacity.setValue(1);
          movingPicOpacity.setValue(0);
          movingPicTop.setValue(350);
        }, 500)
      })
      setTimeout(() => {
        // we switch over the picture lists here to ensure it doesnt conflict with the animation
        if (catMode.current) {
          pictureList.current = catPictures;
        }
        if (curPicture >= pictureList.current.length - 1) {
          setCurPicture(0)
        }
        else {
          setCurPicture(curPicture + 1)
        }
      }, 5 * 1000)
    }
  }, [curPicture, phoneDone])

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
          {phoneDone && (
            <>
              <Animated.Image
                style={{
                  width: 500,
                  height: 650,
                  opacity: stationaryPicOpacity,
                  zIndex: -1,
                  borderRadius: 20,
                }}
                source={{uri: stationaryPic}}
              />
              <Animated.Image
                style={{
                  position: "absolute",
                  width: 500,
                  height: 650,
                  borderRadius: 20,
                  opacity: movingPicOpacity,
                  transform:[{translateY: movingPicTop}],
                }}
                source={{uri: pictureList.current[curPicture]}}
              />
            </>
          )}
          {!phoneDone &&
            <Animated.View style={{
              transform:[{scale: phoneScale}, {translateY: phoneTop}],
            }} >
              <CardFlip ref={cardRef} expectedWidth={590} >
                <Image
                  style={{
                    width: 590,
                    height: 1240,
                  }}
                  source={phone_back}
                />
                <Image
                  style={{
                    width: 590,
                    height: 1240,
                  }}
                  source={phone_front}
                />
              </CardFlip>
            </Animated.View>
          }
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