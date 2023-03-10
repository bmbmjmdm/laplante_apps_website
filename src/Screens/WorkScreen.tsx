// @ts-ignore-next-line
import { ScrollView } from "react-native"
import { AnimatedScreen } from './AnimatedScreen';
import React, { FunctionComponent } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ShowcaseRow } from '../Components';
// @ts-ignore-next-line
import virta from "../assets/virta.gif"
// @ts-ignore-next-line
import sushimonster from '../assets/sushimonster.gif';
// @ts-ignore-next-line
import gsg from '../assets/gsg.png';
// @ts-ignore-next-line
import pega from '../assets/pega.jpg';


export const WorkScreen:FunctionComponent<StackScreenProps<any>> = ({ route }) => {
  return (
    <AnimatedScreen fadeOut={route?.params?.fadeOut}>
      <ScrollView style={{height: 1}}>
        <ShowcaseRow
          title={"Virta Health"}
          description={"I worked at Virta Health creating large portions of their mobile app and website, including the Today Page, User Profile, Bluetooth Meter Syncing, Biomarker Submission, Patient Journey, Action Items, and more!"}
          image={virta}
          link={"https://www.virtahealth.com/"}
        />
        <ShowcaseRow
          title={"Scolastic / HMH"}
          description={"I led the mobile team at Houghton Mifflin Harcourt, maintaining over a dozen apps, reviving old ones, and implementing new features and tooling."}
          image={sushimonster}
          horizontalImage
          link={"https://www.hmhco.com/"}
        />
        <ShowcaseRow
          title={"Grant Street Group"}
          description={"I created Grant Street Group's first mobile app and added numerous features to their websites, including creating their admin portal where they can create and configure entirely new websites automatically."}
          image={gsg}
          horizontalImage
          sharpEdges
          link={"https://www.grantstreet.com/clients/our-clients/"}
        />
        <ShowcaseRow
          title={"Pegasystems"}
          description={"I interned at Pegasystems, adding new features and content to their Pega platform."}
          image={pega}
          horizontalImage
          sharpEdges
          link={"https://www.pega.com/platform-guided-tour"}
        />
      </ScrollView>
    </AnimatedScreen>
  );
}
