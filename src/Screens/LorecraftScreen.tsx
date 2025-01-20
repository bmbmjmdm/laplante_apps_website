// @ts-ignore-next-line
import { ScrollView, Dimensions, Animated, ActivityIndicator, Linking, Image, Easing, View } from 'react-native';
import { AnimatedScreen } from "./AnimatedScreen";
import React, { FunctionComponent, useContext, useEffect, useRef, useState, ReactElement } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { FadeInImage, Flex, StyledText } from "../Components";
import { ThemeContext } from "../Theme";
import { isScreenSmall } from "../Helpers";
import logo from "../assets/logo.png";
import title from "../assets/title.png";
import lorecraftBackground from "../assets/lorecraftBackground.png";

// It animates in and out using the usual AnimatedScreen
export const LorecraftScreen: FunctionComponent<StackScreenProps<any>> = ({
  route,
}) => {
  const smallScreen = isScreenSmall();

  // initial screen appearing animations
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const restOpacity = useRef(new Animated.Value(0)).current;
  const logoOffset = useRef(new Animated.Value(0)).current;
  const headerOffset = useRef(new Animated.Value(0)).current;
  const titleOffset = useRef(new Animated.Value(-40)).current;
  const [lorecraftHeight, setLorecraftHeight] = useState(0);
  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false
      }),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(logoOffset, {
          toValue: smallScreen ? 75 : 175,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(titleOffset, {
          toValue: smallScreen ? -75 : -125,
          duration: 1000,
          useNativeDriver: false
        }),
        Animated.timing(restOpacity, {
          toValue: 1,
          duration: 1250,
          useNativeDriver: false
        }),
      ]),
    ]).start()
  }, [])


  // scrolling animations
  const animatedScrollYValue = useRef(new Animated.Value(0)).current;
  const headerHeight = smallScreen ? 150 : 200;
  //const drift = smallScreen ? 25 : 50
  const drift = 0
  const bottomTextDriftOffset = smallScreen ? 200 : 0;
  const imageZoom = useRef(new Animated.Value(0.75)).current;
  const textZoom = useRef(new Animated.Value(1.25)).current;
  const textDriftLeft = useRef(new Animated.Value(-drift)).current;
  const textDriftRight = useRef(new Animated.Value(drift)).current;
  useEffect(() => {
    Animated.timing(imageZoom, {
      toValue: animatedScrollYValue.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [0.75, 1],
        extrapolate: 'clamp',
      }),
      easing: Easing.linear,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(textZoom, {
      toValue: animatedScrollYValue.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [1.25, 1],
        extrapolate: 'clamp',
      }),
      easing: Easing.linear,
      duration: 250,
      useNativeDriver: true,
    }).start();

    // disable drifting animations for now, they work fine but the design is meh
    /*
    Animated.timing(textDriftLeft, {
      toValue: animatedScrollYValue.interpolate({
        inputRange: [0, headerHeight, headerHeight * 2, headerHeight * 3],
        outputRange: [-drift, 0, 0, drift],
        extrapolate: 'clamp',
      }),
      easing: Easing.linear,
      duration: 350,
      useNativeDriver: true,
    }).start();

    Animated.timing(textDriftRight, {
      toValue: animatedScrollYValue.interpolate({
        inputRange: [0, headerHeight * 2 + bottomTextDriftOffset, headerHeight * 3 + bottomTextDriftOffset, headerHeight * 4 + bottomTextDriftOffset],
        outputRange: [drift, 0, 0, -drift],
        extrapolate: 'clamp',
      }),
      easing: Easing.linear,
      duration: 350,
      useNativeDriver: true,
    }).start();
    */

  }, [animatedScrollYValue, headerHeight, bottomTextDriftOffset, drift]);


  
  const infoStyle = {
    marginTop: 25
  }
  const headerStyle = {
    marginTop: smallScreen ? 75 : 100,
  }
  const textStyle = {
    textAlign: 'center' as 'center',
    textShadowColor: '#5B80A0',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  }

  return (
    <AnimatedScreen fadeIn={!smallScreen} fadeOut={route?.params?.fadeOut}>
      <Animated.ScrollView
        style={{ height: 1 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: animatedScrollYValue } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={100}
      >
      <Flex fullWidth centered>
        <Animated.View style={{
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: 1, 
          marginTop: headerHeight, 
          marginBottom: headerHeight, 
          transform: [{translateY: headerOffset}]
        }}>
          <Animated.View style={{
            position: 'absolute',
            opacity: titleOpacity,
            transform: [
              {
                translateX: titleOffset,
                translateY: -150,
              }
            ]
          }}>
            <StyledText type={smallScreen ? "body" : "header"}>LaPlante Studios</StyledText>
          </Animated.View>
          <Animated.View style={{
            position: 'absolute',
            opacity: logoOpacity,
            transform: [
              {
                translateX: logoOffset
              }
            ]
          }}>
            <Image 
              source={logo}
              style={{
                width: smallScreen ? 125 : 250,
                height: smallScreen ? 125 : 250,
              }}
            />
          </Animated.View>
        </Animated.View>
        <Animated.View style={{opacity: restOpacity}} onLayout={(event) => setLorecraftHeight(event.nativeEvent.layout.height)}>
          <Flex style={{paddingHorizontal: 50}} centered>
            <Image 
              source={lorecraftBackground}
              style={{
                width: Dimensions.get('window').width,
                height: lorecraftHeight,
                top: 0,
                position: 'absolute',
                zIndex: -1,
              }}
              resizeMode='stretch'
            />
            <Animated.Image 
              source={title}
              style={{
                width: smallScreen ? 300 : 600,
                height: smallScreen ? 125 : 250,
                transform: [{scale: imageZoom}]
              }}
            />
            
            <StyledText
              animated
              type="body"
              style={{
                marginBottom: 25,
                transform: [{translateX: textDriftLeft}, {scale: textZoom}],
                ...textStyle
            }}
              onPress={() => Linking.openURL("http://www.google.com")}
            >
              Order now on Kickstarter, click here!
            </StyledText>
            
            <Flex row wrap centered>
              <Flex style={{marginHorizontal: smallScreen ? 0 : 50, marginVertical: 25}}>
              <iframe
                width={smallScreen ? "280" : "560"}
                height={smallScreen ? "160" : "315"}
                src="https://www.youtube.com/embed/OjyGHSUeTyg"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              </Flex>
              <Flex style={{marginHorizontal: smallScreen ? 0 : 50, marginVertical: 25}}>
              <iframe
                width={smallScreen ? "280" : "560"}
                height={smallScreen ? "160" : "315"}
                src="https://www.youtube.com/embed/19Ma2sum7aQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
              </Flex>
            </Flex>
            <StyledText
              type="body"
              animated
              style={{
                marginTop: 25,
                paddingBottom: smallScreen ? 75 : 100,
                transform: [{translateX: textDriftRight}, {scale: textZoom}],
                ...textStyle
            }}
              onPress={() => Linking.openURL("https://boardgamegeek.com/boardgame/398730/lorecraft")}
            >
              See on Board Game Geek, click here!
            </StyledText>
          </Flex>
        </Animated.View>
        <Animated.View style={{opacity: restOpacity}}>
          <Flex style={{paddingHorizontal: 50}} centered>
            <StyledText type="body" style={headerStyle}>About</StyledText>
            <StyledText type="caption" style={infoStyle}>
              We're a small studio of just 2 people making games that inspire creativity, strategy, and laughter. If that's something you like, then.... cool.
            </StyledText>
            <StyledText type="body" style={headerStyle}>Contact Us</StyledText>
            <StyledText type="caption" style={infoStyle}
              onPress={() => Linking.openURL("mailto:bmbmjmdm@gmail.com,jay.uppal@gmail.com")}>
              Just click here it's easy
            </StyledText>
            <View style={{height: 100}} />
          </Flex>
        </Animated.View>
      </Flex>
      </Animated.ScrollView>
    </AnimatedScreen>
  );
};


/*



          <Flex centered>
            <Animated.View style={{
              flexDirection: 'row',
              width: finalWaitlist,
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
                  width={finalWaitlist + "px"}
                  height="400px"
                  src="https://getwaitlist.com/waitlist/8254"
              />
            </Animated.View>
          </Flex>

          */