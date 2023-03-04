// @ts-ignore-next-line
import { StyleSheet, TextStyle, Dimensions } from 'react-native';
import React, { FunctionComponent, ReactNode, createContext } from 'react';

// scaling operations for different screen sizes
const scale = Dimensions.get('window').width / 1000;

export const scaleFontDefault = (size:number) => {
  return Math.round(size * scale);
}

// styles for our theme
export const styles = StyleSheet.create({
  darkText: {
    color: "#FFFFFF",
  },
  darkBackground: {
    backgroundColor: "#282C34"
  },

  header: {
    fontSize: 48, //scaleFont(48),
  },
  flex: {
    flex: 1
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },

});

// the various theme options available
type ThemeName = "dark";

// the styling options provided by each theme
type Theme = {
  name: ThemeName;
  scaleFont: (size:number) => number;
  body: TextStyle;
  header: TextStyle;
  // background is a string because we need to feed it into our navigation container
  background: string;
}

export const Themes:Record<ThemeName, Theme> = {
  dark: {
    name: "dark",
    scaleFont: scaleFontDefault,
    body: {...styles.darkText},
    header: {...styles.darkText, ...styles.header},
    background: styles.darkBackground.backgroundColor,
  }
}

type ThemeProviderProps = {
  children: ReactNode;
  name: Theme;
}

export const ThemeContext = createContext<Theme>(Themes['dark']);

export const ThemeProvider:FunctionComponent<ThemeProviderProps> = ({ name, children }) => {
  return (
    <ThemeContext.Provider value={name}>
      {children}
    </ThemeContext.Provider>
  )
}