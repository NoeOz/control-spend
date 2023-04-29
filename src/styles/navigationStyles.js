import { DefaultTheme } from "@react-navigation/native";
import { colors } from "./styles";

export const nonDisplayTab = {
  tabBarStyle: { display: "none" },
};

export const theme = {
  ...DefaultTheme,
  colors: {
    //cualquier variable que quiera modificar lo hago desde aqui
    ...DefaultTheme.colors, //toma copia del objeto y lo asigna a theme
    primary: colors.snow,
  },
};

export const styleStack = {
  headerShown: false,
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  headerTintColor: theme.colors.surface,
  headerTitleAlign: "center",
};
