// @ts-ignore-next-line
import React, { FunctionComponent, useRef } from 'react';
import { Flex } from '../Components';
import { HomeScreenMessage } from './HomeScreenMessage';
import { HomeScreenImages } from './HomeScreenImages';
import { AnimatedScreen } from './AnimatedScreen';
import { StackScreenProps } from '@react-navigation/stack';

export const HomeScreen:FunctionComponent<StackScreenProps<any>> = ({ route }) => {
  const catMode = useRef(false);

  return (
    <AnimatedScreen fadeOut={route?.params?.fadeOut}>
      <Flex full centered>
        <Flex full slim row>
          <Flex full centeredVertical style={{paddingHorizontal: 50, marginTop: -50}}>
            <HomeScreenMessage setCatMode={(mode) => catMode.current = mode} />
          </Flex>
          <Flex full centered style={{paddingHorizontal: 50}}>
            <HomeScreenImages catMode={catMode} />
          </Flex>
        </Flex>
      </Flex>
    </AnimatedScreen>
  );
}
