// @ts-ignore-next-line
import { TouchableOpacity, Linking, Animated, Easing } from 'react-native';
import React, { FunctionComponent, useRef, useEffect } from 'react';
// @ts-ignore-next-line
import LinearGradient from 'react-native-web-linear-gradient';
// @ts-ignore-next-line
import apple from '../assets/apple.png';
// @ts-ignore-next-line
import android from '../assets/android.png';
import { StyledText } from './Text';

type ShowcaseButtonProps = {
  link: string;
  name: "Android" | "Apple" | "Link";
}

export const ShowcaseButton: FunctionComponent<ShowcaseButtonProps> = ({ link, name }) => {
  const androidAnimation = useRef(new Animated.Value(0)).current;
  const appleAnimation = useRef(new Animated.Value(0)).current;
  const linkAnimation = useRef(new Animated.Value(0)).current;
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
  const linkScaleY = useRef(linkAnimation.interpolate({
    inputRange: [0, 20, 40, 60, 80, 100],
    outputRange: [1, 1.2, 1.5, 1.2, 1.8, 1],
    extrapolate: "clamp"
  })).current;
  const linkScaleX = useRef(linkAnimation.interpolate({
    inputRange: [0, 20, 40, 60, 80, 100],
    outputRange: [1, 0.75, 1, 1.25, 1.5, 1],
    extrapolate: "clamp"
  })).current;
  const linkRadius = useRef(linkAnimation.interpolate({
    inputRange: [0, 20, 40, 60, 80, 100],
    outputRange: [35, 10, 20, 50, 20, 35],
    extrapolate: "clamp"
  })).current;
  const linkRotation = useRef(linkAnimation.interpolate({
    inputRange: [0, 20, 40, 60, 80, 100],
    outputRange: ["0deg", "-10deg", "10deg", "-20deg", "30deg", "0deg"],
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
    ]).start()
    randomTimeout(nextAnimationApple)
  }

  const nextAnimationLink = () => {
    Animated.timing(linkAnimation, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false
    }).start(() => {
      linkAnimation.setValue(0)
    })
    randomTimeout(nextAnimationLink)
  }

  useEffect(() => {
    randomTimeout(nextAnimationAndroid)
    randomTimeout(nextAnimationApple)
    randomTimeout(nextAnimationLink)
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
        {
          name === "Link" &&
          <Animated.View style={{
            borderRadius: linkRadius,
            overflow: "hidden",
            height: 50,
            width: 100,
            transform: [
              { scaleY: linkScaleY },
              { scaleX: linkScaleX },
              { rotate: linkRotation },
            ]
          }}>
            <LinearGradient
              colors={['#ffb0fb', '#19344d']}
              useAngle={true}
              angle={135}
              angleCenter={{ x: 0.5, y: 0.5}}
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <StyledText
                animated
                style={{
                  transform: [
                    { scaleY: Animated.divide(new Animated.Value(1), linkScaleY) },
                    { scaleX: Animated.divide(new Animated.Value(1), linkScaleX) },
                  ]
                }}
                type={"button"}
              >
                Link
              </StyledText>
            </LinearGradient>
          </Animated.View>
        }
      </TouchableOpacity>
  )
}