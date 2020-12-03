import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";

import Dialog from "../../../components/Dialog";
import api from "../../../services/api";

export default function EvaluateDialogues() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await api.get("/v1/dialog");
    setData(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Dialog
            dialogId={item._id}
            speech={item.speech}
            answer={item.answer}
            createdAt={item.createdAt}
            isEvaluation
            editable={false}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
