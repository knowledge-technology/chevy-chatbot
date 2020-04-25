import React from "react";
import { ScrollView, SafeAreaView, View, Image, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import profileImage from "../../assets/profile.png";
import data from "../../../package.json";
import styles from "./styles";

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image style={styles.profile} source={profileImage} />
        <Text> version: {data.version}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="About"
        onPress={() => Linking.openUrl("https://mywebsite.com/help")}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
