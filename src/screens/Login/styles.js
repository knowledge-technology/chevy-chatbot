import react from "react";
import { StyleSheet } from "react-native";

import { metrics } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: metrics.basePadding,
  },
  title: {
    flex: 0.5,
    marginVertical: metrics.tripleBaseMargin * 2,
    marginHorizontal: metrics.baseMargin,
    fontSize: 60,
    fontWeight: "bold",
  },
  form: {
    flex: 1.3,
    margin: metrics.baseMargin,
  },
  footer: { flex: 0.2, alignItems: "center", justifyContent: "flex-end" },
  footerText: { textAlign: "center" },
});

export default styles;
