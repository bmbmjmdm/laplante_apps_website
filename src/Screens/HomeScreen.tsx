// @ts-ignore-next-line
import { Dimensions } from "react-native";
import React, { FunctionComponent, useRef, useContext } from "react";
import { Flex } from "../Components";
import { HomeScreenMessage } from "./HomeScreenMessage";
import { HomeScreenImages } from "./HomeScreenImages";
import { AnimatedScreen } from "./AnimatedScreen";
import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../Theme";

// This is the landing page of the website
// It's split into two halves, one for a typed-out and changing message, the other for an animated phone showing previews of various apps
// It animates in and out using the usual AnimatedScreen
export const HomeScreen: FunctionComponent<StackScreenProps<any>> = ({
  route,
}) => {
  const catMode = useRef(0);
  const theme = useContext(ThemeContext);
  const space = theme.mediumSpace;
  // we dont need a listener since the theme listens for us
  const singleColumn = Dimensions.get("window").width < 650;

  return (
    <AnimatedScreen fadeOut={route?.params?.fadeOut}>
      <Flex full centered>
        <Flex full slim row={!singleColumn} reverse={singleColumn}>
          <Flex
            full
            centeredVertical
            style={{
              paddingHorizontal: space,
              marginTop: singleColumn ? undefined : -space,
            }}
          >
            <HomeScreenMessage
              setCatMode={(mode) => {
                catMode.current = mode ? 1 : 0;
              }}
            />
          </Flex>
          <Flex full centered style={{ paddingHorizontal: space }}>
            <HomeScreenImages catMode={catMode} />
          </Flex>
        </Flex>
      </Flex>
    </AnimatedScreen>
  );
};
