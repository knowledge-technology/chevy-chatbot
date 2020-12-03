import react from "react";
import { StyleSheet } from "react-native";

import { metrics } from "../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: metrics.basePadding,
  },
  title: {
    flex: 1,
    marginVertical: metrics.tripleBaseMargin * 2,
    marginHorizontal: metrics.baseMargin,
    fontSize: 60,
    fontWeight: "bold",
  },
  form: {
    flex: 3,
    marginHorizontal: metrics.baseMargin,
  },
  footer: { flex: 1, alignItems: "center", justifyContent: "flex-end" },
  footerText: { textAlign: "center" },
});

export default styles;
