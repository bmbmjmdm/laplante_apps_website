// @ts-ignore-next-line
import { ScrollView } from "react-native"
import { AnimatedScreen } from './AnimatedScreen';
import React, { FunctionComponent } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ShowcaseRow } from '../Components';
import iadventure from "../assets/iadventure.gif"
import hearyouout from "../assets/hearyouout.gif"
import weread from "../assets/weread.gif"
import npcg from "../assets/npcg.gif"
import dice from "../assets/dice.gif"

// This is the screen that shows a list of mobile app projects
// This shows in the same ShowcaseRows as NonAppsScreen and WorkScreen, showing a title, description, image, and link(s)
// It animates in and out using the usual AnimatedScreen
export const AppsScreen:FunctionComponent<StackScreenProps<any>> = ({ route })=> {
  return (
    <AnimatedScreen fadeOut={route?.params?.fadeOut}>
      <ScrollView style={{height: 1}}>
        <ShowcaseRow
          title={"Hear You Out"}
          description={"Coming soon! Share views and have your own views challenged!"}
          image={hearyouout}
        />
        <ShowcaseRow
          title={"weRead"}
          description={"An education app for first-time readers, which adjusts its difficulty automatically to suit the child. Users can upload their own voice and pictures to create a personalized experience for their child! Created with special needs children front of mind :)"}
          image={weread}
          apple={"https://apps.apple.com/my/app/weread-personalized-learning/id1515323154"}
          android={"https://play.google.com/store/apps/details?id=com.wesleyapp"}
        />
        <ShowcaseRow
          title={"iAdventure"}
          description={"A text-based adventure game"}
          image={iadventure}
          apple={"https://apps.apple.com/tr/app/iadventure/id1437961208"}
          android={"https://play.google.com/store/apps/details?id=com.LaplanteApps.iAdventure"}
        />
        <ShowcaseRow
          title={"NPC Generator"}
          description={"A character generator for Dungeons and Dragons 5e, primarily focusing on quick-to-read NPCs. Can be fully modified with user content!"}
          image={npcg}
          android={"https://play.google.com/store/apps/details?id=com.npcgen"}
        />
        <ShowcaseRow
          title={"Dice d4-d20"}
          description={"6 different die types with a simple interface and cute animations"}
          image={dice}
          android={"https://play.google.com/store/apps/details?id=com.dale.diceapp"}
        />
      </ScrollView>
    </AnimatedScreen>
  );
}
