// @ts-ignore-next-line
import { Animated, View, Image, Dimensions } from 'react-native';
import React, { FunctionComponent, useState, useEffect, useRef, MutableRefObject } from 'react';
import { easeOutBack, CardFlip, CardFlipRef } from '../Components';
// @ts-ignore-next-line
import phone_back from '../assets/phone_back.png';
// @ts-ignore-next-line
import phone_case from '../assets/phone_case.png';
// @ts-ignore-next-line
import phone_front from '../assets/phone_front.png';
// @ts-ignore-next-line
import phone_inner from '../assets/phone_inner.png';
// @ts-ignore-next-line
import iadventure from '../assets/iadventure.gif';
// @ts-ignore-next-line
import npcg from '../assets/npcg_short.gif';
// @ts-ignore-next-line
import dice from '../assets/dice.gif';
// @ts-ignore-next-line
import virta from '../assets/virta_short.gif';
// @ts-ignore-next-line
import weread from '../assets/weread_short.gif';
// @ts-ignore-next-line
import hearyouout from '../assets/hearyouout_short.gif';
// @ts-ignore-next-line
import sushimonster from '../assets/sushimonster_short.gif';

type HomeScreenImagesProps = {
  catMode: MutableRefObject<boolean>;
}

// TODO make images responsive
// TODO extract out hardcoded styles/etc
export const HomeScreenImages:FunctionComponent<HomeScreenImagesProps> = ({ catMode }) => {
  // animate in a phone from off-screen
  const windowHeight = Dimensions.get('window').height/2;
  const phoneTop = useRef(new Animated.Value(windowHeight)).current;
  const phoneScale = useRef(new Animated.Value(1.25)).current;
  const cardRef = useRef<CardFlipRef>(null);
  const [phoneDone, setPhoneDone] = useState(false);
  const [phoneCycling, setPhoneCycling] = useState(false);
  const finalPhoneScale = 0.65;
  const basePhoneHeight = 1232;
  const basePhoneWidth = 572;
  const heightPhoneAtScale = basePhoneHeight * finalPhoneScale;
  const widthPhoneAtScale = basePhoneWidth * finalPhoneScale;
  const heightAppAtScale = 1050 * finalPhoneScale;
  const widthAppAtScale = 525 * finalPhoneScale;

  // make the phone slide up playfully, then flip over
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
          toValue: -basePhoneHeight / 2,
          easing: easeOutBack, // TODO make this slow down at the end for a softer landing
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(phoneScale, {
          toValue: finalPhoneScale,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.delay(1500),
      ])
    ]).start(() => {
      cardRef.current?.flip()
    })
  }, [])

  // after the phone is done, start showing apps on it
  // we use 2 app screens, one on top of the other, so we can animate the new one in and the old one out, then they swap roles
  const curApp = useRef(0);
  const [curPicOneState, setCurPicOneSetter] = useState(0);
  const [curPicTwoState, setCurPicTwoSetter] = useState(1);
  const innerPhoneOpacity = useRef(new Animated.Value(1)).current;
  const startingTopVal = 250;
  const appScreens = [
    {
      picList: useRef(appPictures),
      picOpacity: useRef(new Animated.Value(0)).current,
      picTop: useRef(new Animated.Value(startingTopVal)).current,
      picZ: useRef(new Animated.Value(1)).current,
      picScale: useRef(new Animated.Value(0.5)).current,
      curPic: curPicOneState,
      setCurPic: setCurPicOneSetter
    },
    {
      picList: useRef(appPictures),
      picOpacity: useRef(new Animated.Value(0)).current,
      picTop: useRef(new Animated.Value(startingTopVal)).current,
      picZ: useRef(new Animated.Value(2)).current,
      picScale: useRef(new Animated.Value(0.5)).current,
      curPic: curPicTwoState,
      setCurPic: setCurPicTwoSetter
    }
  ]

  // cycle through our apps
  useEffect(() => {
    if (phoneDone) {
      const curAppScreen = appScreens[curApp.current];
      const nextAppScreen = appScreens[1 - curApp.current];
      // optionally fade out the inner phone if we just started cycling
      const optionalAnimation = phoneCycling ? [] : [
        Animated.timing(innerPhoneOpacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false
        })
      ]
      // animate the new image just below the current one, fading new one in and old one out, and drag the new one up into the old one's place
      Animated.parallel([
        ...optionalAnimation,
        Animated.timing(curAppScreen.picOpacity, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false
        }),
        Animated.timing(nextAppScreen.picOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false
        }),
        Animated.timing(nextAppScreen.picTop, {
          toValue: 0,
          easing: easeOutBack,
          duration: 600,
          useNativeDriver: false
        }),
        Animated.timing(nextAppScreen.picScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: false
        }),
      ]).start(() => {
        // now set them up to do it again next time
        setPhoneCycling(true)
        setTimeout(() => {
          nextAppScreen.picZ.setValue(1);
          curAppScreen.picZ.setValue(2);
          curAppScreen.picScale.setValue(0.5);
          curAppScreen.picTop.setValue(startingTopVal);
        }, 500)
      })
      setTimeout(() => {
        // we switch over the picture lists here to ensure it doesnt conflict with the animation
        if (catMode.current) {
          curAppScreen.picList.current = catPictures;
        }
        // go to the next picture (by 2 so the 2 app screens leap frog each other)
        // if we go off the end of the list, reset to our original index
        if (curAppScreen.curPic + 2 > curAppScreen.picList.current.length - 1) {
          curAppScreen.setCurPic(curApp.current)
        }
        else {
          curAppScreen.setCurPic(curAppScreen.curPic + 2)
        }
        curApp.current = 1 - curApp.current;
      }, 6 * 1000)
    }
  }, [curPicOneState, curPicTwoState, phoneDone])

  // render the phone and the apps
  return (
    <>
      {!phoneCycling &&
        <Animated.View style={{
          position: "absolute",
          zIndex: 0,
          transform:[{scale: phoneScale}, {translateY: phoneTop}],
        }} >
          <CardFlip ref={cardRef} expectedWidth={basePhoneWidth} onFlipEnd={() => setTimeout(() => setPhoneDone(true), 1500)}>
            <Image
              style={{
                width: basePhoneWidth,
                height: basePhoneHeight,
              }}
              source={phone_back}
            />
            <Image
              style={{
                width: basePhoneWidth,
                height: basePhoneHeight,
              }}
              source={phone_front}
            />
          </CardFlip>
        </Animated.View>
      }
      {phoneDone && (
        <View style={{
          overflow: "hidden", 
          zIndex: 1,
          borderRadius: 51,
          width: widthPhoneAtScale,
          height: heightPhoneAtScale,
        }}>
          <Animated.Image
            style={{
              width: widthPhoneAtScale,
              zIndex: 3,
              height: heightPhoneAtScale,
            }}
            source={phone_case}
          />
          {!phoneCycling &&
            <Animated.Image
              style={{
                position: "absolute",
                width: widthPhoneAtScale,
                zIndex: 0,
                opacity: innerPhoneOpacity,
                height: heightPhoneAtScale,
              }}
              source={phone_inner}
            />
          }
          <Animated.Image
            style={{
              position: "absolute",
              width: widthAppAtScale,
              height: heightAppAtScale,
              zIndex: appScreens[0].picZ,
              top: 40,
              left: 15,
              opacity: appScreens[0].picOpacity,
              transform:[{translateY: appScreens[0].picTop}, {scale: appScreens[0].picScale}],
            }}
            source={appScreens[0].picList.current[appScreens[0].curPic]}
          />
          <Animated.Image
            style={{
              position: "absolute",
              width: widthAppAtScale,
              height: heightAppAtScale,
              zIndex: appScreens[1].picZ,
              top: 40,
              left: 15,
              opacity: appScreens[1].picOpacity,
              transform:[{translateY: appScreens[1].picTop}, {scale: appScreens[1].picScale}],
            }}
            source={appScreens[1].picList.current[appScreens[1].curPic]}
          />
        </View>
      )}
    </>
  );
}


const appPictures = [
  dice,
  hearyouout,
  virta,
  sushimonster, 
  iadventure,
  weread,
  npcg, 
]

const catPictures = [
  dice,
  hearyouout,
  virta,
  sushimonster, 
  iadventure,
  weread,
  npcg, 
]