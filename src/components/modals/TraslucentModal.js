import { useState } from "react";
import { Modal, Pressable } from "react-native";

export const StateTraslucentModal = () => {
  const [visible, setVisible] = useState(false);

  return { visible, setVisible };
};

export const TraslucentModal = (props) => {
  const { children, visible, setVisible, altStyle } = props;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={() => setVisible(!visible)}
    >
      <Pressable
        onPress={() => setVisible(!visible)}
        style={{
          ...altStyle,
          flex: 1,
          padding: "2.5%",
          backgroundColor: "rgba(20,20,20,.9)",
        }}
      >
        {children}
      </Pressable>
    </Modal>
  );
};
