import React from "react";
import { View, Image, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import profileImage from "../../assets/profile.png";
import data from "../../../package.json";

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openUrl("https://mywebsite.com/help")}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
