// @ts-ignore-next-line
import { ScrollView, Dimensions, Animated, ActivityIndicator, Linking, Image, Easing, View, Alert } from 'react-native';
import { AnimatedScreen } from "./AnimatedScreen";
import React, { FunctionComponent, useContext, useEffect, useRef, useState, ReactElement } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { FadeInImage, Flex, ShowcaseRow, StyledText } from "../Components";
import { ThemeContext } from "../Theme";
import { isScreenSmall } from "../Helpers";
import logo from "../assets/logo.png";
import title from "../assets/title.png";
import lorecraftBox from "../assets/lorecraftBox.png";
import lorecraftBackground from "../assets/lorecraftBackground.jpg";
import lorecraftSteps from "../assets/lorecraftSteps.png";
import lorecraftStepsVerticle from "../assets/lorecraftStepsVerticle.png";
import lorecraftCards from "../assets/lorecraftCards.png";
import lorecraftDescriptionWide from "../assets/lorecraftDescriptionWide.png";
import lorecraftDescriptionNarrow from "../assets/lorecraftDescriptionNarrow.png";

const WAITLIST_SIGNUP_URL = 'https://getwaitlist.com/api/v1/signup';
const WAITLIST_ID = 8254;
const WAITLIST_SUCCESS_COLOR = '#22C55E';
const WAITLIST_ERROR_COLOR = '#EF4444';

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
  const [resultText, setResultText] = useState('');
  const [resultColor, setResultColor] = useState(WAITLIST_SUCCESS_COLOR);
  const [resultVisible, setResultVisible] = useState(false);
  const [resultContentHeight, setResultContentHeight] = useState(0);
  const resultOpacity = useRef(new Animated.Value(0)).current;
  const resultContainerProgress = useRef(new Animated.Value(0)).current;
  const resultAnimationRef = useRef<Animated.CompositeAnimation | null>(null);
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

  const notify = (title: string, message?: string) => {
    if (typeof Alert.alert === 'function') {
      Alert.alert(title, message);
    } else if (typeof window !== 'undefined' && typeof window.alert === 'function') {
      window.alert(message ? `${title}\n${message}` : title);
    }
  };

  const showWaitlistResult = (status: 'success' | 'error', message: string) => {
    setResultColor(status === 'success' ? WAITLIST_SUCCESS_COLOR : WAITLIST_ERROR_COLOR);
    setResultText(message);
    setResultVisible(true);
    resultAnimationRef.current?.stop();
    resultContainerProgress.stopAnimation();
    resultOpacity.stopAnimation();
    resultContainerProgress.setValue(0);
    resultOpacity.setValue(0);

    const animation = Animated.sequence([
      Animated.parallel([
        Animated.timing(resultContainerProgress, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(resultOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(5000),
      Animated.parallel([
        Animated.timing(resultOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(resultContainerProgress, {
          toValue: 0,
          duration: 250,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: false,
        }),
      ]),
    ]);

    resultAnimationRef.current = animation;

    animation.start(({ finished }) => {
      if (finished) {
        setResultVisible(false);
        setResultText('');
      }
      resultAnimationRef.current = null;
    });
  };

  const submitWaitlistEmail = async (emailInput?: string) => {
    const email = (emailInput || '').trim();
    if (!email) {
      notify('Email required', 'Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch(WAITLIST_SIGNUP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, waitlist_id: WAITLIST_ID }),
      });

      if (response.ok) {
        showWaitlistResult('success', 'Success! You are on the waitlist.');
      } else {
        showWaitlistResult('error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      showWaitlistResult('error', 'Network error. Please try again later.');
    }
  };

  const handleWaitlistPress = () => {
    const promptHandled =
      typeof Alert.prompt === 'function'
        ? (Alert.prompt(
            'Join the waitlist',
            'Enter your email address to get notified when we launch.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Submit', onPress: (value) => void submitWaitlistEmail(value) },
            ],
            'plain-text'
          ), true)
        : typeof window !== 'undefined' && typeof window.prompt === 'function'
          ? (() => {
              const value = window.prompt('Enter your email to join the Lorecraft waitlist:');
              if (value !== null) void submitWaitlistEmail(value);
              return true;
            })()
          : false;

    if (!promptHandled) {
      notify('Unsupported', 'Inline prompts are not available on this device yet.');
    }
  };


  // scrolling animations
  const animatedScrollYValue = useRef(new Animated.Value(0)).current;
  const headerHeight = smallScreen ? 150 : 200;
  //const drift = smallScreen ? 25 : 50
  const drift = 0
  const bottomTextDriftOffset = smallScreen ? 200 : 0;
  const imageZoom = useRef(new Animated.Value(1)).current;
  const textZoom = useRef(new Animated.Value(1)).current;
  const textDriftLeft = useRef(new Animated.Value(-drift)).current;
  const textDriftRight = useRef(new Animated.Value(drift)).current;
  useEffect(() => {
    Animated.timing(imageZoom, {
      toValue: animatedScrollYValue.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [1, 0.75],
        extrapolate: 'clamp',
      }),
      easing: Easing.linear,
      duration: 250,
      useNativeDriver: true,
    }).start();
    Animated.timing(textZoom, {
      toValue: animatedScrollYValue.interpolate({
        inputRange: [0, headerHeight],
        outputRange: [1, 1.25],
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

  const fallbackResultHeight = smallScreen ? 28 : 34;
  const targetResultHeight = (resultContentHeight || fallbackResultHeight);
  const resultContainerHeight = resultContainerProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, targetResultHeight],
  });

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
            
            <View style={{
              marginBottom: 25,
              alignItems: 'center',
              width: '100%'
            }}>
              <StyledText
                animated
                type={smallScreen ? "caption" : "body"}
                style={{
                  transform: [{translateX: textDriftLeft}, {scale: textZoom}],
                  ...textStyle
              }}
                onPress={handleWaitlistPress}
              >
                {`Join the waitlist, click here!`}
              </StyledText>
              <Animated.View
                style={{
                  marginTop: 4,
                  width: '100%',
                  overflow: 'hidden',
                  alignItems: 'center',
                  height: resultContainerHeight,
                }}
              >
                {resultVisible && (
                  <Animated.Text
                    onLayout={(event) => setResultContentHeight(event.nativeEvent.layout.height)}
                    style={{
                      paddingTop: 50,
                      color: resultColor,
                      opacity: resultOpacity,
                      textAlign: 'center',
                      fontSize: smallScreen ? 12 : 16,
                      fontFamily: 'System'
                    }}
                  >
                    {resultText}
                  </Animated.Text>
                )}
              </Animated.View>
            </View>
            
            <Flex row wrap centered>
              <Flex style={{marginHorizontal: 50, marginVertical: 25}}>
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
              <Flex style={{marginHorizontal: 50, marginVertical: 25}}>
                <Image 
                  source={lorecraftBox}
                  style={{
                    width: smallScreen ? 180 : 360,
                    height: smallScreen ? 294 : 588,
                    borderRadius: smallScreen ? 8 : 16
                  }}
                />
              </Flex>
            </Flex>
            <StyledText
              type={smallScreen ? "caption" : "body"}
              animated
              style={{
                marginTop: 25,
                transform: [{translateX: textDriftRight}, {scale: textZoom}],
                ...textStyle
            }}
              onPress={() => Linking.openURL("https://boardgamegeek.com/boardgame/398730/lorecraft")}
            >
              {`See on Board Game Geek,${smallScreen ? '\n': ''} click here!`}
            </StyledText>
            <Flex style={{marginVertical: smallScreen? 50 : 100}}>
              <Image 
                source={smallScreen ? lorecraftDescriptionNarrow : lorecraftDescriptionWide}
                style={{
                  width: smallScreen ? 217 : 1133,
                  height: smallScreen ? 135 : 120,
                }}
              />
            </Flex>
            <Flex row wrap centered style={{paddingBottom: 35}}>
              <Image 
                source={smallScreen ? lorecraftStepsVerticle : lorecraftSteps}
                style={{
                  width: smallScreen ? 389 : 980,
                  height: smallScreen ? 739 : 664,
                }}
              />
              <Image 
                source={lorecraftCards}
                style={{
                  width: smallScreen ? 200 : 499,
                  height: smallScreen ? 257 : 642,
                  marginTop: smallScreen ? 50 : 0,
                }}
              />
            </Flex>
            
            <View style={{
              paddingBottom: 50,
              alignItems: 'center',
              width: '100%'
            }}>
              <StyledText
                animated
                type={smallScreen ? "caption" : "body"}
                style={{
                  transform: [{translateX: textDriftLeft}, {scale: textZoom}],
                  ...textStyle
              }}
                onPress={handleWaitlistPress}
              >
                {`Join the waitlist, click here!`}
              </StyledText>
              <Animated.View
                style={{
                  marginTop: 4,
                  width: '100%',
                  overflow: 'hidden',
                  alignItems: 'center',
                  height: resultContainerHeight,
                }}
              >
                {resultVisible && (
                  <Animated.Text
                    onLayout={(event) => setResultContentHeight(event.nativeEvent.layout.height)}
                    style={{
                      paddingTop: 50,
                      color: resultColor,
                      opacity: resultOpacity,
                      textAlign: 'center',
                      fontSize: smallScreen ? 12 : 16,
                      fontFamily: 'System'
                    }}
                  >
                    {resultText}
                  </Animated.Text>
                )}
              </Animated.View>
            </View>
          </Flex>
        </Animated.View>
        <Animated.View style={{opacity: restOpacity}}>
          <Flex style={{paddingHorizontal: 50}} centered>
            <StyledText type="body" style={headerStyle}>About</StyledText>
            <StyledText type="caption" style={infoStyle}>
              We're a small studio of just 2 people making games that inspire creativity, strategy, and laughter. If that's something you like, then you're pretty cool
            </StyledText>
            <StyledText type="body" style={headerStyle}>Contact Us</StyledText>
            <StyledText type="caption" style={infoStyle}
              onPress={() => Linking.openURL("mailto:bmbmjmdm@gmail.com")}>
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