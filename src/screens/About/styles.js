import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 30,
  },
  description: {
    marginTop: 10,
    textAlign: "center",
  },
  profile: {
    width: 100,
    height: 100,
  },
});

export default styles;
