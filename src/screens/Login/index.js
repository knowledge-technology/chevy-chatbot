import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import * as Facebook from "expo-facebook";

import api from "../../services/api";

import styles from "./styles";

export default App = ({ navigation }) => {
  const setDefaultHeaders = (res) => {
    const { token } = res.data;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const AuthOrApp = async () => {
    const json = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(json) || {};

    const apiResponse = await api
      .post("/v1/authenticate", userData)
      .catch((e) => {
        console.log(e);
      });

    if (apiResponse.status === 200) {
      setDefaultHeaders(apiResponse);
      navigation.navigate("Chat");
    }
  };

  const facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync("884194755386321");

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (type === "success") {
        const facebookUrl = `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`;

        const facebookResponse = await fetch(facebookUrl).catch((e) =>
          Alert.alert("Facebook Login Error", `${e}`)
        );

        const { id, name, email, picture } = await facebookResponse.json();

        const apiResponse = await api.post("/v1/register", {
          name,
          picture: picture.data.url,
          email,
          password: id,
        });

        if (apiResponse.status === 201) {
          setDefaultHeaders(apiResponse);

          AsyncStorage.setItem(
            "userData",
            JSON.stringify({ email, password: id })
          );

          navigation.navigate("Chat");
        } else {
          Alert.alert("App Login Error", apiResponse.data.error);
        }
      }
    } catch ({ message }) {
      message = "Request failed with status code 400"
        ? AuthOrApp()
        : Alert.alert("Facebook Login Error", `${message}`);
    }
  };

  useState(() => {
    AuthOrApp();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/profile.png")}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={facebookLogIn}>
        <Text style={styles.textButton}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};
