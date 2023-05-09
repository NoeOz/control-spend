import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors, globalStyles } from "../../styles/styles";
import { Feather } from "@expo/vector-icons";

const ActionsSelectedSpend = () => {
  return (
    <View style={{ ...globalStyles.rowSpaceBetw, alignSelf: "flex-end" }}>
      <TouchableOpacity style={styles.option}>
        <Feather name="trash" color={colors.snow} size={20} />
      </TouchableOpacity>
      <TouchableOpacity style={{ ...styles.option, marginHorizontal: 0 }}>
        <Feather name="edit-2" color={colors.snow} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    padding: "1%",
    height: 35,
    width: 35,
    borderRadius: 25,
    backgroundColor: colors.gray_1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
});

export default ActionsSelectedSpend;
