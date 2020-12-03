import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Divider } from "react-native-paper";

import styles from "./styles";

const data = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Suggest Dialogues",
    subtitle: "Suggest a dialogue and be part of our community",
    icon: require("../../assets/suggest.png"),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Evaluate Dialogues",
    subtitle: "Rate dialogues suggested by other users",
    icon: require("../../assets/evaluate.png"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "My Dialogues",
    subtitle: "Check the status of your suggested dialogs",
    icon: require("../../assets/my_dialogs.png"),
  },
];

export default Factory = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.constainer}>
      {data.map((item) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => navigation.navigate(item.title)}
          >
            <View
              style={[
                styles.itemConteiner,
                { backgroundColor: colors.secondary },
              ]}
              r
            >
              <Image style={styles.itemIcon} source={item.icon} />
              <View style={styles.itemTexts}>
                <Text style={styles.title}>{item.title}</Text>
                <Text
                  style={[styles.subtitle, { color: colors.textSecondary }]}
                >
                  {item.subtitle}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
