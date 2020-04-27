import React from "react";
import { Feather } from "@expo/vector-icons";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CustomTitleContent from "./components/CustomTitleContent";
import CustomDrawerContent from "./components/CustomDrawerContent";

import Chat from "./screens/Chat";
import ManageDialogues from "./screens/ManageDialogues";

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
    </Stack.Navigator>
  );
};

export default App = () => {
  return (
    <NavigationContainer theme={themeDefault}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Chat"
          component={ChatRoot}
          options={{
            drawerIcon: () => (
              <Feather name="message-circle" size={25} color="#7D3C98" />
            ),
          }}
        />
        <Drawer.Screen
          name="Manage Dialogues"
          component={ManageDialoguesRoot}
          options={{
            drawerIcon: () => <Feather name="edit" size={25} color="#7D3C98" />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
