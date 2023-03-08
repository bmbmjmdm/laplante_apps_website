// @ts-ignore-next-line
import { Animated, ScrollView } from "react-native"
import React, { FunctionComponent, ReactNode, useEffect, useRef } from 'react';
import { Flex, ShowcaseRow, easeOutBack } from '../Components';

type AnimatedScreenProps = {
  children: ReactNode;
}

export const AnimatedScreen:FunctionComponent<AnimatedScreenProps> = ({ children }) => {
  
  const animatedTop = useRef(new Animated.Value(200)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 850,
        useNativeDriver: false
      }),
      Animated.timing(animatedTop, {
        toValue: 0,
        easing: easeOutBack,
        duration: 850,
        useNativeDriver: false
      }),
    ]).start()
  }, [])

  return (
    <Animated.View style={{flex: 1, top: animatedTop, opacity: animatedOpacity}}>
      {children}
    </Animated.View>
  )
}