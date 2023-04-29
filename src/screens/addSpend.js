import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, customizeText, globalStyles } from "../styles/styles";
import SelectTypeSpend from "../components/formAdd/SelectTypeSpend";

const AddSpend = () => {
  return (
    <View
      style={{
        ...globalStyles.principalContainer,
        backgroundColor: colors.backgroundS,
      }}
    >
      <Text style={customizeText(24, "M", "N", "center")}>Agrega un gasto</Text>
      <View style={{ marginVertical: 15 }}>
        <TextInput placeholder="¿En qué gastaste?" style={globalStyles.input} />
        <TextInput
          multiline
          placeholder="Descripción (opcional)"
          style={globalStyles.input}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            placeholder="Monto"
            style={{ ...globalStyles.input, width: "45%" }}
            keyboardType="decimal-pad"
          />
          <TouchableOpacity style={{ ...globalStyles.input, width: "45%" }}>
            <Text style={customizeText(16, "M", "TG", "left")}>
              ¿Cúando pasó?
            </Text>
          </TouchableOpacity>
        </View>
        <SelectTypeSpend />
      </View>
    </View>
  );
};

export default AddSpend;
