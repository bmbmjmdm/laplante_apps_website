// @ts-ignore-next-line
import { TouchableOpacity, Image } from 'react-native';
import React, { FunctionComponent, useContext } from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { ThemeContext } from '../Theme';
import { Flex, Padding, SideMenu, StyledText } from '.';

export const ScreenHeader:FunctionComponent<StackHeaderProps> = ({ navigation, route, options, back }) => {
  const theme = useContext(ThemeContext);
  const sideMenuRef = React.useRef<{toggleMenu:Function} | null>(null);

  return (
    <Flex fullWidth row centeredVertical style={{paddingHorizontal: theme.largeSpace, paddingVertical: theme.mediumSpace }}>
      <SideMenu navigation={navigation} ref={sideMenuRef} />
      <TouchableOpacity onPress={sideMenuRef.current?.toggleMenu} >
        <Image source={theme.menu} style={{width: theme.menuSize, height: theme.menuSize}} />
      </TouchableOpacity>
      <Padding horizontal={theme.mediumSpace} />
      <StyledText type={"caption"}>
        LaPlante Apps
      </StyledText>
      <StyledText type={"caption"} style={{marginLeft: "auto", marginRight: "auto"}}>
        { route.name === "Home" ? null : route.name }
       </StyledText>
      <TouchableOpacity style={theme.navButton} onPress={() => {}} />
      <TouchableOpacity style={theme.navButton} onPress={() => {}} />
      <TouchableOpacity style={theme.navButton} onPress={() => {}} />
    </Flex>
  )
}