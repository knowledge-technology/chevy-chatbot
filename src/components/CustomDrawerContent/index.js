import React from "react";
import { View, Image, Text } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Divider } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import profileImage from "../../assets/profile.png";
import styles from "./styles";

const CustomDrawerContent = (props) => {
  const { colors } = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image style={styles.profile} source={profileImage} />
        <Text style={{ color: colors.text }}>Chevy Chatbot</Text>
      </View>
      <Divider style={[styles.divider, { backgroundColor: colors.text }]} />
      <DrawerItemList {...props} />
      <Divider style={[styles.divider, { backgroundColor: colors.text }]} />
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => (
          <Feather name="log-out" size={size} color={color} />
        )}
        onPress={() => props.navigation.navigate("Login")}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
