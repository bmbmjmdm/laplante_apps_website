// @ts-ignore-next-line
import { View } from 'react-native';
import React, { FunctionComponent, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeContext, ThemeProvider, Themes } from './Theme';
import { HomeScreen } from './HomeScreen';
import { TypingScreen1, TypingScreen2 } from './TypingScreen';

const Stack = createStackNavigator();

// the base app component wraps the app in our theme provider and fully expands to screen size
const App:FunctionComponent<{}> = () => {
  return (
    <ThemeProvider name={Themes['dark']}>
      <View style={{height: "100vh"}}>
        <Navigator />
      </View>
    </ThemeProvider>
  );
}

// Here is where all of our screens and paths are defined in a central naviator
const Navigator:FunctionComponent<{}> = () => {
  const theme = useContext(ThemeContext);
  // we pass an empty theme to the navigation container because we prefer to use our theme context, however we still need to pass the background color
  const emptyTheme = {
    dark: false,
    colors: {
      background: theme.background,
      primary: "",
      card: "",
      text: "",
      border: "",
      notification: ""
    }
  };
  // by default we dont show the header on any screens
  const defaultOptions = {
    headerShown: false,
  }
  return (
    <NavigationContainer theme={emptyTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={defaultOptions} />
        <Stack.Screen name="TypingScreen1" component={TypingScreen1} options={defaultOptions} />
        <Stack.Screen name="TypingScreen2" component={TypingScreen2} options={defaultOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
