import react from "react";
import { StyleSheet } from "react-native";

import { fonts, metrics } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: metrics.basePadding,
  },
  title: {
    marginVertical: metrics.doubleBaseMargin,
    marginHorizontal: metrics.baseMargin,
    fontSize: fonts.bigger,
    fontWeight: "bold",
  },
  form: {
    flex: 3,
    margin: metrics.baseMargin,
  },

  footer: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  footerText: { color: "white", textAlign: "center" },
});

export default styles;
