import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { Feather } from "@expo/vector-icons";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CustomTitleContent from "./components/CustomTitleContent";
import CustomDrawerContent from "./components/CustomDrawerContent";

import Login from "./screens/Login";
import Chat from "./screens/Chat";
import About from "./screens/About";
import Settings from "./screens/Settings";
import ManageDialogues from "./screens/ManageDialogues";
import {
  SuggestDialogues,
  EvaluateDialogues,
  MyDialogues,
} from "./screens/ManageDialogues/Options";

import { themeDefault, themeDark } from "./styles/Themes";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerMenuIcon = (props) => {
  return (
    <Feather
      style={{ marginLeft: 10 }}
      name="menu"
      size={30}
      color="#7D3C98"
      onPress={() => props.navigation.openDrawer()}
    />
  );
};

const ChatRoot = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerTitle: (props) => <CustomTitleContent {...props} />,
          headerLeft: () => <DrawerMenuIcon {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};

const ManageDialoguesRoot = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Manage Dialogues"
        component={ManageDialogues}
        options={{
          headerLeft: () => <DrawerMenuIcon {...props} />,
        }}
      />
      <Stack.Screen name="Suggest Dialogues" component={SuggestDialogues} />
      <Stack.Screen name="Evaluate Dialogues" component={EvaluateDialogues} />
      <Stack.Screen name="My Dialogues" component={MyDialogues} />
    </Stack.Navigator>
  );
};

const AboutRoot = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerLeft: () => <DrawerMenuIcon {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};
const SettingsRoot = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerLeft: () => <DrawerMenuIcon {...props} />,
        }}
      />
    </Stack.Navigator>
  );
};
export default App = () => {
  const [theme, setTheme] = useState();

  useEffect(() => {
    const getTheme = async () => {
      const themeData = await AsyncStorage.getItem("Dark");
      const { dark } = JSON.parse(themeData);
      console.log(themeDefault);
      setTheme(dark);
    };

    getTheme();
  }, []);
  return (
    <NavigationContainer theme={theme ? themeDark : themeDefault}>
      <Drawer.Navigator
        initialRouteName="Chat"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Chat"
          component={ChatRoot}
          options={{
            drawerIcon: ({ color, size }) => (
              <Feather name="message-circle" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Manage Dialogues"
          component={ManageDialoguesRoot}
          options={{
            drawerIcon: ({ color, size }) => (
              <Feather name="edit" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsRoot}
          options={{
            drawerIcon: ({ color, size }) => (
              <Feather name="settings" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutRoot}
          options={{
            drawerIcon: ({ color, size }) => (
              <Feather name="info" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
