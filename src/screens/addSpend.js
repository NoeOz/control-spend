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
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

const initialFormAddValues = {
  name: "",
  description: "",
  mount: "",
  dateSpend: { DD: "", MM: "", YYYY: "" },
  typeSpend: "",
};

const AddSpend = () => {
  const [formAddSpend, setFormAddSpend] = useState(initialFormAddValues);

  useEffect(() => {
    return () => {
      setFormAddSpend(initialFormAddValues);
    };
  }, []);

  /**
   * The function changes the value of a specific key in an object and updates the state of a form.
   * @param key - The key is a string representing the name of a property in an object. In this case,
   * it is used to specify which property in the `formAddSpend` object should be updated with the new
   * `value`.
   * @param value - The value that will be assigned to the specified key in the formAddSpend object.
   */
  function changeSpendValues(key, value) {
    setFormAddSpend({ ...formAddSpend, [key]: value });
  }

  function validateValueForm(key) {
    if (formAddSpend[key] !== initialFormAddValues[key]) return true;
    else return false;
  }

  function validateForm() {
    const arrayKeysForm = Object.keys(formAddSpend);
    let validatedElements = new Array();
    arrayKeysForm.forEach((keyForm) => {
      validatedElements.push(validateValueForm(keyForm));
    });

    const validation = validatedElements.every((valid) => valid === true);
    return validation;
  }

  return (
    <View
      style={{
        ...globalStyles.principalContainer,
        backgroundColor: colors.backgroundS,
      }}
    >
      <View
        style={{
          ...globalStyles.rowSpaceBetw,
          alignContent: "center",
        }}
      >
        <Text style={customizeText(24, "M", "N", "left")}>Agrega un gasto</Text>
        {validateForm() && (
          <TouchableOpacity style={styles.buttonAdd}>
            <Feather name="plus" size={25} color={colors.grape} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginVertical: 15 }}>
        <TextInput
          placeholder="¿En qué gastaste?"
          style={globalStyles.input}
          onChangeText={(value) => changeSpendValues("name", value)}
        />
        <TextInput
          multiline
          placeholder="Descripción"
          style={globalStyles.input}
          onChangeText={(value) => changeSpendValues("description", value)}
        />
        <View style={globalStyles.rowSpaceBetw}>
          <TextInput
            placeholder="Monto"
            style={{ ...globalStyles.input, width: "45%" }}
            keyboardType="decimal-pad"
            onChangeText={(value) => changeSpendValues("mount", value)}
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
