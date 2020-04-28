import React from "react";
import { View, Image, Linking } from "react-native";
import {
  Modal,
  Button,
  Headline,
  Subheading,
  Caption,
} from "react-native-paper";

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
      <Button
        uppercase={false}
        mode="text"
        onPress={() =>
          Linking.openURL(
            "https://github.com/barbosamaatheus/chevy-chatbot/blob/master/PrivacyPolicy.md"
          )
        }
      >
        View privacy policy
      </Button>
    </View>
  );
};

export default About;
