import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";

import { Divider } from "react-native-paper";

import styles from "./styles";

const data = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Suggest dialogues",
    subtitle: "Suggest a dialogue and be part of our community",
    icon: require("../../assets/profile.png"),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Evaluate dialogues",
    subtitle: "Rate dialogues suggested by other users",
    icon: require("../../assets/profile.png"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "My dialogues",
    subtitle: "Check the status of your suggested dialogs",
    icon: require("../../assets/profile.png"),
  },
];

export default Factory = ({ navigation }) => {
  return (
    <View style={styles.constainer}>
      {data.map((item) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => navigation.navigate("Chat")}
          >
            <View style={styles.itemConteiner}>
              <Image style={styles.itemIcon} source={item.icon} />
              <View style={styles.itemTexts}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <Divider style={styles.divider} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
