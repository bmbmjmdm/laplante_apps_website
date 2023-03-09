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
  const linkScale = useRef(linkAnimation.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 2, 2],
    extrapolate: "clamp"
  })).current;
  const linkRadius = useRef(linkAnimation.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [35, 10, 0],
    extrapolate: "clamp"
  })).current;
  const linkTop = useRef(linkAnimation.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -20],
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
    Animated.sequence([
      Animated.timing(linkAnimation, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: false
      }),
      Animated.timing(linkAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false
      })
    ]).start()
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
            transform: [ { scaleY: linkScale } ]
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
                    { scaleY: Animated.divide(new Animated.Value(1), linkScale) },
                  ]
                }}
                type={"button"}
              >
                Link
              </StyledText>
              <StyledText
                animated
                style={{
                  position: "absolute",
                  transform: [
                    { scaleY: Animated.divide(new Animated.Value(1), linkScale) },
                    { translateY: linkTop },
                  ]
                }}
                type={"button"}
              >
                Link
              </StyledText>
              <StyledText
                animated
                style={{
                  position: "absolute",
                  transform: [
                    { scaleY: Animated.divide(new Animated.Value(1), linkScale) },
                    { translateY: Animated.multiply(new Animated.Value(-1), linkTop) },
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