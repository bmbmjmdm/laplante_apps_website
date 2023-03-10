// @ts-ignore-next-line
import { StyleSheet, TextStyle, Dimensions, ViewStyle } from 'react-native';
import React, { FunctionComponent, ReactNode, createContext } from 'react';
// @ts-ignore-next-line
import white_menu from "./assets/menu_white.png";

// scaling operations for different screen sizes
const scale = Dimensions.get('window').width / 1000;

// styles for our theme
export const styles = StyleSheet.create({
  darkText: {
    color: "#FFFFFF",
  },
  darkCaption: {
    color: "#AAAAAA",
  },
  darkNavButton: {
    backgroundColor: "#DDDDDD",
    borderRadius: 999,
    width: 50,
    height: 50,
    marginLeft: 50,
  },

  header: {
    fontSize: 70, //70 * scale,
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
  menu: Object | Object[] | number,
  // these color strings are fed into our linear gradient background. if you want a solid background, just provide 1 color
  background: string[];
}

export const Themes:Record<ThemeName, Theme> = {
  dark: {
    name: "dark",
    text: styles.darkText,
    body: styles.body,
    caption: {...styles.caption, ...styles.darkCaption},
    header: styles.header,
    background: ['#000000', '#000000', '#1a1a1a', '#3d3d3d'],
    navButton: styles.darkNavButton,
    menu: white_menu,
    buttonText: styles.buttonText,
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