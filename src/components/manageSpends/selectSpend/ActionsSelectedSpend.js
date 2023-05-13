import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, customizeText, globalStyles } from "../../../styles/styles";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const ActionsSelectedSpend = ({ dropAction, editAction }) => {
  const [beforeDrop, setBeforeDrop] = useState(false);

  return !beforeDrop ? (
    <View
      style={{
        ...globalStyles.rowSpaceBetw,
        alignSelf: "flex-end",
        marginTop: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => setBeforeDrop(true)}
        style={styles.option}
      >
        <Feather name="trash" color={colors.snow} size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => editAction()}
        style={{ ...styles.option, marginHorizontal: 0 }}
      >
        <Feather name="edit-2" color={colors.snow} size={20} />
      </TouchableOpacity>
    </View>
  ) : (
    <View style={{ marginTop: 15 }}>
      <Text style={customizeText(18, "I", "G", "center")}>
        ¿Estas seguro de eliminar este elemento?
      </Text>
      <View
        style={{
          ...globalStyles.rowSpaceBetw,
          width: "40%",
          alignSelf: "center",
          marginVertical: 15
        }}
      >
        <TouchableOpacity onPress={() => setBeforeDrop(false)}>
          <Text style={customizeText(18, "M", "N")}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dropAction()}>
          <Text style={customizeText(18, "M", "N")}>Si</Text>
        </TouchableOpacity>
      </View>
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
