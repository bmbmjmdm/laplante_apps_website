// @ts-ignore-next-line
import { View, Image } from 'react-native';
import React, { FunctionComponent, useState, useEffect } from 'react';
import { Flex, Padding, StyledText, Typewriter, TypewriterProps } from '../Components';
import { ShowcaseButton } from './ShowcaseButton';

type ShowcaseRowProps = {
  title: string;
  description: string;
  image: any;
  horizontalImage?: boolean;
  sharpEdges?: boolean;
  android?: string;
  apple?: string;
  link?: string;
}

export const ShowcaseRow:FunctionComponent<ShowcaseRowProps> = ({ 
  title,
  description,
  image,
  horizontalImage = false,
  sharpEdges = false,
  android,
  apple,
  link,
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
              {link && 
                <ShowcaseButton link={link} name={"Link"} />
              }
            </Flex>
          </Flex>
          <View style={{ width: 400, height: horizontalImage ? 200 : 400 }}>
            <Image source={image} style={{
              width: horizontalImage ? 400 : 200,
              height: horizontalImage ? 200 : 400,
              resizeMode: "stretch",
              borderRadius: sharpEdges ? 0 : 20,
              position: "absolute",
              left: horizontalImage ? 100 : 200,
            }} />
          </View>
        </Flex>
        <Padding vertical={100} />
      </Flex>
    </Flex>
  )
}