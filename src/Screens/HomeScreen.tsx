// @ts-ignore-next-line
import { Dimensions } from "react-native";
import React, { FunctionComponent, useRef, useContext } from "react";
import { Flex } from "../Components";
import { HomeScreenMessage } from "./HomeScreenMessage";
import { HomeScreenImages } from "./HomeScreenImages";
import { AnimatedScreen } from "./AnimatedScreen";
import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../Theme";

export const CAT_MODE_KEY = "laplantAppsCatMode 90124986496340230485789523042983752";

// This is the landing page of the website
// It's split into two halves, one for a typed-out and changing message, the other for an animated phone showing previews of various apps
// It animates in and out using the usual AnimatedScreen
export const HomeScreen: FunctionComponent<StackScreenProps<any>> = ({
  route,
}) => {
  const catMode = useRef(Boolean(localStorage.getItem(CAT_MODE_KEY)));
  const theme = useContext(ThemeContext);
  const space = theme.mediumSpace;
  const setCatMode = (mode:boolean) => {
    catMode.current = mode;
  }
  // we dont need a listener since the theme listens for us
  const smallScreen = Dimensions.get("window").width < 650;

  // if we're on a small screen, only show 1 of the two halves
  return (
    <AnimatedScreen fadeOut={route?.params?.fadeOut}>
      <Flex full centered>
        {smallScreen ? (
          Math.random() > 0.5 ?
          <HomeScreenMessage setCatMode={setCatMode} catMode={catMode.current} />
          : <HomeScreenImages catMode={catMode} showTitle />
        )
      : (
        <Flex full slim row>
          <Flex
            full
            centeredVertical
            style={{
              paddingHorizontal: space,
              marginTop: -space,
            }}
          >
            <HomeScreenMessage setCatMode={setCatMode} catMode={catMode.current} />
          </Flex>
          <Flex full centered style={{ paddingHorizontal: space }}>
            <HomeScreenImages catMode={catMode} />
          </Flex>
        </Flex>
        )}
      </Flex>
    </AnimatedScreen>
  );
};
