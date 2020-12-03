import React, { useState } from "react";
import { View, Text, Alert, SafeAreaView } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

import api from "../../services/api";

import styles from "./styles";

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();

  const handleFinalize = async () => {
    setIsLoading(true);
    const data = {
      name,
      picture:
        "https://gravatar.com/avatar/05a9f6e69dfdb24607b72b75f9cd4c41?s=400&d=robohash&r=x",
      email,
      password,
    };
    try {
      await api.post("/v1/register", data);
      navigation.navigate("Login");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Alert.alert("Error", "Error when registering");
    }
  };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.secondary }]}
    >
      <View style={styles.form}>
        <Text style={[styles.title, { color: colors.text }]}>
          Create new account
        </Text>

        <Input
          style={{ color: colors.text }}
          label="Name"
          placeholder="your name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          style={{ color: colors.text }}
          label="Email"
          textContentType="emailAddress"
          placeholder="email@mail.com"
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
        <Button
          style={styles.buttons}
          mode="contained"
          loading={isLoading}
          color={colors.primary}
          onPress={handleFinalize}
        >
          Register
        </Button>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.text }]}>
          If you already have an account:
        </Text>
        <Button
          mode="text"
          color={colors.primary}
          onPress={() => navigation.navigate("Login")}
        >
          Go to Login
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Register;
