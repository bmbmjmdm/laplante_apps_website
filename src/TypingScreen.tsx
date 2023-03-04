// @ts-ignore-next-line
import { Button } from 'react-native';
import React, { FunctionComponent } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Flex, TWText, Typewriter } from './Components';


export const TypingScreen1:FunctionComponent<{}> = () => {
  // get the navigation object from the context
  const navigator = useNavigation();
  return (
    <Flex full centered>
      {/* @ts-ignore-next-line*/}
      <Button title="Go to Home2" onPress={() => navigator.push('Home2', {})} /> 
      <Typewriter deleteAfter type="header">Hello World</Typewriter>
    </Flex>
  );
}

export const TypingScreen2:FunctionComponent<{}> = () => {
  // get the navigation object from the context
  const navigator = useNavigation();
  return (
    <Flex full centered>
      {/* @ts-ignore-next-line*/}
      <Button title="Go to Home" onPress={() => navigator.push('Home', {})} /> 
      <Typewriter type="header">Hello World<TWText style={{color: "red"}} onPress={() => alert("TWO")}>2</TWText></Typewriter>
    </Flex>
  );
}
