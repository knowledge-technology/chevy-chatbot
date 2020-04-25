import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sendButton: {
    marginRight: 10,
    marginBottom: 5,
  },
});
export default styles;
