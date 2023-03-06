import React, { FunctionComponent, useImperativeHandle, forwardRef } from "react";
// @ts-ignore-next-line
import { Platform, StyleSheet, Animated, ViewStyle } from "react-native";

export type FlipDirection = "y" | "x";

export type Direction = "right" | "left";

export type FlipCardProps = {
  style?: ViewStyle;
  duration?: number;
  flipZoom?: number;
  flipDirection?: FlipDirection;
  onFlip?: (index: number) => void;
  onFlipEnd?: (index: number) => void;
  onFlipStart?: (index: number) => void;
  children: React.ReactNode[];
  // we could look this up via layout events but this is a bit more performant and cleaner
  expectedWidth: number;
};


export type CardFlipRef = {
  flip: () => void;

  tip: ({
    direction,
    duration,
    progress
  }: {
    direction?: Direction;
    duration?: number;
    progress?: number;
  }) => void;

  jiggle: ({
    count,
    duration,
    progress
  }: {
    count?: number;
    duration?: number;
    progress?: number;
  }) => void;
}

const CardFlipComponent: FunctionComponent<FlipCardProps> = ({
  style = {},
  duration = 750,
  flipZoom =  0.2,
  flipDirection = "y",
  onFlip = () => { },
  onFlipStart = () => { },
  onFlipEnd = () => { },
  children = [],
  expectedWidth,
}, ref) => {
  const [sides, setSides] = React.useState(children);
  const [side, setSide] = React.useState(0);
  const progress = React.useRef(new Animated.Value(0)).current;
  const rotationX = React.useRef(new Animated.Value(50)).current;
  const rotationY = React.useRef(new Animated.Value(50)).current;
  const zoom = React.useRef(new Animated.Value(0)).current;
  const [rotateOrientation, setRotateOrientation] = React.useState("");

  // Flipping 
  useImperativeHandle(ref, () => ({
    flip: () => {
      if (flipDirection == "y") {
        flipY();
      } else {
        flipX();
      }
    }
  }));

  
  function flipY() {
    _flipTo({
      x: 50,
      y: side === 0 ? 100 : 50
    });
    setSide(side === 0 ? 1 : 0);
    setRotateOrientation("y");
  }

  function flipX() {
    _flipTo({
      y: 50,
      x: side === 0 ? 100 : 50
    });
    setSide(side === 0 ? 1 : 0);
    setRotateOrientation("x");
  }

  function _flipTo(toValue:any) {
    console.log("flipping")
    console.log(duration)
    onFlip?.(side === 0 ? 1 : 0);
    onFlipStart?.(side === 0 ? 1 : 0);
    Animated.parallel([
      Animated.timing(progress, {
        toValue: side === 0 ? 100 : 0,
        duration,
        useNativeDriver: false
      }),
      Animated.sequence([
        Animated.timing(zoom, {
          toValue: 100,
          duration: duration / 2,
          useNativeDriver: false
        }),
        Animated.timing(zoom, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: false
        })
      ]),
      Animated.timing(rotationX, {
        toValue: toValue.x,
        duration,
        useNativeDriver: false
      }),
      Animated.timing(rotationY, {
        toValue: toValue.y,
        duration,
        useNativeDriver: false
      })
    ]).start(() => {
      console.log("DONE")
      onFlipEnd?.(side === 0 ? 1 : 0);
    });
  }


  // Rendering

  // Handle cardA transformation
  const sideAOpacity = progress.interpolate({
    inputRange: [50, 51],
    outputRange: [100, 0],
    extrapolate: "clamp"
  });
  const cardATransform = {
    opacity: sideAOpacity,
    zIndex: side === 0 ? 1 : 0,
    transform: []
  };
  if (rotateOrientation === "x") {
    const aXRotation = rotationX.interpolate({
      inputRange: [0, 50, 100, 150],
      outputRange: ["-180deg", "0deg", "180deg", "0deg"],
      extrapolate: "clamp"
    });
    cardATransform.transform.push({ rotateX: aXRotation } as never);
  } else {
    // cardA Y-rotation
    const aYRotation = rotationY.interpolate({
      inputRange: [0, 50, 100, 150],
      outputRange: ["-180deg", "0deg", "180deg", "0deg"],
      extrapolate: "clamp"
    });
    cardATransform.transform.push({ rotateY: aYRotation } as never);
  }
  cardATransform.transform.push({ translateX:-expectedWidth/2 } as never)

  // Handle cardB transformation
  const sideBOpacity = progress.interpolate({
    inputRange: [50, 51],
    outputRange: [0, 100],
    extrapolate: "clamp"
  });

  const cardBTransform = {
    opacity: sideBOpacity,
    zIndex: side === 0 ? 0 : 1,
    transform: []
  };
  let bYRotation;
  if (rotateOrientation === "x") {
    const bXRotation = rotationX.interpolate({
      inputRange: [0, 50, 100, 150],
      outputRange: ["0deg", "-180deg", "-360deg", "180deg"],
      extrapolate: "clamp"
    });
    cardBTransform.transform.push({ rotateX: bXRotation } as never);
  } else {
    if (Platform.OS === "ios") {
      // cardB Y-rotation
      bYRotation = rotationY.interpolate({
        inputRange: [0, 50, 100, 150],
        outputRange: ["0deg", "180deg", "0deg", "-180deg"],
        extrapolate: "clamp"
      });
    } else {
      // cardB Y-rotation
      bYRotation = rotationY.interpolate({
        inputRange: [0, 50, 100, 150],
        outputRange: ["0deg", "-180deg", "0deg", "180deg"],
        extrapolate: "clamp"
      });
    }
    cardBTransform.transform.push({ rotateY: bYRotation } as never);
  }
  cardBTransform.transform.push({ translateX: -expectedWidth/2 } as never)

  // Handle cardPopup
  const cardZoom = zoom.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 1 + flipZoom],
    extrapolate: "clamp"
  });

  const scaling = {
    transform: [{ scale: cardZoom }]
  };

  const reposition = {
    transform: [{ translateX: expectedWidth/2 }]
  }

  return (
    <Animated.View style={[style, scaling]}>
      <Animated.View style={[styles.cardContainer, cardATransform]}>
        {sides[0]}
      </Animated.View>
      <Animated.View style={[styles.cardContainer, cardBTransform]}>
        {sides[1]}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
});

