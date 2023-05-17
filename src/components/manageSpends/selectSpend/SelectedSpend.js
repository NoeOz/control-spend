import { useEffect, useState } from "react";
import { colors, globalStyles, customizeText } from "../../../styles/styles";
import {
  TraslucentModal,
  StateTraslucentModal,
} from "../../modals/TraslucentModal";
import { View, Text, TextInput, StyleSheet } from "react-native";
import TagTypeSpend from "../TagTypeSpend";
import ActionsSelectedSpend from "./ActionsSelectedSpend";
import useSelectedSpend from "../../../hooks/manageSpends/useSelectedSpend";
import { formatComa } from "../../../helpers/quantityFormat";

export const StateSelectedSpend = () => {
  //watch one spend
  const [selectedSpend, setSelectedSpend] = useState(null);
  return { selectedSpend, setSelectedSpend };
};

export const SelectedSpend = (props) => {
  const { selectedSpend, setSelectedSpend, actions = true, trigger } = props;
  const [updatedSpend, setUpdatedSpend] = useState({});
  //? modal state
  const manageTraslucentModal = StateTraslucentModal();
  //? actions in spend element
  const { dropSpend, editSpend, validateSpend } = useSelectedSpend();
  //? message when is updated or deleted
  const [message, setMessage] = useState("");
  //? activate inputs to edit
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    manageSelectedSpend();
    return () => {};
  }, [selectedSpend]);

  function manageSelectedSpend() {
    if (!!selectedSpend) manageTraslucentModal.setVisible(true);
  }

  function closeViewSelectedSpend() {
    setUpdatedSpend({});
    setEnableEdit(false);
    setMessage("");
    setSelectedSpend(null);
  }

  async function handleDropSpend() {
    const res = await dropSpend(selectedSpend.id);
    if (res) {
      setMessage("Listo, se ha eliminado este elemento");
      trigger();
      setTimeout(() => {
        closeViewSelectedSpend();
        manageTraslucentModal.setVisible(false);
      }, 2000);
    }
  }

  async function handleEditSpend() {
    if (!enableEdit) {
      setUpdatedSpend(selectedSpend);
      setEnableEdit(true);
    } else {
      const validName = validateSpend("str", updatedSpend.name);
      const validDesc = validateSpend("str", updatedSpend.description);
      const validAmount = validateSpend("num", updatedSpend.mount);
      if (validName && validDesc && validAmount) {
        const res = await editSpend(updatedSpend);
        if (res) {
          setMessage("Listo, cambios realizados");
          trigger();
          setTimeout(() => {
            closeViewSelectedSpend();
            manageTraslucentModal.setVisible(false);
          }, 2000);
        }
      }
    }
  }

  function handleEditSpendValues(key, value) {
    setUpdatedSpend({ ...updatedSpend, [key]: value });
  }

  /**
   * The function returns the formatted amount of a selected spend or the original amount if editing is
   * enabled.
   * @returns The function `mountSpend()` returns either the formatted amount with commas (if
   * `enableEdit` is false) or the unformatted amount (if `enableEdit` is true) of the `selectedSpend`
   * object's `mount` property.
   */
  function mountSpend() {
    const formatAmount = formatComa(
      updatedSpend?.mount ?? selectedSpend?.mount
    );
    if (enableEdit) return updatedSpend?.mount ?? selectedSpend?.mount;
    else return `$${formatAmount}`;
  }

  return (
    <TraslucentModal
      visible={manageTraslucentModal.visible}
      setVisible={manageTraslucentModal.setVisible}
      managerClose={closeViewSelectedSpend}
    >
      <View
        style={{
          ...globalStyles.card,
          backgroundColor: colors.snow,
          margin: "2.5%",
        }}
      >
        {!!message ? (
          <Text style={customizeText(18, "M", "N", "left", { padding: "5%" })}>
            {message}
          </Text>
        ) : (
          <View>
            <View
              style={{
                ...globalStyles.rowSpaceBetw,
                marginVertical: 15,
                alignItems: "center",
                zIndex: 100,
              }}
            >
              <Text style={customizeText(18, "I", "N")}>
                {`${selectedSpend?.dateSpend}`}
              </Text>
              <TagTypeSpend typeSpend={selectedSpend?.typeSpend} />
            </View>
            <View style={globalStyles.rowSpaceBetw}>
              <TextInput
                editable={enableEdit}
                style={
                  enableEdit
                    ? styles.inputEditable
                    : customizeText(18, "L", "N", "left")
                }
                onChangeText={(val) => handleEditSpendValues("name", val)}
                value={updatedSpend?.name ?? selectedSpend?.name}
              />
              <TextInput
                editable={enableEdit}
                keyboardType={"numeric"}
                style={
                  enableEdit
                    ? styles.inputEditable
                    : customizeText(22, "M", "N")
                }
                onChangeText={(val) => handleEditSpendValues("mount", val)}
                value={`${mountSpend()}`}
              />
            </View>
            <TextInput
              editable={enableEdit}
              style={
                enableEdit ? styles.inputEditable : customizeText(18, "M", "N")
              }
              onChangeText={(val) => handleEditSpendValues("description", val)}
              value={updatedSpend?.description ?? selectedSpend?.description}
            />
            {actions && (
              <ActionsSelectedSpend
                editSpendEnabled={enableEdit}
                dropAction={handleDropSpend}
                editAction={handleEditSpend}
              />
            )}
          </View>
        )}
      </View>
    </TraslucentModal>
  );
};

const styles = StyleSheet.create({
  inputEditable: {
    ...globalStyles.input,
    paddingHorizontal: "2.5%",
    paddingVertical: "3.5%",
    backgroundColor: colors.gray_3,
    ...customizeText(18, "M", "N"),
  },
});
