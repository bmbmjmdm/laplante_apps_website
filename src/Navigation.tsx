import React, { FunctionComponent, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeContext, ThemeProvider } from "./Theme";
import { HomeScreen, WorkScreen, AppsScreen, NonAppsScreen, LorecraftScreen } from "./Screens";
// @ts-ignore-next-line
import LinearGradient from "react-native-web-linear-gradient";
import { ScreenHeader } from "./Components";

const Stack = createStackNavigator();

// the base app component wraps the app in our theme provider and fully expands to screen size
const App: FunctionComponent<{}> = () => {
  return (
    <ThemeProvider>
      <Navigator />
    </ThemeProvider>
  );
};

// Here is where all of our screens and paths are defined in a central naviator
// We also define our background color here
const Navigator: FunctionComponent<{}> = () => {
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
      notification: "",
    },
  };
  // setup our header on all screens
  const defaultOptions = {
    header: ScreenHeader,
  };
  // setup linking to allow the url path to be used to navigate, as well as the back button
  const config = {
    screens: {
      Home: "home",
      Work: "work",
      Apps: "apps",
      NonApps: "nonapps",
      Boardgames: "boardgames"
    },
  };
  const linking = { config, prefixes: [] };
  return (
    <LinearGradient
      colors={theme.background}
      style={{ height: "100vh", overflow: "hidden" }}
      {...theme.linearGradient}
    >
      <NavigationContainer theme={emptyTheme} linking={linking}>
        <Stack.Navigator initialRouteName="Boardgames">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={defaultOptions}
          />
          <Stack.Screen
            name="Work"
            component={WorkScreen}
            options={defaultOptions}
          />
          <Stack.Screen
            name="Apps"
            component={AppsScreen}
            options={defaultOptions}
          />
          <Stack.Screen
            name="NonApps"
            component={NonAppsScreen}
            options={defaultOptions}
          />
          <Stack.Screen
            name="Boardgames"
            component={LorecraftScreen}
            options={{
              header: () => null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
  );
};

export default App;
