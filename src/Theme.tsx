// @ts-ignore-next-line
import { StyleSheet, TextStyle, Dimensions, ViewStyle } from 'react-native';
import React, { FunctionComponent, ReactNode, createContext } from 'react';
import white_menu from "./assets/menu_white.png";

// scaling operations for different screen sizes
const scale = Dimensions.get('window').width / 1000;

// styles used for themes and components
export const styles = StyleSheet.create({

  // Dark theme
  darkText: {
    color: "#FFFFFF",
  },
  darkNavButton: {
    backgroundColor: "#DDDDDD",
    borderRadius: 999,
    width: 50,
    height: 50,
    marginLeft: 50,
  },
  darkDivider: {
    width: "50%",
    height: 2,
    backgroundColor: "#FFFFFF",
  },

  // shared theme sizing
  header: {
    fontSize: 70,
    fontWeight: "bold",
  },
  body: {
    fontSize: 45, 
  },
  caption: {
    fontSize: 30, 
  },
  buttonText: {
    fontSize: 16, 
    paddingBottom: 2,
  },

  // general component styles
  flex: {
    flex: 1
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  slim: {
    width: "100%",
    maxWidth: 1500,
    paddingHorizontal: 50,
  },
  fullWidth: {
    width: "100%",
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
  text: TextStyle;
  body: TextStyle;
  caption: TextStyle;
  buttonText: TextStyle;
  header: TextStyle;
  navButton: ViewStyle;
  showcaseDivider: ViewStyle;
  menu: Object | Object[] | number;
  // these color strings are fed into our linear gradient background. if you want a solid background, just provide 1 color
  background: string[];
  linkBackground: string[];
  phoneHeight: number;
  phoneScaleInitial: number;
  phoneScaleFinal: number;
  appScaleInitial: number;
  appCycleTime: number;
  mediumSpace: number;
  mediumSmallSpace: number;
  smallSpace: number;
  messageHeightHolder: number;
  screenAnimationY: number;
  largeSpace: number;
  showcaseImageLong: number;
  showcaseImageShort: number;
  showcaseTextWidth: number;
  appLinkSize: number;
  webLinkHeight: number;
  webLinkWidth: number;
  linearGradient: Object;
  sideMenuWidth: number;
  sideMenuSpeed: number;
  menuSize: number;
}

// various properties that most themes will have in common, mostly things like component sizing/spacing/positioning
const defaultTheme = {
  body: styles.body,
  caption: styles.caption,
  header: styles.header,
  buttonText: styles.buttonText,
  phoneHeight: 1232,
  phoneScaleInitial: 1.25,
  phoneScaleFinal: 0.65,
  appScaleInitial: 0.5,
  appCycleTime: 6,
  largeSpace: 100,
  mediumSpace: 50,
  mediumSmallSpace: 35,
  smallSpace: 15,
  messageHeightHolder: 100,
  screenAnimationY: 200,
  showcaseImageLong: 400,
  showcaseImageShort: 200,
  showcaseTextWidth: 500,
  appLinkSize: 70,
  webLinkHeight: 50,
  webLinkWidth: 100,
  linearGradient: {
    useAngle: true,
    angle: 135,
    angleCenter: { x: 0.5, y: 0.5}
  },
  sideMenuWidth: 235,
  sideMenuSpeed: 450,
  menuSize: 35,
}

// where our themes are actually defined and set up
export const Themes:Record<ThemeName, Theme> = {
  dark: {
    name: "dark",
    text: styles.darkText,
    background: ['#000000', '#000000', '#1a1a1a', '#3d3d3d'],
    navButton: styles.darkNavButton,
    menu: white_menu,
    showcaseDivider: styles.darkDivider,
    linkBackground: ['#ffb0fb', '#19344d'],
    ...defaultTheme,
  }
}

// the theme provider/context used to provide the theme to all components/screens
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