// @ts-ignore-next-line
import { ScrollView, Dimensions, Animated, ActivityIndicator } from 'react-native';
import { AnimatedScreen } from "./AnimatedScreen";
import React, { FunctionComponent, useContext, useEffect, useRef, useState, ReactElement } from "react";
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

  // we do some custom sizing for both the waitlist widget and the sell sheet image
  // these are crucial components so they need to look good on all screens
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

  // the waitlist widget has a weird white loading screen, so we make a custom loading screen for it
  const fadeinWidget = useRef(new Animated.Value(0)).current
  const fadeoutLoaders = useRef(new Animated.Value(1)).current
  const [loading, setLoading] = useState(true)
  const [activityIndicators, setActivityIndicators] = useState<ReactElement[]>([])
  useEffect(() => {
    // every 0.05 seconds, add an activity indicator to the loading screen. this will make a 
    // progress bar of loading indicators
    const interval = setInterval(() => {
      setActivityIndicators((existingIndicators => [...existingIndicators, (<ActivityIndicator/>)]))
    }, 50)
    // after 2 seconds of this, fade-in the waitlist widget and fade-out the loading indicators
    setTimeout(() => {
      clearInterval(interval)
      Animated.timing(fadeinWidget, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
      Animated.timing(fadeoutLoaders, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start(() => {
        setLoading(false)
      });
    }, 2000)
  }, [])

  return (
    <AnimatedScreen fadeOut={route?.params?.fadeOut}>
      <ScrollView style={{ height: 1 }}>

        <Flex fullWidth centered>
          <Animated.View style={{
            flexDirection: 'row',
            width: resizeWaitlist,
            position: 'absolute',
            opacity: fadeoutLoaders
          }}>
            {loading && activityIndicators}
          </Animated.View>
          <Animated.View style={{opacity: fadeinWidget}}>
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
          </Animated.View>
        </Flex>

        <Flex centered style={{marginBottom: 60}}>
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
