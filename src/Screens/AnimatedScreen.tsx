// @ts-ignore-next-line
import { Animated, ScrollView } from "react-native"
import React, { FunctionComponent, ReactNode, useEffect, useRef, useCallback } from 'react';
import { Flex, ShowcaseRow, easeOutBack } from '../Components';
import { useFocusEffect, useNavigation } from "@react-navigation/native";

type AnimatedScreenProps = {
  children: ReactNode;
}

export const AnimatedScreen:FunctionComponent<AnimatedScreenProps> = ({ children }) => {
  const animatedTop = useRef(new Animated.Value(200)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // animate out the screen when the user navigates away
  React.useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }).start(() => navigation.dispatch(e.data.action))
    })
    return unsub
  }, [navigation]);

  //animate in the screen when the user navigates to it
  useFocusEffect(
    useCallback(() => {
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
  )

  return (
    <Animated.View style={{flex: 1, top: animatedTop, opacity: animatedOpacity}}>
      {children}
    </Animated.View>
  )
}