import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import * as Facebook from "expo-facebook";

import styles from "./styles";

export default App = ({ navigation }) => {
  const facebookLogIn = async () => {
    try {
      await Facebook.initializeAsync("884194755386321");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (type === "success") {
        const facebookUrl = `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`;

        const response = await fetch(facebookUrl).catch((e) =>
          Alert.alert("Facebook Login Error", `${e}`)
        );
        const { name, email, picture } = await response.json();
        try {
          await AsyncStorage.setItem("name", name);
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("picture", picture.data.url);
          await AsyncStorage.setItem("isLoggedin", "true");
        } catch (e) {
          Alert.alert("Async Storage Error", `${e}`);
        }
        navigation.navigate("Chat");
      }
    } catch ({ message }) {
      Alert.alert("Facebook Login Error", `${message}`);
    }
  };

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
