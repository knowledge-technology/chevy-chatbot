import React, { useEffect, useState } from "react";
import { View, Image, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Dialog from "../../../components/Dialog";
import api from "../../../services/api";

import imageDefalt from "../../../assets/not_found.png";

export default function MyDialogues() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      const response = await api.get("/v1/dialog", {
        params: {
          user: userId,
        },
      });

      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      {data.length > 0 ? (
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
