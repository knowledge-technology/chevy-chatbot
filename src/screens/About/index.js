import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { Headline, Subheading, Caption } from "react-native-paper";

import profileImage from "../../assets/profile.png";
import data from "../../../package.json";

import styles from "./styles";

const About = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.profile} source={profileImage} />
      <Headline>CHEVY CHATBOT</Headline>
      <Caption> APP: {data.version} | API: 1.0.0 </Caption>
      <Subheading style={styles.description}>{data.description}</Subheading>
      <Caption> Developed by Matheus Barbosa © 2020. </Caption>
    </View>
  );
};

export default About;
