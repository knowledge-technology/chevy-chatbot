import React, { useState, useEffect } from "react";
import { View, Text, Alert, Keyboard, SafeAreaView } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-paper";
import * as Facebook from "expo-facebook";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useTheme } from "@react-navigation/native";

import api from "../../services/api";

import styles from "./styles";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [keyboardShow, setKeyboardShow] = useState(false);

  const { colors } = useTheme();

  async function setDefaultHeaders(res) {
    const { token } = res.metadata;
    const userId = res.data.id;

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await AsyncStorage.setItem("userId", userId);
  }

  async function verifyAuthOrApp() {
    const json = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(json) || {};

    if (json) {
      const apiResponse = await api.get("/v1/authenticate", {
        auth: {
          username: userData.email,
          password: userData.password,
        },
      });

      if (apiResponse.status === 200) {
        setDefaultHeaders(apiResponse.data);
        navigation.replace("Chat");
      }
    }
  }

  async function handleSubmit() {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({ email, password })
      );

      const response = await api.get("/v1/authenticate", {
        auth: {
          username: email,
          password,
        },
      });

      if (response.status === 200) {
        setDefaultHeaders(response.data);
        navigation.replace("Chat");
        setIsLoading(false);
      }
    } catch ({ message }) {
      Alert.alert("Login Error", message);
      setIsLoading(false);
    }
  }

  async function facebookLogIn() {
    try {
      await Facebook.initializeAsync({
        appId: "884194755386321",
      });

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (type === "success") {
        setIsLoading(true);
        const facebookUrl = `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`;

        const facebookResponse = await fetch(facebookUrl).catch((e) =>
          Alert.alert("Facebook Login Error", `${e}`)
        );

        const { id, name, email, picture } = await facebookResponse.json();

        await AsyncStorage.setItem(
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
          navigation.replace("Chat");
        } else {
          setIsLoading(false);
          Alert.alert("App Login Error", apiResponse.data.error);
        }
      }
    } catch ({ message }) {
      setIsLoading(false);
      message === "Request failed with status code 409"
        ? verifyAuthOrApp()
        : Alert.alert("Facebook Login Error", `${message}`);
    }
  }

  const keyboardDidShow = () => {
    setKeyboardShow(true);
  };

  const keyboardDidHide = () => {
    setKeyboardShow(false);
  };

  useEffect(() => {
    verifyAuthOrApp();
    Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", keyboardDidHide);
    };
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.secondary }]}
    >
      <View style={styles.form}>
        <Text style={[styles.title, { color: colors.text }]}>Login</Text>
        <Input
          style={{ color: colors.text }}
          label="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder="email@mail.com"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          style={{ color: colors.text }}
          label="Password"
          autoCapitalize="none"
          placeholder="password"
          textContentType="password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          loading={isLoading}
          mode="contained"
          color={colors.primary}
          onPress={handleSubmit}
        >
          Log in
        </Button>
        <Text style={[styles.footerText, { color: colors.text }]}>or</Text>
        <Button mode="contained" color="#4267b2" onPress={facebookLogIn}>
          Login with Facebook
        </Button>
      </View>

      {keyboardShow || (
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
      )}
    </SafeAreaView>
  );
};

export default Login;
