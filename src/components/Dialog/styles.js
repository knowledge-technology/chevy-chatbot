import { StyleSheet } from "react-native";
import { fonts, metrics } from "../../styles";

const styles = StyleSheet.create({
  container: {
    margin: metrics.baseMargin,
  },
  input: {
    alignSelf: "flex-end",
    width: "80%",
    padding: metrics.basePadding,
    borderRadius: metrics.baseRadius,
    color: "white",
    margin: metrics.smallMargin,
    backgroundColor: "#BB8FCE",
    textAlign: "right",
  },
  output: {
    width: "80%",
    padding: metrics.basePadding,
    borderRadius: metrics.baseRadius,
    color: "white",
    margin: metrics.smallMargin,
    backgroundColor: "#7D3C98",
  },
  actionsButton: {
    flex: 1,
    margin: metrics.smallMargin,
  },
  cardActions: {
    justifyContent: "space-between",
  },
  previewItems: {
    fontSize: fonts.tiny,
  },
});

export default styles;
