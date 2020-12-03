import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-paper";
import * as Facebook from "expo-facebook";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "@react-navigation/native";

import api from "../../services/api";

import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const verifyAuthOrApp = async () => {
    const json = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(json) || {};
    if (json) {
      await authenticate(userData);
    }
  };

  async function handleSubmit() {
    const response = await api.get("/v1/authenticate", {
      auth: {
        username: email,
        password,
      },
    });

    if (response.status === 200) {
      setDefaultHeaders(response.data);
      navigation.navigate("Chat");
    }
  }
  async function facebookLogIn() {
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

        AsyncStorage.setItem(
          "userData",
          JSON.stringify({ email, password: id })
        );

        const apiResponse = await api.post("/v1/register", {
          name,
          picture: picture.data.url,
          email,
          password: id,
        });

        if (apiResponse.status === 201) {
          setDefaultHeaders(apiResponse.data);
          navigation.navigate("Chat");
        } else {
          Alert.alert("App Login Error", apiResponse.data.error);
        }
      }
    } catch ({ message }) {
      message === "Request failed with status code 409"
        ? verifyAuthOrApp()
        : Alert.alert("Facebook Login Error", `${message}`);
    }
  }

  useState(() => {
    verifyAuthOrApp();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.secondary }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Login</Text>

      <View style={styles.form}>
        <Input
          style={{ color: colors.text }}
          label="Email"
          textContentType="emailAddress"
          placeholder="email@email.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          style={{ color: colors.text }}
          label="Password"
          placeholder="password"
          textContentType="password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Button mode="contained" color={colors.primary} onPress={handleSubmit}>
          Log in
        </Button>
        <Text style={[styles.footerText, { color: colors.text }]}>Or</Text>
        <Button mode="contained" color="#4267b2" onPress={facebookLogIn}>
          Login with Facebook
        </Button>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.text }]}>
          If you don't have an account:
        </Text>
        <Button
          mode="text"
          color={colors.primary}
          onPress={() => navigation.navigate("Register")}
        >
          Make Your Registration
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Login;
