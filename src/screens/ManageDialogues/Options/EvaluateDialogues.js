import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, FlatList } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Dialog from "../../../components/Dialog";
import imageDefalt from "../../../assets/not_found.png";

import api from "../../../services/api";

export default function EvaluateDialogues({ route }) {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const filterData = [];
    const response = await api.get("/v1/dialog", {
      headers: { page: 1, limit: 10 },
    });

    for (var i = 0; i < response.data.data.length; i++) {
      if (
        !(
          response.data.data[i].approvals.includes(userId) ||
          response.data.data[i].disapprovals.includes(userId) ||
          response.data.data[i].user === userId
        )
      ) {
        filterData.push(response.data.data[i]);
      }
    }
    setData(filterData);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      {data.length > 0 ? (
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          onEndReached={loadData}
          onEndReachedThreshold={0.2}
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
