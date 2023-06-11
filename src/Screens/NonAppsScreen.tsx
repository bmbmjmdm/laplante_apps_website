// @ts-ignore-next-line
import { ScrollView } from "react-native";
import { AnimatedScreen } from "./AnimatedScreen";
import React, { FunctionComponent, useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ShowcaseRow } from "../Components";
import beatbiome from "../assets/beatbiome.gif";
import kkgm from "../assets/kkgm.png";
import { ThemeContext } from "../Theme";
import site from "../assets/site.png";
import siteSmall from "../assets/siteSmall.png";
import { isScreenSmall } from "../Helpers";

// This is the screen that shows a list of non-app projects, like board games and VR games
// This shows in the same ShowcaseRows as AppScreen and WorkScreen, showing a title, description, image, and link(s)
// It animates in and out using the usual AnimatedScreen
export const NonAppsScreen: FunctionComponent<StackScreenProps<any>> = ({
  route,
}) => {
  const theme = useContext(ThemeContext);
  const smallScreen = isScreenSmall();

  return (
    <AnimatedScreen fadeOut={route?.params?.fadeOut}>
      <ScrollView style={{ height: 1 }}>
        <ShowcaseRow
          title={"Beat Biome"}
          description={
            "A virtual reality game that reacts to your music! Available on Steam"
          }
          tech={"Unity, C#, SteamVR, Audio Manipulation"}
          image={beatbiome}
          horizontalImage
          sharpEdges
          link={"https://store.steampowered.com/app/1506960/Beat_Biome/"}
          isFirst
        />
        <ShowcaseRow
          title={"Knight Knight Good Mountain"}
          description={
            "A board game for 2-10 players, combining story telling, strategy, deck-building, and more!"
          }
          image={kkgm}
          customImageDimensions={{
            width: theme.showcaseImageLong,
            height: theme.showcaseImageLong,
            left: theme.showcaseImageShort/2,
          }}
          sharpEdges
          link={{path: "KKGM"}}
        />
        <ShowcaseRow
          title={"LaPlante Apps Site"}
          description={
            "This website!"
          }
          tech={"RN Web, Typescript, Node, Webpack, Google Cloud"}
          image={smallScreen ? siteSmall : site}
          horizontalImage={smallScreen ? false : true}
          sharpEdges
          link={"/"}
        />
      </ScrollView>
    </AnimatedScreen>
  );
};
