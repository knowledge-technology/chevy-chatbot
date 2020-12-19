import React, { useEffect, useState } from "react";
import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Dialog from "../../../components/Dialog";
import api from "../../../services/api";

import imageDefalt from "../../../assets/not_found.png";

export default function MyDialogues() {
  const [dialogs, setDialogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    if (loading) {
      return;
    }
    if (total > 0 && dialogs.length === total) {
      return;
    }

    setLoading(true);

    const userId = await AsyncStorage.getItem("userId");

    const response = await api.get("/v1/dialog", {
      params: {
        owner: userId,
      },
      headers: { page, limit: 10 },
    });

    setDialogs([...dialogs, ...response.data.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      {dialogs.length > 0 ? (
        <FlatList
          data={dialogs}
          showsVerticalScrollIndicator={false}
          onEndReached={loadData}
          onEndReachedThreshold={0.2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Dialog
              speech={item.speech}
              answer={item.answer}
              createdAt={item.createdAt}
              status={item.status}
              approvalRate={item.approvalRate}
              editable={false}
            />
          )}
        />
      ) : (
        <View style={styles.viewDefault}>
          <Image style={styles.imageDefault} source={imageDefalt} />
          <Text style={styles.textDefault}>
            You have no registered dialogue
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewDefault: { justifyContent: "center", alignItems: "center" },
  imageDefault: {
    resizeMode: "contain",
    borderRadius: 30,
    width: 300,
    height: 600,
  },
  textDefault: {
    fontSize: 18,
    color: "grey",
  },
});
