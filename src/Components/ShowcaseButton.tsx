// @ts-ignore-next-line
import { TouchableOpacity, Linking, Animated, Easing } from 'react-native';
import React, { FunctionComponent, useRef, useEffect } from 'react';
// @ts-ignore-next-line
import apple from '../assets/apple.png';
// @ts-ignore-next-line
import android from '../assets/android.png';

type ShowcaseButtonProps = {
  link: string;
  name: "Android" | "Apple";
}

export const ShowcaseButton: FunctionComponent<ShowcaseButtonProps> = ({ link, name }) => {
  const androidAnimation = useRef(new Animated.Value(0)).current;
  const appleAnimation = useRef(new Animated.Value(0)).current;
  const androidRotation = useRef(androidAnimation.interpolate({
    inputRange: [0, 10, 20, 50, 65, 75, 100, 107, 115],
    outputRange: ["0deg", "-10deg", "-20deg", "-20deg", "10deg", "20deg", "20deg", "-10deg", "0deg"],
    extrapolate: "clamp"

  })).current;
  const androidLeft = useRef(androidAnimation.interpolate({
    inputRange: [0, 50, 55, 115],
    outputRange: [0, 144, 150, 0],
    extrapolate: "clamp"
  })).current;



  const randomTimeout = (f: Function) => {
    setTimeout(f, Math.random() * 25000 + 5000)
  }
  const nextAnimationAndroid = () => {
    Animated.timing(androidAnimation, {
      toValue: 115,
      duration: 1000,
      useNativeDriver: false
    }).start(() => {
      androidAnimation.setValue(0)
    })
    randomTimeout(nextAnimationAndroid)
  }

  const nextAnimationApple = () => {
    Animated.sequence([
      Animated.timing(appleAnimation, {
        toValue: -100,
        duration: 500,
        easing: Easing.out(Easing.sin),
        useNativeDriver: false
      }),
      Animated.timing(appleAnimation, {
        toValue: 0,
        duration: 750,
        easing: Easing.bounce,
        useNativeDriver: false
      })
    ]).start(() => {
      appleAnimation.setValue(0)
    })
    randomTimeout(nextAnimationApple)
  }

  useEffect(() => {
    randomTimeout(nextAnimationAndroid)
    randomTimeout(nextAnimationApple)
  }, [])

  return (
      <TouchableOpacity 
        style={{marginRight: 20, marginTop: 30}}
        onPress={() => Linking.openURL(link)}
      >
        {
          name === "Apple" && 
          <Animated.Image
            style={{
              height: 70,
              width: 70,
              transform: [ {translateY: appleAnimation } ]
            }}
            source={apple}
          />
        }
        {
          name === "Android" && 
          <Animated.View style={{
            transform: [ { translateX: androidLeft } ]
          }}>
          <Animated.Image
            style={{
              height: 70,
              width: 70,
              transform: [ { rotate: androidRotation } ]
            }}
            source={android}
          />
          </Animated.View>
        }
      </TouchableOpacity>
  )
}