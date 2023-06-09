import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors, deviceInfo } from "../styles/styles";
import { MaterialIcons } from "@expo/vector-icons";

const ButtonTab = ({ focused, name }) => {
  const iconByNameScreen = (nameScreen) => {
    const equivalentIcon = {
      SpendChart: "pie-chart",
      AddSpend: "add-circle",
      Saving: "fact-check",
      ManageSpend: "list-alt",
    };
    return equivalentIcon[nameScreen];
  };

  return (
    <View style={styles.btn}>
      <MaterialIcons
        name={iconByNameScreen(name)}
        size={focused ? 30 : 25}
        color={focused ? colors.lavander : colors.black}
      />
    </View>
  );
};

const TabBottom = ({ state, descriptors, navigation }) => (
  <View style={styles.containerTab}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];

      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: "tabPress",
          target: route.key,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: "tabLongPress",
          target: route.key,
        });
      };

      return (
        <TouchableOpacity
          key={route.name}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
          style={{ flex: 1 }}
        >
          <ButtonTab focused={isFocused} name={route.name} />
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerTab: {
    width: deviceInfo.width,
    height: 70,
    paddingVertical: 15,
    backgroundColor: colors.snow,
    flexDirection: "row",
  },
});

export default TabBottom;
