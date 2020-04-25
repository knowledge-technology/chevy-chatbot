import React from "react";
import { Text, View, Image } from "react-native";

import styles from "./styles";

import profileImage from "../../assets/profile.png";

const CustomTitleContent = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.profile} source={profileImage} />
      <Text style={styles.title}>Chevy</Text>
    </View>
  );
};

export default CustomTitleContent;
