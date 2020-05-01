import { DefaultTheme, DarkTheme } from "@react-navigation/native";

const themeDefault = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#7D3C98",
    text: "#212121",
    textSecondary: "#313131",
    secondary: "#FFF",
  },
};
const themeDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#BB8FCE",
    text: "#F1F1F1",
    textSecondary: "#818181",
    secondary: "#212121",
  },
};

export { themeDefault, themeDark };
