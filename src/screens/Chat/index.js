import React from "react";
import { View } from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";

import { Feather } from "@expo/vector-icons";

import styles from "./styles";

const Chat = () => {
  const [messages, setMessages] = React.useState([
    {
      _id: 1,
      text:
        "Hi, I'm Chevy. I came from another planet, but I've learned a little English. Shall we talk?",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "GiftedChat",
        avatar: require("../../assets/profile.png"),
      },
    },
  ]);

  const onSend = (newMessages) =>
    setMessages(GiftedChat.append(messages, newMessages));

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

  return (
    <View style={styles.container}>
      <GiftedChat
        {...{ messages, onSend }}
        renderSend={renderSend}
        renderBubble={renderBubble}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default Chat;
