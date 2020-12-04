import React, { useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { View, TextInput, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Card, Button, Caption } from "react-native-paper";

import api from "../../services/api";

import styles from "./styles";

const Dialog = (props) => {
  const { colors } = useTheme();
  const {
    dialogId,
    isEvaluation,
    editable,
    speech,
    answer,
    createdAt = Date.now(),
    status,
    approvalRate,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [approvalMode, setApprovalMode] = useState("outlined");
  const [disapproveMode, setDisapproveMode] = useState("outlined");
  const [hasEvaluate, setHasEvaluate] = useState(false);

  useEffect(() => {
    setInput(speech);
    setOutput(answer);
  }, []);
  const handleApprove = async () => {
    try {
      await api.put(`/v1/dialog/${dialogId}/approval`);
      Alert.alert("Successful approval");
      setHasEvaluate(true);
      setApprovalMode("contained");
    } catch (err) {
      Alert.alert("Error", "Please try again later");
    }
  };
  const handleDesapprove = async () => {
    try {
      await api.put(`/v1/dialog/${dialogId}/reject`);
      Alert.alert("Successful Disapprove");
      setHasEvaluate(true);
      setDisapproveMode("contained");
    } catch (err) {
      Alert.alert("Error", "Please try again later");
    }
  };
  const handleCreate = async () => {
    setIsLoading(true);

    if (!input || !output) {
      Alert.alert("Error", "Fill in all fields to continue");
      setIsLoading(false);
    } else {
      await api
        .post("/v1/dialog", { speech: input, answer: output })
        .catch((e) => {
          Alert("Error", e);
        });

      setIsLoading(false);
      setInput("");
      setOutput("");
      Alert.alert("Suggestion sent", "Successful registration");
    }
  };

  const createActions = (
    <Card.Actions
      style={[styles.cardActions, { backgroundColor: colors.secondary }]}
    >
      <Button
        color="#7D3C98"
        loading={isLoading}
        style={styles.actionsButton}
        mode="outlined"
        icon={({ size, color }) => (
          <Feather name="plus-circle" size={size} color={color} />
        )}
        onPress={handleCreate}
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
        disabled={hasEvaluate}
        mode={approvalMode}
        icon={({ size, color }) => (
          <Feather name="thumbs-up" size={size} color={color} />
        )}
        onPress={handleApprove}
      >
        Approve
      </Button>

      <Button
        color="#7D3C98"
        disabled={hasEvaluate}
        style={styles.actionsButton}
        mode={disapproveMode}
        icon={({ size, color }) => (
          <Feather name="thumbs-down" size={size} color={color} />
        )}
        onPress={handleDesapprove}
      >
        Disapprove
      </Button>
    </Card.Actions>
  );

  const previewActions = (
    <Card.Actions style={styles.cardActions}>
      <Caption style={{ color: colors.textSecondary }}>
        Created at:
        {Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "numeric",
        }).format(new Date(createdAt))}
      </Caption>
      <Caption style={{ color: colors.textSecondary }}>
        Status: {status}
      </Caption>
      <Caption style={{ color: colors.textSecondary }}>
        Approval Rate: {approvalRate}%
      </Caption>
    </Card.Actions>
  );

  return (
    <View style={styles.container}>
      <Card style={{ backgroundColor: colors.secondary }}>
        <Card.Title
          titleStyle={{ color: colors.text }}
          subtitleStyle={{ color: colors.textSecondary }}
          title="Chevy Chatbot"
          subtitle="Dialog"
        />
        <Card.Content>
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            multiline
            placeholder="When someone speaks ..."
            placeholderTextColor="#f1f1f1"
            editable={editable}
            style={styles.input}
          />
          <TextInput
            value={output}
            onChangeText={(text) => setOutput(text)}
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
