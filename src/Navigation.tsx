// @ts-ignore-next-line
import { TouchableOpacity, Image, Animated, View, Easing } from 'react-native';
import React, { FunctionComponent, useContext, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackHeaderProps, createStackNavigator } from '@react-navigation/stack';
import { ThemeContext, ThemeProvider, Themes } from './Theme';
import { HomeScreen, WorkScreen, AppsScreen } from './Screens';
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
      useAngle={true}
      angle={135}
      angleCenter={{ x: 0.5, y: 0.5}}
    >
      <NavigationContainer theme={emptyTheme} linking={linking}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={defaultOptions} />
          <Stack.Screen name="Apps" component={AppsScreen} options={defaultOptions} />
          <Stack.Screen name="Work" component={WorkScreen} options={defaultOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
  )
}

// TODO make responsive
const Header:FunctionComponent<StackHeaderProps> = ({ navigation, route, options, back }) => {
  const theme = useContext(ThemeContext);
  const sideMenuLeft = useRef(new Animated.Value(-200)).current;
  const sideMenuOpacity = useRef(new Animated.Value(1)).current;
  const isSideMenuShown = useRef(false);
  const toggleMenu = () => {
    Animated.timing(sideMenuLeft, {
      toValue: isSideMenuShown.current ? -200 : 0, 
      duration: 450, 
      easing: Easing.out(Easing.sin), 
      useNativeDrivers: false
    }).start(() => {
      isSideMenuShown.current = !isSideMenuShown.current
    })
  }

  const navigate = (path:string) => () => {
    navigation.replace(path)
    Animated.timing(sideMenuOpacity, {
      toValue: 0,
      duration: 250,
      useNativeDrivers: false
    }).start()
  }

  // TODO I use navigation.replace here to allow fading-out the current screen, however 
  // this prevents the back button from working. If I use navigation.push, the back button works, but the screen doesn't fade out
  return (
    <Flex fullWidth row centeredVertical style={{paddingHorizontal: 100, paddingVertical: 50 }}>
      <Animated.View style={{
        padding: 50,
        paddingTop: 100,
        opacity: sideMenuOpacity,
        marginTop: 100,
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
        <Padding vertical={35} />
        <TouchableOpacity onPress={navigate("Apps")}>
          <StyledText type={"body"}>
            Apps
          </StyledText>
        </TouchableOpacity>
        <Padding vertical={35} />
        <TouchableOpacity onPress={navigate("Work")}>
          <StyledText type={"body"}>
            Work
          </StyledText>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity onPress={toggleMenu} >
        <Image source={theme.menu} style={{width: 35, height: 35}} />
      </TouchableOpacity>
      <Padding horizontal={50} />
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
