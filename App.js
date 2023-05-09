import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { HomeTabScreen } from "./src/navigation/homeTabScreen";
import { nonDisplayTab, styleStack } from "./src/styles/navigationStyles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/home";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const Stack = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    "Roboto-Italic": require("./src/assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./src/assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <React.Fragment>
      <View onLayout={onLayoutRootView} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={styleStack}
        >
          <Stack.Screen name="Home" component={Home} options={nonDisplayTab} />
          <Stack.Screen
            name="HomeTabScreen"
            component={HomeTabScreen}
            options={nonDisplayTab}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
}
