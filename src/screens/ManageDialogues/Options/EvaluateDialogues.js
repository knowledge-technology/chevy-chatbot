import React from "react";
import { View, FlatList } from "react-native";

import Dialog from "../../../components/Dialog";
// import styles from "./styles";

export default function EvaluateDialogues() {
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      input: "I met someone online yesterday.",
      output: "Who is it?",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      input: "A boy from Budapest.",
      output: "Where is Budapest?",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      input: "I asked him that question, too.",
      output: "What did he say?",
    },
    {
      id: "3ac68afc-3da1-471f-bd96-145571e29d72",
      input: "He said it is in Hungary.",
      output: "Is that very far away?",
    },
    {
      id: "bd7acbea-3da1-471f-bd96-145571e29d72",
      input: "Thousands of miles away.",
      output: "How can you be friends, then?",
    },
    {
      id: "58694a0f-3da1-471f-bd96-3ad53abb28ba",
      input: "I just like talking to him.",
      output: "Maybe he’ll teach you Hungarian.",
    },
  ];

  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Dialog
            speech={item.input}
            answer={item.output}
            isEvaluation
            editable={false}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
