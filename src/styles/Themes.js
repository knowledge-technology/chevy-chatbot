import { DefaultTheme, DarkTheme } from "@react-navigation/native";

const themeDefault = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#7D3C98",
  },
};
const themeDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#BB8FCE",
    text: "#F1F1F1",
  },
};

export { themeDefault, themeDark };
