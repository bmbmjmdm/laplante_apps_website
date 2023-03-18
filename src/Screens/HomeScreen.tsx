import React, { FunctionComponent, useRef, useContext } from 'react';
import { Flex } from '../Components';
import { HomeScreenMessage } from './HomeScreenMessage';
import { HomeScreenImages } from './HomeScreenImages';
import { AnimatedScreen } from './AnimatedScreen';
import { StackScreenProps } from '@react-navigation/stack';
import { ThemeContext } from '../Theme';

export const HomeScreen:FunctionComponent<StackScreenProps<any>> = ({ route }) => {
  const catMode = useRef(0);
  const theme = useContext(ThemeContext);
  const space = theme.mediumSpace;

  return (
    <AnimatedScreen fadeOut={route?.params?.fadeOut}>
      <Flex full centered>
        <Flex full slim row>
          <Flex full centeredVertical style={{paddingHorizontal: space, marginTop: -space}}>
            <HomeScreenMessage setCatMode={(mode) => {
              catMode.current = mode ? 1 : 0;
            }} />
          </Flex>
          <Flex full centered style={{paddingHorizontal: space}}>
            <HomeScreenImages catMode={catMode} />
          </Flex>
        </Flex>
      </Flex>
    </AnimatedScreen>
  );
}
