// @ts-ignore-next-line
import { ScrollView } from "react-native";
import { AnimatedScreen } from "./AnimatedScreen";
import React, { FunctionComponent } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ShowcaseRow } from "../Components";
import iadventure from "../assets/iadventure.gif";
import hearyouout from "../assets/hearyouout.gif";
import npcg from "../assets/npcg.gif";
import dice from "../assets/dice.gif";
import weread from "../assets/weread.gif";
import simpleinsight from "../assets/simpleinsight.gif"
import gmtoolkit from "../assets/gmtoolkit.gif"
import allergyscanner from "../assets/allergyscanner.gif"

// This is the screen that shows a list of mobile app projects
// This shows in the same ShowcaseRows as NonAppsScreen and WorkScreen, showing a title, description, image, and link(s)
// It animates in and out using the usual AnimatedScreen
export const AppsScreen: FunctionComponent<StackScreenProps<any>> = ({
  route,
}) => {
  return (
    <AnimatedScreen fadeOut={route?.params?.fadeOut}>
      <ScrollView style={{ height: 1 }}>
        <ShowcaseRow
          title={"GM Toolkit"}
          description={
            "A content generation app that helps GMs create NPCs, towns, quests, and more on the fly. Designed to be easy to use mid-game, as well as have diverse color pallets."
          }
          tech={"React Native, Android, Typescript, Anthropic AI"}
          image={gmtoolkit}
          android={
            "https://play.google.com/store/apps/details?id=com.dmgenerator"
          }
        />
        <ShowcaseRow
          title={"Hear You Out"}
          description={
            "Coming soon! Share views and have your own views challenged! AI-powered answer selection to ensure a diverse set of views."
          }
          tech={"React Native, OpenAI, Pinecone, iOS, Android, Audio Manipulation, Typescript, REST"}
          image={hearyouout}
          isFirst
        />
        <ShowcaseRow
          title={"Simple Insight"}
          description={
            "Upload your SimpleNote notes and ask an AI whatever you want. It'll pull in relevant notes to answer you, as well as give you daily self improvement and project tasks."
          }
          tech={"React Native, OpenAI, Pinecone, RAG, Android, iOS, Typescript, REST"}
          image={simpleinsight}
        />
        <ShowcaseRow
          title={"weRead"}
          description={
            "An education app for first-time readers, which adjusts its difficulty automatically to suit the child. Users can upload their own voice and pictures to create a personalized experience for their child! Created with special needs children front of mind :)"
          }
          tech={"Vue Native, iOS, Android, Audio Manipulation, JS"}
          image={weread}
          apple={
            "https://apps.apple.com/my/app/weread-personalized-learning/id1515323154"
          }
          android={
            "https://play.google.com/store/apps/details?id=com.wesleyapp"
          }
        />
        <ShowcaseRow
          title={"Allergy Scanner"}
          description={
            "An AI-Vision app that scans an image (file or camera) and reads any text in it, then compares that content to a list of the user's allergens to determine if the product is safe or not."
          }
          tech={"React Native, Android, Typescript, Anthropic AI, Computer Vision"}
          image={allergyscanner}
        />
        <ShowcaseRow
          title={"iAdventure"}
          description={"A text-based adventure game that changes based on your choices"}
          tech={"React Native, iOS, Android, JS"}
          image={iadventure}
          apple={"https://apps.apple.com/tr/app/iadventure/id1437961208"}
          android={
            "https://play.google.com/store/apps/details?id=com.LaplanteApps.iAdventure"
          }
        />
        <ShowcaseRow
          title={"NPC Generator"}
          description={
            "A character generator for Dungeons and Dragons 5e, primarily focusing on quick-to-read NPCs for DM convenience. Can be fully modified with user content!"
          }
          tech={"React Native, Android, JS"}
          image={npcg}
          android={"https://play.google.com/store/apps/details?id=com.npcgen"}
        />
        <ShowcaseRow
          title={"Dice d4-d20"}
          description={
            "6 different die types with a simple interface and cute animations"
          }
          tech={"Android, Java"}
          image={dice}
          android={
            "https://play.google.com/store/apps/details?id=com.dale.diceapp"
          }
        />
      </ScrollView>
    </AnimatedScreen>
  );
};
