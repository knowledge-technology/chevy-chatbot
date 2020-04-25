import React from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Chat from "./screens/Chat";
import CustomTitleContent from "./components/CustomTitleContent";
import CustomDrawerContent from "./components/CustomDrawerContent";

import { themeDefault, themeDark } from "./styles/Themes";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Root(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerTitle: (props) => <CustomTitleContent {...props} />,
          headerLeft: () => (
            <Feather
              style={{ marginLeft: 10 }}
              name="menu"
              size={30}
              color="#7D3C98"
              onPress={() => props.navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <Feather
              style={{ marginLeft: 10 }}
              name="more-vertical"
              size={30}
              color="#7D3C98"
              onPress={() => props.navigation.openDrawer()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={themeDefault}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Chat"
          component={Root}
          options={{
            drawerIcon: () => (
              <Feather name="message-circle" size={25} color="#7D3C98" />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
