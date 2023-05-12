import { useState } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";

import { colors, customizeText, deviceInfo } from "../../styles/styles";
import { Feather } from "@expo/vector-icons";

export const useStateAlert = () => {
  const [titleAlert, setTitleAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [visibleAlert, setVisibleAlert] = useState(false);

  function clearStates() {
    setTitleAlert("");
    setMessageAlert("");
    setVisibleAlert(false);
  }

  return {
    titleAlert,
    setTitleAlert,
    messageAlert,
    setMessageAlert,
    visibleAlert,
    setVisibleAlert,
    clearStates,
  };
};

export const CustomAlert = (props) => {
  const {
    titleAlert,
    messageAlert,
    visibleAlert,
    changeVisibility,
    notClose = false,
  } = props;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visibleAlert}
      onRequestClose={() => {
        changeVisibility(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {!notClose && (
            <TouchableOpacity
              style={styles.btnClose}
              onPress={() => changeVisibility(false)}
            >
              <Feather name={"x"} size={30} color={colors.noir} />
            </TouchableOpacity>
          )}
          <Text style={[customizeText(20, "M", "G"), styles.modalTextAlign]}>
            {`${titleAlert}`}
          </Text>
          <Text style={[customizeText(20, "M", "N"), styles.modalTextAlign]}>
            {`${messageAlert}`}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(0,0,0,0.2)",
    position: "absolute",
    height: deviceInfo.height,
    width: deviceInfo.width,
    justifyContent: "center",
  },
  modalView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  modalTextAlign: {
    textAlign: "center",
    paddingBottom: 10,
    marginBottom: 20,
  },
  btnClose: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
