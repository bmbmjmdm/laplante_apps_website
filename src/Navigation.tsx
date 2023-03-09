// @ts-ignore-next-line
import { TouchableOpacity, Image } from 'react-native';
import React, { FunctionComponent, useContext } from 'react';
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
  // by default we dont show the header on any screens
  const defaultOptions = {
    header: Header,
  }
  return (
    <LinearGradient
      colors={theme.background}
      style={{height: "100vh", overflow: "hidden"}}
      useAngle={true}
      angle={135}
      angleCenter={{ x: 0.5, y: 0.5}}
    >
      <NavigationContainer theme={emptyTheme}>
        <Stack.Navigator initialRouteName="Work">
          <Stack.Screen name="Home" component={HomeScreen} options={defaultOptions} />
          <Stack.Screen name="Apps" component={AppsScreen} options={defaultOptions} />
          <Stack.Screen name="Work" component={WorkScreen} options={defaultOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </LinearGradient>
  )
}

// TODO make padding responsive
const Header:FunctionComponent<StackHeaderProps> = ({ navigation, route, options, back }) => {
  const theme = useContext(ThemeContext);

  return (
    <Flex fullWidth row centeredVertical style={{paddingHorizontal: 100, paddingVertical: 50 }}>
      <Image source={theme.menu} style={{width: 35, height: 35}} />
      <Padding horizontal={50} />
      <StyledText type={"caption"}>
        LaPlante Apps
      </StyledText>
      <StyledText type={"caption"} style={{marginLeft: "auto", marginRight: "auto"}}>
        { route.name === "Home" ? null : route.name }
       </StyledText>
      <TouchableOpacity style={[theme.navButton]} onPress={() => {}} />
      <TouchableOpacity style={theme.navButton} onPress={() => {}} />
      <TouchableOpacity style={theme.navButton} onPress={() => {}} />
    </Flex>
  )
}

export default App;
