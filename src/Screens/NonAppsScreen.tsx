// @ts-ignore-next-line
import { ScrollView } from "react-native"
import { AnimatedScreen } from './AnimatedScreen';
import React, { FunctionComponent } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ShowcaseRow } from '../Components';
// @ts-ignore-next-line
import beatbiome from '../assets/beatbiome.gif'


export const NonAppsScreen:FunctionComponent<StackScreenProps<any>> = ({ route }) => {
  return (
    <AnimatedScreen fadeOut={route?.params?.fadeOut}>
      <ScrollView style={{height: 1}}>
        <ShowcaseRow
          title={"Beat Biome"}
          description={"A virtual reality game that reacts to your music! Available on Steam"}
          image={beatbiome}
          horizontalImage
          sharpEdges
          link={"https://store.steampowered.com/app/1506960/Beat_Biome/"}
        />
        <ShowcaseRow
          title={"Knight Knight Good Mountain"}
          description={"A board game for 2-10 players, combining story telling, strategy, deck-building, and more!"}
          image={null}
          horizontalImage
          link={""}
        />
      </ScrollView>
    </AnimatedScreen>
  );
}
