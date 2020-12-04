import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, ImageBackground } from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { setTestDeviceIDAsync, AdMobBanner } from "expo-ads-admob";
import { useTheme } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import backgroundDefault from "../../assets/background-default.png";
import backgroundDark from "../../assets/background-dark.png";

import api from "../../services/api";

import styles from "./styles";

const Chat = () => {
  const { dark } = useTheme();

  useEffect(() => {
    const setTestDevice = async () => await setTestDeviceIDAsync("EMULATOR");
    setTestDevice();
  }, []);

  const BOT_USER = {
    _id: 2,
    name: "GiftedChat",
    avatar: require("../../assets/profile.png"),
  };

  const [messages, setMessages] = useState([
    {
      _id: 1,
      text:
        "Hi, I'm Chevy. I came from another planet, but I've learned a little English. Shall we talk?",
      createdAt: new Date(),
      user: BOT_USER,
    },
  ]);

  const onSend = async (newMessages) => {
    let botResponseMessage = {};
    try {
      const res = await api.get("v1/dialog", {
        params: {
          speech: newMessages[0].text,
          status: "approved",
        },
      });

      const dialogs = res.data.data;

      if (res.status === 200) {
        botResponseMessage = {
          _id: messages.length + 1,
          text: dialogs[Math.floor(Math.random() * dialogs.length)].answer,
          createdAt: new Date(),
          user: BOT_USER,
        };
      }
    } catch (err) {
      botResponseMessage = {
        _id: messages.length + 1,
        text:
          "Sorry, I still don't know what you mean, could you teach me? Please access the Manage Dialogs menu",
        createdAt: new Date(),
        user: BOT_USER,
      };
      console.log(err);
    }

    newMessages.unshift(botResponseMessage);
    setMessages(GiftedChat.append(messages, newMessages));
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: "white",
          },
          right: {
            color: "white",
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: "#7D3C98",
          },
          right: {
            backgroundColor: "#BB8FCE",
          },
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Feather name="send" size={30} color="#7D3C98" />
        </View>
      </Send>
    );
  };
  const bannerError = () => {
    console.log("An error");
    return;
  };
  return (
    <View style={styles.container}>
      <AdMobBanner
        adUnitID="ca-app-pub-8494738329887200/1370766736" //"ca-app-pub-3940256099942544/6300978111"
        didFailToReceiveAdWithError={bannerError}
      />
      <ImageBackground
        source={dark ? backgroundDark : backgroundDefault}
        style={{
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
        }}
      >
        <GiftedChat
          {...{ messages, onSend }}
          renderSend={renderSend}
          renderBubble={renderBubble}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#7D3C98" />
          )}
          user={{
            _id: 1,
          }}
        />
      </ImageBackground>
    </View>
  );
};

export default Chat;
