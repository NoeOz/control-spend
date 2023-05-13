import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/styles";
import Graphics from "../screens/graphics";
import AddSpend from "../screens/addSpend";
import Saving from "../screens/saving";
import ManageSpend from "../screens/manageSpend";
const HomeTab = createBottomTabNavigator();

export function ButtonnTab({ focused, name }) {
  return (
    <View style={tabStyles.rowBtn}>
      <MaterialIcons
        name={name}
        size={focused ? 30 : 25}
        color={focused ? colors.lavander : colors.black}
      />
    </View>
  );
}

export function HomeTabScreen() {
  return (
    <HomeTab.Navigator screenOptions={tabStyles.notShow}>
      <HomeTab.Screen
        name="SpendChart"
        component={Graphics}
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <ButtonnTab focused={focused} name={"pie-chart"} />
          ),
        }}
      />
      <HomeTab.Screen
        name="AddSpend"
        component={AddSpend}
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <ButtonnTab focused={focused} name={"add-circle"} />
          ),
        }}
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
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <ButtonnTab focused={focused} name={"list-alt"} />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
}

const tabStyles = StyleSheet.create({
  rowBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    
  },
  notShow: {
    headerShown: false,
  },
});
