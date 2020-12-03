import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Facebook from "expo-facebook";
import { useTheme } from "@react-navigation/native";

import api from "../../services/api";

import styles from "./styles";

export default App = ({ navigation }) => {
  const { colors } = useTheme();
  const setDefaultHeaders = async (res) => {
    const { token } = res.metadata;
    const userId = res.data.user._id;

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await AsyncStorage.setItem("userId", userId);
  };
  const authenticate = async (userData) => {
    const apiResponse = await api.get("/v1/authenticate", {
      auth: {
        username: userData.email,
        password: userData.password,
      },
    });
    if (apiResponse.status === 200) {
      setDefaultHeaders(apiResponse.data);
      navigation.navigate("Chat");
    }
  };

  const AuthOrApp = async () => {
    const json = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(json) || {};
    if (json) {
      await authenticate(userData);
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

        await authenticate({ email, password: id });

        const apiResponse = await api.post("/v1/register", {
          name,
          picture: picture.data.url,
          email,
          password: id,
        });

        if (apiResponse.status === 201) {
          setDefaultHeaders(apiResponse.data);

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
