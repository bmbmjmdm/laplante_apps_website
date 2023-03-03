// @ts-ignore-next-line
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import './App.css';
import { scaleFont } from './helpers';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App:React.FunctionComponent<{}> = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100vh",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#282C34",
  },

  text: {
    color: "#FFFFFF",
    fontSize: scaleFont(48),
  }
});

export default App;
