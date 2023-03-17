// @ts-ignore-next-line
import { TouchableOpacity, Linking, Animated, Easing } from 'react-native';
import React, { FunctionComponent, useRef, useEffect, useContext } from 'react';
// @ts-ignore-next-line
import LinearGradient from 'react-native-web-linear-gradient';
import apple from '../assets/apple.png';
import android from '../assets/android.png';
import { StyledText } from './Text';
import { ThemeContext } from '../Theme';

type ShowcaseButtonProps = {
  link: string;
  name: "Android" | "Apple" | "Link";
}

export const ShowcaseButton: FunctionComponent<ShowcaseButtonProps> = ({ link, name }) => {
  const theme = useContext(ThemeContext);
  return (
      <TouchableOpacity 
        style={{marginRight: theme.mediumSmallSpace, marginTop: theme.mediumSmallSpace}}
        onPress={() => Linking.openURL(link)}
      >
        { name === "Apple" && AppleIcon }
        { name === "Android" && AndroidIcon }
        { name === "Link" && LinkIcon }
      </TouchableOpacity>
  )
}


const randomTimeout = (f: Function) => {
  setTimeout(f, Math.random() * 25000 + 5000)
}


const AndroidIcon:FunctionComponent<{}> = () => {
  const theme = useContext(ThemeContext);
  const androidAnimation = useRef(new Animated.Value(0)).current;
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

  useEffect(() => {
    randomTimeout(nextAnimationAndroid)
  }, [])

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

  return (
    <Animated.View style={{
      transform: [ { translateX: androidLeft } ]
    }}>
    <Animated.Image
      style={{
        height: theme.appLinkSize,
        width: theme.appLinkSize,
        transform: [ { rotate: androidRotation } ]
      }}
      source={android}
    />
    </Animated.View>
  )
}


const AppleIcon:FunctionComponent<{}> = () => {
  const theme = useContext(ThemeContext);
  const appleAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    randomTimeout(nextAnimationApple)
  }, [])

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

  return (
    <Animated.Image
      style={{
        height: theme.appLinkSize,
        width: theme.appLinkSize,
        transform: [ {translateY: appleAnimation } ]
      }}
      source={apple}
    />
  )
}

const LinkIcon:FunctionComponent<{}> = () => {
  const theme = useContext(ThemeContext);
  const linkAnimation = useRef(new Animated.Value(0)).current;
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
  const linkCounterRotate = useRef(linkAnimation.interpolate({
    inputRange: [0, 20, 40, 60, 80, 100],
    outputRange: ["0deg", "10deg", "-10deg", "20deg", "-30deg", "0deg"],
    extrapolate: "clamp"
  })).current;

  useEffect(() => {
    randomTimeout(nextAnimationLink)
  }, [])

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

  return (
    <Animated.View style={{
      borderRadius: linkRadius,
      overflow: "hidden",
      height: theme.webLinkHeight,
      width: theme.webLinkWidth,
      transform: [
        { scaleY: linkScaleY },
        { scaleX: linkScaleX },
        { rotate: linkRotation },
      ]
    }}>
      <LinearGradient
        colors={theme.linkBackground}
        {...theme.linearGradient}
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
              { rotate: linkCounterRotate },
            ]
          }}
          type={"button"}
        >
          Link
        </StyledText>
      </LinearGradient>
    </Animated.View>
  )
}