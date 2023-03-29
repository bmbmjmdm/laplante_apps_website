import { Animated, ImageProps, Image, } from "react-native";
import React, { FunctionComponent, useEffect } from "react";

// A wrapper for the react-native Image component that fades it in when it loads
// Overwrites opacity style prop
type FadeInImageProps = ImageProps | Animated.AnimatedProps<ImageProps>;

export const FadeInImage: FunctionComponent<FadeInImageProps> = (props) => {
  // fade in after load
  const opacityObj = React.useRef({opacity: new Animated.Value(0)}).current;

  // merge animated opacity style into props
  // we do this every render incase our props object changes
  // this can be optimised to only happen when props changes, but we're not worried because this won't rerender often
  if (props.style) {
    if (props.style.constructor === Array) {
      props.style = [...props.style, opacityObj];
    }
    else {
      props.style = [props.style, opacityObj];
    }
  }
  else {
    props.style = opacityObj;
  }

  return (
    <Animated.Image
      {...props}
      onLoad={(arg) => {
        props.onLoad?.(arg);
        Animated.timing(opacityObj.opacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: false,
        }).start();
      }}
    />
  )
};
