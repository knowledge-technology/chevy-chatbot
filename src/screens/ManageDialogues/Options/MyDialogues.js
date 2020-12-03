import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Dialog from "../../../components/Dialog";
import api from "../../../services/api";

export default function MyDialogues() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const userId = await AsyncStorage.getItem("userId");

    const response = await api.get("/v1/dialog", {
      params: {
        user: userId,
      },
    });

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
            speech={item.speech}
            answer={item.answer}
            createdAt={item.createdAt}
            status={item.status}
            approvalRate={item.approval_rate}
            editable={false}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
