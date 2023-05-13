import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, customizeText, globalStyles } from "../styles/styles";
import SelectTypeSpend from "../components/formAdd/SelectTypeSpend";
import SelectFromCalendar from "../components/formAdd/SelectFromCalendar";
import { Feather } from "@expo/vector-icons";
import useAddSpend from "../hooks/createSpend/useAddSpend";
import { CustomAlert, useStateAlert } from "../components/modals/CustomAlert";
import TipsInput from "../components/formAdd/TipsInput";

const AddSpend = () => {
  const {
    createSpend,
    initialFormAddValues,
    formAddSpend,
    setFormAddSpend,
    changeSpendValues,
    validateForm,
  } = useAddSpend();
  const manageAlert = useStateAlert();

  async function handleCreateSpend() {
    let dataSpend = formAddSpend;
    dataSpend.dateSpend = `${formAddSpend?.dateSpend?.DD}/${formAddSpend?.dateSpend?.MM}/${formAddSpend?.dateSpend?.YYYY}`;
    const response = await createSpend(
      dataSpend.name,
      dataSpend.description,
      dataSpend.mount,
      dataSpend.dateSpend,
      dataSpend.typeSpend
    );
    if (response) {
      manageAlert.setTitleAlert("Información guardada");
      manageAlert.setMessageAlert(
        "La información se ha guardado correctamente"
      );
      manageAlert.setVisibleAlert(true);
      setTimeout(() => {
        manageAlert.clearStates();
      }, 2000);
      setFormAddSpend(initialFormAddValues);
    }
  }

  return (
    <View
      style={{
        ...globalStyles.principalContainer,
        backgroundColor: colors.backgroundS,
      }}
    >
      <CustomAlert
        {...manageAlert}
        changeVisibility={(value) => manageAlert.setVisibleAlert(value)}
      />
      <View
        style={{
          ...globalStyles.rowSpaceBetw,
          alignContent: "center",
        }}
      >
        <Text style={customizeText(24, "M", "N", "left")}>Agrega un gasto</Text>
        {validateForm() && (
          <TouchableOpacity
            onPress={() => handleCreateSpend()}
            style={styles.buttonAdd}
          >
            <Feather name="plus" size={25} color={colors.grape} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginVertical: 15 }}>
        <TextInput
          placeholder="¿En qué gastaste?"
          style={globalStyles.input}
          onChangeText={(value) => changeSpendValues("name", value)}
          value={formAddSpend.name}
        />
        <TipsInput typeInput={"name"} value={formAddSpend.name} />
        <TextInput
          multiline
          placeholder="Descripción"
          style={globalStyles.input}
          onChangeText={(value) => changeSpendValues("description", value)}
          value={formAddSpend.description}
        />
        <TipsInput typeInput={"description"} value={formAddSpend.description} />
        <View style={globalStyles.rowSpaceBetw}>
          <TextInput
            placeholder="Monto"
            style={{ ...globalStyles.input, width: "45%" }}
            keyboardType="decimal-pad"
            onChangeText={(value) => changeSpendValues("mount", value.trim())}
            value={formAddSpend.mount}
          />
          <SelectFromCalendar
            dateValue={formAddSpend.dateSpend}
            onSelectDate={changeSpendValues}
          />
        </View>
        <SelectTypeSpend
          selectedType={formAddSpend.typeSpend}
          onSelectType={changeSpendValues}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonAdd: {
    padding: "2%",
    width: "12%",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: colors.lavander,
  },
});

export default AddSpend;
