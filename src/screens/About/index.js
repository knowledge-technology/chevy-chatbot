import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { View, Image, Linking } from "react-native";
import { Button, Headline, Subheading, Caption } from "react-native-paper";
import axios from "axios";

import profileImage from "../../assets/profile.png";
import data from "../../../package.json";

import styles from "./styles";

const About = (props) => {
  const { colors } = useTheme();
  const [apiVersion, setApiVersion] = useState("v1.0.0");

  const getApiVersion = async () => {
    const response = await axios.get(
      "http://api.github.com/repos/barbosamaatheus/english-talking-api/tags"
    );
    setApiVersion(response.data[0].name);
  };

  useEffect(() => {
    getApiVersion();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.profile} source={profileImage} />
      <Headline style={{ color: colors.text }}>CHEVY CHATBOT</Headline>
      <Caption style={{ color: colors.textSecondary }}>
        APP: v{data.version} | API: {apiVersion}
      </Caption>
      <Subheading style={[styles.description, { color: colors.text }]}>
        {data.description}
      </Subheading>
      <Caption style={{ color: colors.textSecondary }}>
        Developed by Matheus Barbosa © {new Date().getFullYear()}.
      </Caption>
      <Button
        uppercase={false}
        mode="text"
        onPress={() =>
          Linking.openURL(
            "https://github.com/knowledge-corporation/chevy-chatbot/blob/master/PrivacyPolicy.md"
          )
        }
      >
        View privacy policy
      </Button>
    </View>
  );
};

export default About;
