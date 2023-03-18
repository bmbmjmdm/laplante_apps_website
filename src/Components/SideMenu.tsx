// @ts-ignore-next-line
import { TouchableOpacity, Animated, Easing } from 'react-native';
import React, { FunctionComponent, useContext, useRef, forwardRef, useImperativeHandle } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ThemeContext } from '../Theme';
import { Padding, StyledText } from '.';
import { ParamListBase } from '@react-navigation/native';

type SideMenuProps = {
  navigation: StackNavigationProp<ParamListBase, string, undefined>;
}

const SideMenuComponent:FunctionComponent<SideMenuProps> = ({ navigation }, ref) => {
  const theme = useContext(ThemeContext);
  const sideMenuWidth = theme.sideMenuWidth
  const sideMenuSpeed = theme.sideMenuSpeed

  const sideMenuLeft = useRef(new Animated.Value(-sideMenuWidth)).current;
  const sideMenuOpacity = useRef(new Animated.Value(1)).current;
  const isSideMenuShown = useRef(false);
  const toggleMenu = (fast?: boolean) => {
    Animated.timing(sideMenuLeft, {
      toValue: isSideMenuShown.current ? -sideMenuWidth : 0, 
      duration: fast ? sideMenuSpeed/2 : sideMenuSpeed, 
      easing: Easing.out(Easing.sin), 
      useNativeDrivers: false
    }).start(() => {
      isSideMenuShown.current = !isSideMenuShown.current
    })
  }

  const navigate = (path:string) => () => {
    navigation.setParams({fadeOut: true});
    toggleMenu(true)
    Animated.timing(sideMenuOpacity, {
      toValue: 0,
      duration: sideMenuSpeed/2,
      useNativeDrivers: false
    }).start(() => {
      navigation.push(path)
      setTimeout(() => {
        sideMenuOpacity.setValue(1);
      }, 100)
    })
  }

  // Let our parent toggle the menu 
  useImperativeHandle(ref, () => ({
    toggleMenu
  }));

  // TODO I use navigation.replace here to allow fading-out the current screen, however 
  // this prevents the back button from working. If I use navigation.push, the back button works, but the screen doesn't fade out
  return (
      <Animated.View style={{
        padding: theme.mediumSpace,
        paddingTop: theme.largeSpace,
        opacity: sideMenuOpacity,
        marginTop: theme.largeSpace,
        height: "100vh", // Replace with svh or dvh if problems with mobile/scrolls?
        position: "absolute",
        left: 0,
        top: 0,
        transform: [{translateX: sideMenuLeft}]
      }}>
        <TouchableOpacity onPress={navigate("Home")}>
          <StyledText type={"body"}>
            Home
          </StyledText>
        </TouchableOpacity>
        <Padding vertical={theme.mediumSmallSpace} />
        <TouchableOpacity onPress={navigate("Apps")}>
          <StyledText type={"body"}>
            Apps
          </StyledText>
        </TouchableOpacity>
        <Padding vertical={theme.mediumSmallSpace} />
        <TouchableOpacity onPress={navigate("NonApps")}>
          <StyledText type={"body"}>
            NonApps
          </StyledText>
        </TouchableOpacity>
        <Padding vertical={theme.mediumSmallSpace} />
        <TouchableOpacity onPress={navigate("Work")}>
          <StyledText type={"body"}>
            Work
          </StyledText>
        </TouchableOpacity>
        <Padding vertical={theme.mediumSmallSpace} />
        <a href="mailto:bmbmjmdm@gmail.com">
          <StyledText type={"body"}>
            Contact
          </StyledText>
        </a>
      </Animated.View>
  )
}

// @ts-ignore-next-line
export const SideMenu = forwardRef(SideMenuComponent);
