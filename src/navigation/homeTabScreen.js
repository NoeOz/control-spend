import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Graphics from "../screens/graphics";
import AddSpend from "../screens/addSpend";
//import Saving from "../screens/saving";
import ManageSpend from "../screens/manageSpend";
import TabBottom from "./TabBottom";
const HomeTab = createBottomTabNavigator();

export function HomeTabScreen() {
  return (
    <HomeTab.Navigator
      tabBar={(props) => <TabBottom {...props} />}
      screenOptions={tabStyles.notShow}
    >
      <HomeTab.Screen
        name="SpendChart"
        component={Graphics}
        options={{ title: "" }}
      />
      <HomeTab.Screen
        name="AddSpend"
        component={AddSpend}
        options={{ title: "" }}
      />
      {/* <HomeTab.Screen
        name="Saving"
        component={Saving}
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <ButtonnTab focused={focused} name={"fact-check"} />
          ),
        }}
      /> */}
      <HomeTab.Screen
        name="ManageSpend"
        component={ManageSpend}
        options={{ title: "" }}
      />
    </HomeTab.Navigator>
  );
}

const tabStyles = StyleSheet.create({
  notShow: {
    headerShown: false,
  },
});
