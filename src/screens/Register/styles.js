import react from "react";
import { StyleSheet } from "react-native";

import { fonts, metrics } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: metrics.basePadding,
  },
  title: {
    flex: 1,
    marginVertical: metrics.doubleBaseMargin,
    marginHorizontal: metrics.baseMargin,
    fontSize: 60,
    fontWeight: "bold",
  },
  form: {
    flex: 3,
    margin: metrics.baseMargin,
  },

  footer: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  footerText: { color: "white", textAlign: "center" },
});

export default styles;
