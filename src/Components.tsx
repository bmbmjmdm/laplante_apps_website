// @ts-ignore-next-line
import { Text, View, ViewStyle, TextStyle } from 'react-native';
import React, { FunctionComponent, useContext, useState, useEffect, useRef, ReactElement, ReactNode } from 'react';
import { ThemeContext, styles } from './Theme';
import { v4 as uuid } from 'uuid';

type TextProps = {
  style?: TextStyle,
  children: ReactNode,
  onPress?: () => void,
  type?: "header" | "body"
}

// Our basic text component that integrates with our theme
export const StyledText:FunctionComponent<TextProps> = (props) => {
  const theme = useContext(ThemeContext);
  // setup style
  let {style, type} = props;
  const newProps  = {...props};
  if (!style) {
    style = {}
  }
  // use the given type to lookup that text type style in our theme
  if (type) {
    newProps.style = {...theme[type], ...style}
  }
  return <Text {...newProps} />
}

type TWTextProps = TextProps & {
  children: string,
}

// A restrictive text component that only allows strings as children
export const TWText:FunctionComponent<TWTextProps> = (props) => {
  return <StyledText {...props} />
}


type TypewriterProps = TextProps & {
  // all children are either strings or TWText components
  children: string | ReactElement<TWTextProps> | (string | ReactElement<TWTextProps>)[],
  // will pause after typing out the text and then delete it one letter at a time
  deleteAfter?: boolean,
  // how many milliseconds to wait before each letter
  speed?: number,
  // how many milliseconds to wait before deleting the text
  pauseTime?: number,
}

// A component that makes it look like a typewriter typing out text on the screen
// currently assumes that the children wont change
export const Typewriter:FunctionComponent<TypewriterProps> = (props) => {
  let {children, deleteAfter = false, speed = 100, pauseTime = 1000} = props;

  // text visible on screen
  const [text, setText] = useState<(ReactElement<TWTextProps>)[]>([]);
  const [index, setIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  // what our final text will look like, represented as an array of single-charcter TWText components
  const finalText = useRef<(ReactElement<TWTextProps>)[]>(parseSubText(children)).current;

  // type characters one at a time
  useEffect(() => {
    if (index <= finalText.length) {
      setTimeout(() => {
        setText(finalText.slice(0, index));
        setIndex(index + 1);
      }, speed);
    } else if (deleteAfter) {
      setTimeout(() => {
        setIsDone(true);
      }, pauseTime);
    }
  }, [index]);

  // delete characters one at a time if deleteAfter is true
  useEffect(() => {
    if (isDone) {
      setTimeout(() => {
        setText(text.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDone(false);
        }
      }, speed);
    }
  }, [isDone, text]);

  return (
    <StyledText {...props}>{text}</StyledText>
  )
}

// turns the children of Typewriter into an array of single-character TWText components
const parseSubText = (text: string | ReactElement<TWTextProps> | (string | ReactElement<TWTextProps>)[]):ReactElement<TWTextProps>[] => {
  if (typeof text === 'string') {
    return text.split('').map((char) => (
      <TWText key={uuid()}>
        {char}
      </TWText>
    ));
  }
  else if (Array.isArray(text)) {
    return text.map((subText) => parseSubText(subText)).flat();
  }
  else {
    const slimmedProps = {...text.props, children: undefined};
    return text.props.children.split('').map((char) => (
      <TWText {...slimmedProps} key={uuid()}>
        {char}
      </TWText>
    ));
  }
}

type FlexProps = {
  full?: boolean;
  centered?: boolean;
  style?: ViewStyle;
  children: ReactNode;
}

// A component that makes it easy to create full-size and/or centered containers
export const Flex:FunctionComponent<FlexProps> = ({full= true, centered= false, style = {}, children}) => {
  return (
    <View style={[full ? styles.flex : {}, centered ? styles.centered : {}, style]}>
      {children}
    </View>
  )
}
