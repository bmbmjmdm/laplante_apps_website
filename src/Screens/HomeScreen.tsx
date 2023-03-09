// @ts-ignore-next-line
import React, { FunctionComponent, useRef } from 'react';
import { Flex } from '../Components';
import { HomeScreenMessage } from './HomeScreenMessage';
import { HomeScreenImages } from './HomeScreenImages';
import { AnimatedScreen } from './AnimatedScreen';

export const HomeScreen:FunctionComponent<{}> = () => {
  const catMode = useRef(false);

  return (
    <AnimatedScreen>
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
