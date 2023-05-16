import { useState } from "react";
import { Modal, Pressable, View } from "react-native";

export const StateTraslucentModal = () => {
  const [visible, setVisible] = useState(false);

  return { visible, setVisible };
};

export const TraslucentModal = (props) => {
  const { children, visible, setVisible, managerClose, altStyle } = props;

  function manageClose() {
    managerClose();
    setVisible(!visible);
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => manageClose()}
    >
      <Pressable
        onPress={() => manageClose()}
        style={{
          ...altStyle,
          flex: 1,
          padding: "2.5%",
          backgroundColor: "rgba(20,20,20,.9)",
        }}
      />
      <View
        style={{
          ...altStyle,
          flex: 1,
          padding: "2.5%",
          backgroundColor: "rgba(20,20,20,.9)",
        }}
      >
        {children}
      </View>
      <Pressable
        onPress={() => manageClose()}
        style={{
          ...altStyle,
          flex: 1,
          padding: "2.5%",
          backgroundColor: "rgba(20,20,20,.9)",
        }}
      />
    </Modal>
  );
};
