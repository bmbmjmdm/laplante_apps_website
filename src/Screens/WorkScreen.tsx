// @ts-ignore-next-line
import { ScrollView } from "react-native"
import { AnimatedScreen } from './AnimatedScreen';
import React, { FunctionComponent } from 'react';
import { ShowcaseRow } from '../Components';
// @ts-ignore-next-line
import virta from "../assets/virta.gif"
// @ts-ignore-next-line


export const WorkScreen:FunctionComponent<{}> = () => {
  return (
    <AnimatedScreen>
      <ScrollView style={{height: 1}}>
        <ShowcaseRow
          title={"Virta Health"}
          description={"I worked at Virta Health creating large portions of their mobile app and website, including the Today Page, User Profile, Bluetooth Meter Syncing, Biomarker Submission, Patient Journey, Action Items, and more!"}
          image={virta}
          link={"https://www.virtahealth.com/"}
        />
        <ShowcaseRow
          title={"Grant Street Group"}
          description={""}
          image={null}
          link={"https://www.grantstreet.com/clients/"}
        />
        <ShowcaseRow
          title={"Scolastic / HMH"}
          description={""}
          image={null}
          link={"https://www.hmhco.com/"}
        />
        <ShowcaseRow
          title={"Pegasystems"}
          description={""}
          image={null}
          link={"https://www.pega.com/platform-guided-tour"}
        />
      </ScrollView>
    </AnimatedScreen>
  );
}
