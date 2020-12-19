import react from "react";
import { StyleSheet } from "react-native";

import { fonts, metrics } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: metrics.basePadding,
  },
  title: {
    flex: 0.6,
    marginVertical: metrics.tripleBaseMargin,
    marginHorizontal: metrics.baseMargin,
    fontSize: fonts.bigger,
    fontWeight: "bold",
  },
  form: {
    flex: 3,
    marginHorizontal: metrics.baseMargin,
  },
  footer: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  footerText: { textAlign: "center" },
});

export default styles;
