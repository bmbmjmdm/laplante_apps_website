// @ts-ignore-next-line
import { Animated, Image, Dimensions } from 'react-native';
import React, { FunctionComponent, useEffect, useRef, MutableRefObject, useContext } from 'react';
import { easeOutBack, CardFlip, CardFlipRef } from '../Components';
import phone_back from '../assets/phone_back.png';
import phone_front from '../assets/phone_front.png';
import { ThemeContext } from '../Theme';


type PlayfulPhoneProps = {
  onAnimationComplete: () => void;
}

// You'll see constants used in various equations below. These are relative sizes to ensure that all the images appear in the correct proportions 
export const PlayfulPhone:FunctionComponent<PlayfulPhoneProps> = ({ onAnimationComplete }) => {
  // animate in a phone from off-screen
  const theme = useContext(ThemeContext);
  const windowHeight = Dimensions.get('window').height/2;
  const phoneTop = useRef(new Animated.Value(windowHeight)).current;
  const phoneScale = useRef(new Animated.Value(theme.phoneScaleInitial)).current;
  const cardRef = useRef<CardFlipRef>(null);
  const finalPhoneScale = theme.phoneScaleFinal;
  const basePhoneHeight = theme.phoneHeight;
  const defaultPhoneHeight = 1232;
  const phoneHeightRatio = basePhoneHeight/defaultPhoneHeight;
  const basePhoneWidth = 572 * phoneHeightRatio;

  // make the phone slide up playfully, then flip over
  useEffect(() => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(phoneTop, {
        toValue: windowHeight - (500 * phoneHeightRatio),
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
        toValue: windowHeight - (350 * phoneHeightRatio),
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
          easing: easeOutBack,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(phoneScale, {
          toValue: finalPhoneScale,
          duration: 1000,
          useNativeDriver: false
        }),
      ]),
      Animated.delay(500),
    ]).start(() => {
      cardRef.current?.flip()
    })
  }, [])

  // render the phone
  return (
    <Animated.View style={{
      position: "absolute",
      zIndex: 0,
      transform:[{scale: phoneScale}, {translateY: phoneTop}],
    }}>
      <CardFlip
        ref={cardRef}
        expectedWidth={basePhoneWidth}
        onFlipEnd={ () => setTimeout(onAnimationComplete, 1500) }
      >
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
  );
}
