import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";

import { List, Switch } from "react-native-paper";

const Settings = (props) => {
  const { colors } = useTheme();
  const [isSwitchOn, setIsSwitchOn] = useState({ dark: false });
  useEffect(() => {
    const getTheme = async () => {
      const themeData = await AsyncStorage.getItem("Dark");
      if (themeData === null) {
        const { dark } = { dark: false };
        setIsSwitchOn(JSON.parse(dark));
      } else {
        const { dark } = JSON.parse(themeData);

        setIsSwitchOn(JSON.parse(themeData));
      }
    };

    getTheme();
  }, []);

  const onToggleSwitch = () => {
    AsyncStorage.setItem("Dark", JSON.stringify({ dark: !isSwitchOn.dark }));
    setIsSwitchOn({ dark: !isSwitchOn.dark });
  };

  return (
    <List.Section>
      <List.Item
        titleStyle={{ color: colors.text, fontWeight: "bold" }}
        descriptionStyle={{ color: colors.textSecondary }}
        title="Dark mode"
        description="You will need to restart the application to see this effect"
        right={(props) => (
          <Switch value={isSwitchOn.dark} onValueChange={onToggleSwitch} />
        )}
      />
    </List.Section>
  );
};

export default Settings;
