import React from "react";
import { View, Image, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Divider } from "react-native-paper";

import { Feather } from "@expo/vector-icons";

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
      <Divider style={styles.divider} />
      <DrawerItemList {...props} />
      <DrawerItem
        label="About"
        icon={({ color, size }) => (
          <Feather name="info" size={size} color={color} />
        )}
        onPress={() => Linking.openUrl("https://mywebsite.com/help")}
      />
      <Divider style={styles.divider} />
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => (
          <Feather name="log-out" size={size} color={color} />
        )}
        onPress={async () => {
          props.navigation.navigate("Login");
        }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
