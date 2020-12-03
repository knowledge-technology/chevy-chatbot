import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  item: {
    flex: 1,
  },
  itemConteiner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    elevation: 5,
  },
  itemIcon: {
    resizeMode: "cover",
    borderRadius: 30,
    width: 100,
    height: 100,

    marginLeft: 36,
  },
  itemTexts: {
    flex: 1,

    paddingLeft: 0,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    color: "#7D3C98",
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#BB8FCE",
  },
});

export default styles;
