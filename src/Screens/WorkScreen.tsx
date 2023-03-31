// @ts-ignore-next-line
import { ScrollView } from "react-native";
import { AnimatedScreen } from "./AnimatedScreen";
import React, { FunctionComponent } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ShowcaseRow } from "../Components";
import virta from "../assets/virta.gif";
import gsg from "../assets/gsg.gif";
import pega from "../assets/pega.jpg";
import sushimonster from "../assets/sushimonster.gif";

// This is the screen that shows a list of previous jobs
// This shows in the same ShowcaseRows as AppScreen and NonAppsScreen, showing a title, description, image, and link(s)
// It animates in and out using the usual AnimatedScreen
export const WorkScreen: FunctionComponent<StackScreenProps<any>> = ({
  route,
}) => {
  return (
    <AnimatedScreen fadeOut={route?.params?.fadeOut}>
      <ScrollView style={{ height: 1 }}>
        <ShowcaseRow
          title={"Virta Health"}
          description={
            "I worked at Virta Health as a Senior Mobile Developer leading large projects and creating vast portions of their mobile app and website. These included the Today Page, User Profile, Bluetooth Meter Syncing, Biomarker Submission, Patient Journey, Action Items, and more!"
          }
          tech={"React Native, iOS, Android, RN Web, Redux, Bluetooth, Typescript, GQL, Google Cloud, Node, Webpack, REST"}
          image={virta}
          link={"https://www.virtahealth.com/"}
          isFirst
        />
        <ShowcaseRow
          title={"Scolastic / HMH"}
          description={
            "I led the mobile team at Houghton Mifflin Harcourt as Lead Mobile Developer, maintaining over a dozen apps, reviving old ones, and implementing new features and tooling."
          }
          tech={"Actionscript, iOS, Android, Java, Objective-C, HTML, CSS, JS, Node, REST"}
          image={sushimonster}
          horizontalImage
          link={"https://www.hmhco.com/"}
        />
        <ShowcaseRow
          title={"Grant Street Group"}
          description={
            "I created and maintained Grant Street Group's first mobile app and added numerous features to their websites as a Lead Mobile/Web Developer. This included creating their Admin Portal where admin can create and configure entirely new websites automatically."
          }
          tech={"Vue, JS, iOS, Android, React Native, AWS, HTML, CSS, Node, Webpack, REST"}
          image={gsg}
          link={"https://www.grantstreet.com/"}
        />
        <ShowcaseRow
          title={"Pegasystems"}
          description={
            "I interned at Pegasystems, adding new features and content to their Pega platform."
          }
          image={pega}
          horizontalImage
          sharpEdges
          link={"https://www.pega.com/"}
        />
      </ScrollView>
    </AnimatedScreen>
  );
};
