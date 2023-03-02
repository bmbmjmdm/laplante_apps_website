// @ts-ignore-next-line
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import './App.css';
import { scaleFont } from './helpers';

const App:React.FunctionComponent<{}> = () => {
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
