import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    alignSelf: "flex-end",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    color: "white",
    margin: 5,
    backgroundColor: "#BB8FCE",
    textAlign: "right",
  },
  output: {
    width: "80%",
    padding: 10,
    borderRadius: 10,
    color: "white",
    margin: 5,
    backgroundColor: "#7D3C98",
  },
  actionsButton: {
    flex: 1,
    margin: 2,
  },
  cardActions: {
    justifyContent: "space-between",
  },
});

export default styles;