// @ts-ignore-next-line
export const CardFlip = forwardRef(CardFlipComponent);

/* TODO: convert these
  tip(customConfig:any) {
    const defaultConfig = { direction: "left", progress: 0.05, duration: 150 };
    const config = { ...defaultConfig, ...customConfig };
    const { direction, progress, duration } = config;

    const { rotationX, rotationY, side } = this.state as FlipCardState;
    const sequence = [];

    if (direction === "right") {
      sequence.push(
        Animated.parallel([
          Animated.timing(rotationX, {
            toValue: 0,
            duration,
            useNativeDriver: false
          }),
          Animated.timing(rotationY, {
            toValue: side === 0 ? 50 + progress * 50 : 90,
            duration,
            useNativeDriver: false
          })
        ])
      );
    } else {
      sequence.push(
        Animated.parallel([
          Animated.timing(rotationX, {
            toValue: 0,
            duration,
            useNativeDriver: false
          }),
          Animated.timing(rotationY, {
            toValue: side === 0 ? 50 - progress * 50 : 90,
            duration,
            useNativeDriver: false
          })
        ])
      );
    }
    sequence.push(
      Animated.parallel([
        Animated.timing(rotationX, {
          toValue: 0,
          duration,
          useNativeDriver: false
        }),
        Animated.timing(rotationY, {
          toValue: side === 0 ? 50 : 100,
          duration,
          useNativeDriver: false
        }),
      ])
    );
    Animated.sequence(sequence).start();
  }

  jiggle(customConfig = {}) {
    const defaultConfig = { count: 2, duration: 100, progress: 0.05 };
    const config = { ...defaultConfig, ...customConfig };

    const { count, duration, progress } = config;

    const { rotationX, rotationY, side } = this.state as FlipCardState;

    const sequence = [];
    for (let i = 0; i < count; i++) {
      sequence.push(
        Animated.parallel([
          Animated.timing(rotationX, {
            toValue: 0,
            duration,
            useNativeDriver: false
          }),
          Animated.timing(rotationY, {
            toValue: side === 0 ? 50 + progress * 50 : 90,
            duration,
            useNativeDriver: false
          })
        ])
      );

      sequence.push(
        Animated.parallel([
          Animated.timing(rotationX, {
            toValue: 0,
            duration,
            useNativeDriver: false
          }),
          Animated.timing(rotationY, {
            toValue: side === 0 ? 50 - progress * 50 : 110,
            duration,
            useNativeDriver: false
          })
        ])
      );
    }
    sequence.push(
      Animated.parallel([
        Animated.timing(rotationX, {
          toValue: 0,
          duration,
          useNativeDriver: false
        }),
        Animated.timing(rotationY, {
          toValue: side === 0 ? 50 : 100,
          duration,
          useNativeDriver: false
        })
      ])
    );
    Animated.sequence(sequence).start();
  }
*/
