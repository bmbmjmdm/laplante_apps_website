// @ts-ignore-next-line
import { View, Image } from 'react-native';
import React, { FunctionComponent, useContext } from 'react';
import { Flex, Padding, StyledText } from '../Components';
import { ShowcaseButton } from './ShowcaseButton';
import { ThemeContext } from '../Theme';

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
  const theme = useContext(ThemeContext);
  const imageWidth = horizontalImage ? theme.showcaseImageLong : theme.showcaseImageShort;
  const imageHeight = horizontalImage ? theme.showcaseImageShort : theme.showcaseImageLong;

  return (
    <Flex fullWidth centered>
      <Flex slim centered>
        <View style={theme.showcaseDivider} />
        <Padding vertical={theme.largeSpace} />
        <Flex row>
          <Flex>
            <StyledText type={"body"} style={{width: theme.showcaseTextWidth}}>{title}</StyledText>
            <Padding vertical={theme.mediumSmallSpace} />
            <StyledText type={"caption"} style={{width: theme.showcaseTextWidth, marginBottom: theme.smallSpace}}>{description}</StyledText>
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
          <View style={{ width: theme.showcaseImageLong, height: imageHeight }}>
            <Image source={image} style={{
              width: imageWidth,
              height: imageHeight,
              resizeMode: "stretch",
              borderRadius: sharpEdges ? 5 : 20,
              position: "absolute",
              left: imageHeight / 2,
            }} />
          </View>
        </Flex>
        <Padding vertical={theme.largeSpace} />
      </Flex>
    </Flex>
  )
}