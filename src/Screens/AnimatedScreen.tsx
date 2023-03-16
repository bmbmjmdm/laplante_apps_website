// @ts-ignore-next-line
import { Animated } from "react-native"
import React, { FunctionComponent, ReactNode, useRef, useCallback, useContext, } from 'react';
import { easeOutBack } from '../Components';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../Theme";

type AnimatedScreenProps = {
  children: ReactNode;
  fadeOut?: boolean;
}

export const AnimatedScreen:FunctionComponent<AnimatedScreenProps> = ({ children, fadeOut = false }) => {
  const theme = useContext(ThemeContext);
  const animatedTop = useRef(new Animated.Value(theme.screenAnimationY)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // animate out the screen when the user navigates somewhere else
  React.useEffect(() => {
    if (fadeOut) {
      // @ts-ignore-next-line
      navigation.setParams({fadeOut: false});
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }).start()
    }
  }, [fadeOut]);

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