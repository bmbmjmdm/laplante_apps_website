// @ts-ignore-next-line
import { StyleSheet, TextStyle, Dimensions, ViewStyle, DimensionsValue } from 'react-native';
import React, { FunctionComponent, ReactNode, createContext } from 'react';
import white_menu from "./assets/menu_white.png";
import { useState } from 'react';
import { useEffect } from 'react';

// helper function to clamp a value between a min and max
const clamp = (min:number, max:number, val:number) => {
  return Math.round(Math.min(Math.max(val, min), max));
}

// theme-independent basic layout styling
export const styles = StyleSheet.create({
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
  reverseRow: {
    flexDirection: 'row-reverse',
  },
  reverseColumn: {
    flexDirection: 'column-reverse',
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
const defaultTheme = (scale: number) => ({
  header: {
    fontSize: clamp(45, 70, 100 * scale),
    fontWeight: "bold",
  },
  body: {
    fontSize: clamp(30, 45, 75 * scale), 
  },
  caption: {
    fontSize: clamp(20, 30, 45 * scale), 
  },
  buttonText: {
    fontSize: clamp(14, 16, 30 * scale), 
    paddingBottom: 2,
  },
  phoneHeight: clamp(800, 1232, 1500 * scale),
  phoneScaleInitial: 1.25,
  phoneScaleFinal: 0.65,
  appScaleInitial: 0.5,
  appCycleTime: 6,
  largeSpace: clamp(50, 100, 150 * scale),
  mediumSpace: clamp(25, 50, 75 * scale),
  mediumSmallSpace: clamp(17, 35, 55 * scale),
  smallSpace: clamp(8, 15, 25 * scale),
  messageHeightHolder: clamp(50, 100, 150 * scale),
  screenAnimationY: clamp(150, 200, 300 * scale),
  showcaseImageLong: clamp(250, 400, 600 * scale),
  showcaseImageShort: clamp(125, 200, 300 * scale),
  showcaseTextWidth: clamp(200, 500, 700 * scale),
  appLinkSize: clamp(40, 70, 100 * scale),
  webLinkHeight: clamp(30, 50, 75 * scale),
  webLinkWidth: clamp(60, 100, 150 * scale),
  linearGradient: {
    useAngle: true,
    angle: 135,
    angleCenter: { x: 0.5, y: 0.5}
  },
  sideMenuWidth: clamp(150, 235, 400 * scale),
  sideMenuSpeed: 450,
  menuSize: clamp(35, 50, 100 * scale),
})

// where our themes are defined
// these all accept a scale variable, which is used to scale the theme's styling to different screen sizes
// as such, they cannot be used without first providing scale
export const Themes:Record<ThemeName, (scale: number) => Theme> = {
  dark: (scale) => ({
    ...defaultTheme(scale),
    name: "dark",
    text: {
      color: "#FFFFFF",
    },
    background: ['#000000', '#000000', '#1a1a1a', '#3d3d3d'],
    navButton: {
      backgroundColor: "#DDDDDD",
      borderRadius: 999,
      width: clamp(35, 50, 100 * scale),
      height: clamp(35, 50, 100 * scale),
      marginLeft: clamp(35, 50, 100 * scale),
    },
    menu: white_menu,
    showcaseDivider: {
      width: "50%",
      height: 2,
      backgroundColor: "#FFFFFF",
    },
    linkBackground: ['#ffb0fb', '#19344d'],
  })
}

// the theme provider/context used to provide the theme to all components/screens
type ThemeProviderProps = {
  children: ReactNode;
  name: (scale:number) => Theme;
}

// set the initial context using the dark theme and starting window width
export const ThemeContext = createContext<Theme>(Themes['dark'](Dimensions.get('window').width));

export const ThemeProvider:FunctionComponent<ThemeProviderProps> = ({ name, children }) => {
  // scaling operations for different screen sizes
  // we normalize around 1984 because thats my monitor's width :P 
  const [scale, setScale] = useState(Dimensions.get('window').width / 1984);

  useEffect(() => {
    const unsub = Dimensions.addEventListener('change', ({ window }:DimensionsValue) => {
      setScale(window.width / 1984)
    });
    return unsub.remove;
  }, [])

  return (
    <ThemeContext.Provider value={name(scale)}>
      {children}
    </ThemeContext.Provider>
  )
}
