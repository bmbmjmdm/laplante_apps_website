// @ts-ignore-next-line
import {  } from 'react-native';
import React, { FunctionComponent } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Flex } from './Components';


export const HomeScreen:FunctionComponent<{}> = () => {
  // get the navigation object from the context
  const navigator = useNavigation();
  return (
    <Flex full centered>
    </Flex>
  );
}
