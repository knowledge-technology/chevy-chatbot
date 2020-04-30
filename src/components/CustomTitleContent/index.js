import React from "react";
import { Text, View, Image } from "react-native";
import { useTheme } from "@react-navigation/native";

import styles from "./styles";

import profileImage from "../../assets/profile.png";

const CustomTitleContent = (props) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Image style={styles.profile} source={profileImage} />
      <Text style={[styles.title, { color: colors.text }]}>Chevy</Text>
    </View>
  );
};

export default CustomTitleContent;
