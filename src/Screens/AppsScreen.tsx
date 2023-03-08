// @ts-ignore-next-line
import { ScrollView } from "react-native"
import { AnimatedScreen } from './AnimatedScreen';
import React, { FunctionComponent } from 'react';
import { ShowcaseRow } from '../Components';
// @ts-ignore-next-line
import iadventure from "../assets/iadventure.gif"
// @ts-ignore-next-line
import hearyouout from "../assets/hearyouout.gif"
// @ts-ignore-next-line
import weread from "../assets/weread.gif"
// @ts-ignore-next-line
import npcg from "../assets/npcg.gif"
// @ts-ignore-next-line
import dice from "../assets/dice.gif"


export const AppsScreen:FunctionComponent<{}> = () => {
  return (
    <AnimatedScreen>
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
