// @ts-ignore-next-line
import { ScrollView } from "react-native";
import { AnimatedScreen } from "./AnimatedScreen";
import React, { FunctionComponent } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ShowcaseRow } from "../Components";
import virta from "../assets/virta.gif";
// import sushimonster from "../assets/sushimonster.gif";
import gsg from "../assets/gsg.gif";
import pega from "../assets/pega.jpg";

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
            "I worked at Virta Health creating large portions of their mobile app and website, including the Today Page, User Profile, Bluetooth Meter Syncing, Biomarker Submission, Patient Journey, Action Items, and more!"
          }
          image={virta}
          link={"https://www.virtahealth.com/"}
          isFirst
        />
        <ShowcaseRow
          title={"Scolastic / HMH"}
          description={
            "I led the mobile team at Houghton Mifflin Harcourt, maintaining over a dozen apps, reviving old ones, and implementing new features and tooling."
          }
          // local gif is too large, so use google storage instead
          image={
            "https://storage.googleapis.com/website_large_gifs/sushimonster.gif"
          }
          horizontalImage
          link={"https://www.hmhco.com/"}
        />
        <ShowcaseRow
          title={"Grant Street Group"}
          description={
            "I created Grant Street Group's first mobile app and added numerous features to their websites, including creating their admin portal where they can create and configure entirely new websites automatically."
          }
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
