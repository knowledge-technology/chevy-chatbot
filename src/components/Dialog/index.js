import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Card, Button, Caption } from "react-native-paper";

import styles from "./styles";

const Dialog = (props) => {
  const { isEvaluation, editable, speech = "", answer = "" } = props;

  const [input, setInput] = useState(speech);
  const [output, setOutput] = useState(answer);

  const createActions = (
    <Card.Actions style={styles.cardActions}>
      <Button
        color="#7D3C98"
        style={styles.actionsButton}
        mode="outlined"
        icon={({ size, color }) => (
          <Feather name="plus-circle" size={size} color={color} />
        )}
        onPress={() => console.log("Pressed")}
      >
        Create
      </Button>
    </Card.Actions>
  );

  const evaluationActions = (
    <Card.Actions style={styles.cardActions}>
      <Button
        color="#7D3C98"
        style={styles.actionsButton}
        mode="outlined"
        icon={({ size, color }) => (
          <Feather name="thumbs-up" size={size} color={color} />
        )}
        onPress={() => console.log("Pressed")}
      >
        Approve
      </Button>
      <Button
        color="#7D3C98"
        style={styles.actionsButton}
        mode="outlined"
        icon={({ size, color }) => (
          <Feather name="thumbs-down" size={size} color={color} />
        )}
        onPress={() => console.log("Pressed")}
      >
        Disapprove
      </Button>
    </Card.Actions>
  );

  const previewActions = (
    <Card.Actions style={styles.cardActions}>
      <Caption>Created at: 04/2020</Caption>
      <Caption>Status: approved</Caption>
      <Caption>Approval Rate: 80%</Caption>
    </Card.Actions>
  );

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Chevy Chatbot" subtitle="Dialog" />
        <Card.Content>
          <TextInput
            value={input}
            onChangeText={(text) => setInput({ text })}
            multiline
            placeholder="When someone speaks ..."
            placeholderTextColor="#f1f1f1"
            editable={editable}
            style={styles.input}
          />
          <TextInput
            value={output}
            onChangeText={(text) => setOutput({ text })}
            multiline
            placeholder="The Chevy will answer ..."
            placeholderTextColor="#f1f1f1"
            editable={editable}
            style={styles.output}
          />
        </Card.Content>
        {editable
          ? createActions
          : isEvaluation
          ? evaluationActions
          : previewActions}
      </Card>
    </View>
  );
};

export default Dialog;
