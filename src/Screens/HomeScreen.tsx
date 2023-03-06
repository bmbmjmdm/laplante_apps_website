// @ts-ignore-next-line
import React, { FunctionComponent, useRef } from 'react';
import { Flex } from '../Components';
import { HomeScreenMessage } from './HomeScreenMessage';
import { HomeScreenImages } from './HomeScreenImages';

// TODO make images responsive
// TODO extra out hardcoded styles/etc
export const HomeScreen:FunctionComponent<{}> = () => {
  const catMode = useRef(false);

  return (
    <Flex full centered>
      <Flex full slim row>
        <Flex full centeredVertical>
          <HomeScreenMessage setCatMode={(mode) => catMode.current = mode} />
        </Flex>
        <Flex full centered>
          <HomeScreenImages catMode={catMode} />
        </Flex>
      </Flex>
    </Flex>
  );
}
