// @ts-ignore-next-line
import { ScrollView, Dimensions } from 'react-native';
import { AnimatedScreen } from "./AnimatedScreen";
import React, { FunctionComponent, useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { FadeInImage, Flex } from "../Components";
import { ThemeContext } from "../Theme";
import { isScreenSmall } from "../Helpers";
import sellsheet from "../assets/sellsheet.png";

// It animates in and out using the usual AnimatedScreen
export const KKGMScreen: FunctionComponent<StackScreenProps<any>> = ({
  route,
}) => {
  const theme = useContext(ThemeContext);
  const smallScreen = isScreenSmall();
  const width = Dimensions.get("window").width;
  let resizeSellSheet = width/3000
  let borderRadius = 20
  let resizeWaitlist = 600;
  if (smallScreen) {
    resizeWaitlist = width
    resizeSellSheet = width/(1588 + 40);
    borderRadius = 0;
  }

  return (
    <AnimatedScreen fadeOut={route?.params?.fadeOut}>
      <ScrollView style={{ height: 1 }}>
        <Flex fullWidth centered>
          <iframe
              allowTransparency={true}
              id="waitlist_iframe"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              width={resizeWaitlist + "px"}
              height="400px"
              src="https://getwaitlist.com/waitlist/8254"
          />
        </Flex>
        <Flex centered style={{marginTop: 20, marginBottom: 60}}>
          <FadeInImage
            spinner
            source={sellsheet}
            style={{
              width: 1588 * resizeSellSheet,
              height: 2244 * resizeSellSheet,
              resizeMode: "stretch",
              borderRadius: borderRadius,
            }}
          />
        </Flex>
      </ScrollView>
    </AnimatedScreen>
  );
};
