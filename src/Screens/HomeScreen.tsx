import { Dimensions } from "react-native";
import React, { FunctionComponent, useRef, useContext, useEffect } from "react";
import { Flex } from "../Components";
import { HomeScreenMessage } from "./HomeScreenMessage";
import { HomeScreenImages } from "./HomeScreenImages";
import { AnimatedScreen } from "./AnimatedScreen";
import { StackScreenProps } from "@react-navigation/stack";
import { ThemeContext } from "../Theme";

export const CAT_MODE_KEY = "laplantAppsCatMode 82jfnfoi239uf2jibn29yt928rth984h3ut9u923r";
export const SCREEN_SEEN_KEY = "laplantAppsScreenSeed 82jfnfoi239uf2jibn29yt928rth984h3ut9u923r";

// This is the landing page of the website
// It's split into two halves, one for a typed-out and changing message, the other for an animated phone showing previews of various apps
// On a small screen we only show one of these halves at once and alternate between the two each time the user comes to this screen/page
// It animates in and out using the usual AnimatedScreen
export const HomeScreen: FunctionComponent<StackScreenProps<any>> = ({
  route,
}) => {
  const catMode = useRef(Boolean(localStorage.getItem(CAT_MODE_KEY)));
  const randomScreen = useRef(
    // get the last-seen-screen from storage or starting one and get the next one to be seen by negating it
    !(
      Boolean(localStorage.getItem(SCREEN_SEEN_KEY)) ||
      Math.random() > 0.5
    )
  ).current;
  useEffect(() => {
    // store last-seen screen
    localStorage.setItem(SCREEN_SEEN_KEY, randomScreen.toString());
  }, [])

  const theme = useContext(ThemeContext);
  const space = theme.mediumSpace;
  const setCatMode = (mode:boolean) => {
    catMode.current = mode;
  }

  // we dont need a listener since the theme listens for us
  const smallScreen = Dimensions.get("window").width < 650;
  // use min height to ensure the phone's final size is used for centering
  const minHeight = theme.phoneHeight * theme.phoneScaleFinal;


  // if we're on a small screen, only show 1 of the two halves
  return (
    <AnimatedScreen fadeOut={route?.params?.fadeOut}>
      <Flex full centered style={{ minHeight }}>
        {smallScreen ? (
          randomScreen ?
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
