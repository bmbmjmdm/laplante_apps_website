// @ts-ignore-next-line
import { Animated, Easing, Image, Dimensions } from 'react-native';
import React, { FunctionComponent, useState, useEffect, useRef, MutableRefObject } from 'react';
import { easeOutBack, CardFlip, CardFlipRef } from '../Components';
// @ts-ignore-next-line
import phone_back from '../assets/phone_back.png';
// @ts-ignore-next-line
import phone_front from '../assets/phone_front.png';
// @ts-ignore-next-line
import iadventure from '../assets/23-03-05-10-21-31.gif';

type HomeScreenImagesProps = {
  catMode: MutableRefObject<boolean>;
}

// TODO make images responsive
// TODO extra out hardcoded styles/etc
export const HomeScreenImages:FunctionComponent<HomeScreenImagesProps> = ({ catMode }) => {
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
    <>
      <Animated.View style={{
        position: "absolute",
        transform:[{scale: phoneScale}, {translateY: phoneTop}],
      }} >
        <CardFlip ref={cardRef} expectedWidth={590} onFlipEnd={() => setPhoneDone(true)}>
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
      {phoneDone && (
        <>
          <Animated.Image
            style={{
              width: 530,
              height: 1150,
              transform:[{scale: phoneScale}],
              opacity: stationaryPicOpacity,
              zIndex: 1,
              borderRadius: 20,
            }}
            source={stationaryPic}
          />
          <Animated.Image
            style={{
              position: "absolute",
              width: 530,
              height: 1150,
              borderRadius: 20,
              zIndex: 2,
              opacity: movingPicOpacity,
              transform:[{translateY: movingPicTop}, {scale: phoneScale}],
            }}
            source={pictureList.current[curPicture]}
          />
        </>
      )}
    </>
  );
}


const appPictures = [
  iadventure,
]

const catPictures = [
  iadventure
]