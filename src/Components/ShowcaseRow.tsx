// @ts-ignore-next-line
import { View, Image } from 'react-native';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Flex, Padding, StyledText, Typewriter, TypewriterProps } from '../Components';
import { ShowcaseButton } from './ShowcaseButton';

type ShowcaseRowProps = {
  title: string;
  description: string;
  image: any;
  android?: string;
  apple?: string;
}

export const ShowcaseRow:FunctionComponent<ShowcaseRowProps> = ({ 
  title,
  description,
  image,
  android,
  apple,
 }) => {

  return (
    <Flex fullWidth centered>
      <Flex slim centered>
        <View style={{ width: "50%", height: 2, backgroundColor: "white", }} />
        <Padding vertical={100} />
        <Flex row>
          <Flex>
            <StyledText type={"body"}>{title}</StyledText>
            <Padding vertical={30} />
            <StyledText type={"caption"} style={{width: 500, marginBottom: 10}}>{description}</StyledText>
              <Flex row style={{marginTop: "auto"}}>
              {apple &&
                <ShowcaseButton link={apple} name={"Apple"} />
              }
              {android && 
                <ShowcaseButton link={android} name={"Android"} />
              }
            </Flex>
          </Flex>
          <Flex row>
            <Padding horizontal={200} />
            <Image source={image} style={{width: 200, height: 400, resizeMode: "contain", borderRadius: 30 }} />
          </Flex>
        </Flex>
        <Padding vertical={100} />
      </Flex>
    </Flex>
  )
}