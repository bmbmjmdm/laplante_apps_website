// @ts-ignore-next-line
import { TouchableOpacity, Image, Animated, Linking, Easing } from 'react-native';
import React, { FunctionComponent, useContext, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackHeaderProps, createStackNavigator } from '@react-navigation/stack';
import { ThemeContext, ThemeProvider, Themes } from './Theme';
import { HomeScreen, WorkScreen, AppsScreen, NonAppsScreen } from './Screens';
// @ts-ignore-next-line
import LinearGradient from 'react-native-web-linear-gradient';
import { Flex, Padding, StyledText } from './Components';

const Stack = createStackNavigator();

// the base app component wraps the app in our theme provider and fully expands to screen size
const App:FunctionComponent<{}> = () => {
  return (
    <ThemeProvider name={Themes['dark']}>
      <Navigator />
    </ThemeProvider>
  );
}

// Here is where all of our screens and paths are defined in a central naviator
// We also define our background color here
const Navigator:FunctionComponent<{}> = () => {
  const theme = useContext(ThemeContext);
  // we pass an empty theme to the navigation container because we prefer to use our theme context
  const emptyTheme = {
    dark: false,
    colors: {
      background: "transparent",
      primary: "",
      card: "",
      text: "",
      border: "",
      notification: ""
    }
  };
  // setup our header on all screens
  const defaultOptions = {
    header: Header,
  }
  // setup linking to allow the url path to be used to navigate, as well as the back button
  const config = {
    screens: {
      Home: 'home',
      Apps: 'apps',
      Work: "work"
    },
  };
  const linking = { config, prefixes: [] }
  return (
    <LinearGradient
      colors={theme.background}
      style={{height: "100vh", overflow: "hidden"}}
      {...theme.linearGradient}
    >
      <NavigationContainer theme={emptyTheme} linking={linking}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={defaultOptions} />
          <Stack.Screen name="Apps" component={AppsScreen} options={defaultOptions} />
          <Stack.Screen name="NonApps" component={NonAppsScreen} options={defaultOptions} />
          <Stack.Screen name="Work" component={WorkScreen} options={defaultOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
  )
}

const Header:FunctionComponent<StackHeaderProps> = ({ navigation, route, options, back }) => {
  const theme = useContext(ThemeContext);
  const sideMenuWidth = theme.sideMenuWidth
  const sideMenuSpeed = theme.sideMenuSpeed

  const sideMenuLeft = useRef(new Animated.Value(-sideMenuWidth)).current;
  const sideMenuOpacity = useRef(new Animated.Value(1)).current;
  const isSideMenuShown = useRef(false);
  const toggleMenu = (fast?: boolean) => {
    Animated.timing(sideMenuLeft, {
      toValue: isSideMenuShown.current ? -sideMenuWidth : 0, 
      duration: fast ? sideMenuSpeed/2 : sideMenuSpeed, 
      easing: Easing.out(Easing.sin), 
      useNativeDrivers: false
    }).start(() => {
      isSideMenuShown.current = !isSideMenuShown.current
    })
  }

  const navigate = (path:string) => () => {
    navigation.setParams({fadeOut: true});
    toggleMenu(true)
    Animated.timing(sideMenuOpacity, {
      toValue: 0,
      duration: sideMenuSpeed/2,
      useNativeDrivers: false
    }).start(() => {
      navigation.push(path)
      setTimeout(() => {
        sideMenuOpacity.setValue(1);
      }, 100)
    })
  }
  // TODO I use navigation.replace here to allow fading-out the current screen, however 
  // this prevents the back button from working. If I use navigation.push, the back button works, but the screen doesn't fade out
  return (
    <Flex fullWidth row centeredVertical style={{paddingHorizontal: theme.largeSpace, paddingVertical: theme.mediumSpace }}>
      <Animated.View style={{
        padding: theme.mediumSpace,
        paddingTop: theme.largeSpace,
        opacity: sideMenuOpacity,
        marginTop: theme.largeSpace,
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        transform: [{translateX: sideMenuLeft}]
      }}>
        <TouchableOpacity onPress={navigate("Home")}>
          <StyledText type={"body"}>
            Home
          </StyledText>
        </TouchableOpacity>
        <Padding vertical={theme.mediumSmallSpace} />
        <TouchableOpacity onPress={navigate("Apps")}>
          <StyledText type={"body"}>
            Apps
          </StyledText>
        </TouchableOpacity>
        <Padding vertical={theme.mediumSmallSpace} />
        <TouchableOpacity onPress={navigate("NonApps")}>
          <StyledText type={"body"}>
            NonApps
          </StyledText>
        </TouchableOpacity>
        <Padding vertical={theme.mediumSmallSpace} />
        <TouchableOpacity onPress={navigate("Work")}>
          <StyledText type={"body"}>
            Work
          </StyledText>
        </TouchableOpacity>
        <Padding vertical={theme.mediumSmallSpace} />
        <a href="mailto:bmbmjmdm@gmail.com">
          <StyledText type={"body"}>
            Contact
          </StyledText>
        </a>
      </Animated.View>
      <TouchableOpacity onPress={toggleMenu} >
        <Image source={theme.menu} style={{width: theme.menuSize, height: theme.menuSize}} />
      </TouchableOpacity>
      <Padding horizontal={theme.mediumSpace} />
      <StyledText type={"caption"}>
        LaPlante Apps
      </StyledText>
      <StyledText type={"caption"} style={{marginLeft: "auto", marginRight: "auto"}}>
        { route.name === "Home" ? null : route.name }
       </StyledText>
      <TouchableOpacity style={theme.navButton} onPress={() => {}} />
      <TouchableOpacity style={theme.navButton} onPress={() => {}} />
      <TouchableOpacity style={theme.navButton} onPress={() => {}} />
    </Flex>
  )
}

export default App;
