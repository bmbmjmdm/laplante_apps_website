// @ts-ignore-next-line
import { View, Image, Dimensions } from "react-native";
import React, { FunctionComponent, useContext } from "react";
import { Flex, Padding, StyledText } from "../Components";
import { ShowcaseButton } from "./ShowcaseButton";
import { ThemeContext } from "../Theme";

type ShowcaseRowProps = {
  title: string;
  description: string;
  image: any;
  horizontalImage?: boolean;
  customImageDimensions?: { width: number; height: number };
  sharpEdges?: boolean;
  android?: string;
  apple?: string;
  link?: string;
  isFirst?: boolean;
};

// This component shows off a project/app/job/etc
// It displays a title, description, image, and links
export const ShowcaseRow: FunctionComponent<ShowcaseRowProps> = ({
  title,
  description,
  image,
  horizontalImage = false,
  sharpEdges = false,
  android,
  apple,
  link,
  customImageDimensions,
  isFirst = false,
}) => {
  const theme = useContext(ThemeContext);
  const imageWidth = customImageDimensions
    ? customImageDimensions.width
    : horizontalImage
    ? theme.showcaseImageLong
    : theme.showcaseImageShort;
  const imageHeight = customImageDimensions
    ? customImageDimensions.height
    : horizontalImage
    ? theme.showcaseImageShort
    : theme.showcaseImageLong;
  // we dont need a listener since the theme listens for us
  const singleColumn = Dimensions.get("window").width < 650;

  const buttons = (
    <Flex row style={{ marginTop: "auto" }}>
      {apple && (
        <ShowcaseButton
          link={apple}
          name={"Apple"}
          singleColumn={singleColumn}
        />
      )}
      {android && (
        <ShowcaseButton
          link={android}
          name={"Android"}
          singleColumn={singleColumn}
        />
      )}
      {link && (
        <ShowcaseButton link={link} name={"Link"} singleColumn={singleColumn} />
      )}
    </Flex>
  );
  const titleComponent = (
    <StyledText
      type={"body"}
      style={{
        width: singleColumn ? undefined : theme.showcaseTextWidth,
        textAlign: singleColumn ? "center" : undefined,
      }}
    >
      {title}
    </StyledText>
  );
  const descriptionComponent = (
    <StyledText
      type={"caption"}
      style={{
        width: singleColumn ? undefined : theme.showcaseTextWidth,
        textAlign: singleColumn ? "center" : undefined,
      }}
    >
      {description}
    </StyledText>
  );
  const imageComponent = (
    <Image
      source={image}
      style={{
        width: imageWidth,
        height: imageHeight,
        resizeMode: "stretch",
        borderRadius: sharpEdges ? 5 : 20,
        position: singleColumn ? undefined : "absolute",
        left: singleColumn ? undefined : imageHeight / 2,
      }}
    />
  );

  // on larger screens, we have 2 columns. in the left is the title, description, and buttons. in the right is the image
  // on smaller screens, we have 1 column. This is then split based on the orientation of the image:
  // if the image is vertical, we have the title and buttons to the left of the image, then the description below both of them
  // if the image is horizontal, we have them all stacked: title above image above description above buttons
  return (
    <Flex fullWidth centered>
      <Flex slim centered>
        {(!isFirst || !singleColumn) && <View style={theme.showcaseDivider} />}
        <Padding vertical={theme.largeSpace} />
        {singleColumn ? (
          <Flex centered>
            {horizontalImage || customImageDimensions ? (
              <>
                {titleComponent}
                <Padding vertical={theme.mediumSpace} />
                {imageComponent}
                <Padding vertical={theme.mediumSpace} />
                {descriptionComponent}
                <Padding vertical={theme.smallSpace} />
                {buttons}
              </>
            ) : (
              <>
                <Flex row centered>
                  <Flex centered full>
                    {titleComponent}
                    <Padding vertical={theme.smallSpace} />
                    {buttons}
                  </Flex>
                  <Padding horizontal={theme.smallSpace} />
                  <Flex full>{imageComponent}</Flex>
                </Flex>
                <Padding vertical={theme.mediumSpace} />
                {descriptionComponent}
              </>
            )}
          </Flex>
        ) : (
          <Flex row>
            <Flex>
              {titleComponent}
              <Padding vertical={theme.mediumSmallSpace} />
              {descriptionComponent}
              <Padding vertical={theme.smallSpace} />
              {buttons}
            </Flex>
            <View
              style={{ width: theme.showcaseImageLong, height: imageHeight }}
            >
              {imageComponent}
            </View>
          </Flex>
        )}
        <Padding vertical={theme.largeSpace} />
      </Flex>
    </Flex>
  );
};
