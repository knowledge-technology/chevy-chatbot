import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, FlatList } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Dialog from "../../../components/Dialog";
import imageDefalt from "../../../assets/not_found.png";

import api from "../../../services/api";

export default function EvaluateDialogues({ route }) {
  const [dialogs, setDialogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function filterDialogs(response) {
    const userId = await AsyncStorage.getItem("userId");
    const filterData = [];
    for (var i = 0; i < response.data.data.length; i++) {
      if (
        !(
          response.data.data[i].approvals.includes(userId) ||
          response.data.data[i].disapprovals.includes(userId) ||
          response.data.data[i].owner === userId
        )
      ) {
        filterData.push(response.data.data[i]);
      }
    }
    return filterData;
  }

  const loadData = async () => {
    if (loading) {
      return;
    }
    if (total > 0 && dialogs.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get("/v1/dialog", {
      headers: { page, limit: 10 },
    });

    const filterData = await filterDialogs(response);

    setDialogs([...dialogs, ...filterData]);
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
          renderItem={({ item }) => (
            <Dialog
              dialogId={item.id}
              speech={item.speech}
              answer={item.answer}
              createdAt={item.createdAt}
              isEvaluation
              editable={false}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.viewDefault}>
          <Image style={styles.imageDefault} source={imageDefalt} />
          <Text style={styles.textDefault}>
            No records found, please try again later
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewDefault: {
    justifyContent: "center",
    alignItems: "center",
  },
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
