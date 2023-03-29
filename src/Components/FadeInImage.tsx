import { Animated, ImageProps, ActivityIndicator } from "react-native";
import React, { FunctionComponent, useEffect } from "react";

// A wrapper for the react-native Image component that fades it in when it loads
// Overwrites opacity style prop
// If you are enabling the spinner, it will inherit from the image's style prop
type FadeInImageProps = (ImageProps | Animated.AnimatedProps<ImageProps>) & {
  spinner?: boolean;
};

export const FadeInImage: FunctionComponent<FadeInImageProps> = (props) => {
  // fade in after load
  const opacityObj = React.useRef({opacity: new Animated.Value(0)}).current;
  const opacitySpinner = React.useRef(new Animated.Value(props.spinner ? 1 : 0)).current;

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
    <>
      <Animated.View style={[props.style, {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        opacity: opacitySpinner,
      }]} >
        <ActivityIndicator color={"#AAAAAA"}/>
      </Animated.View>
      <Animated.Image
        {...props}
        onLoad={(arg) => {
          props.onLoad?.(arg);
          Animated.timing(opacitySpinner, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }).start();
          Animated.timing(opacityObj.opacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: false,
          }).start();
        }}
      />
    </>
  )
};
