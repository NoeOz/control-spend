import { Text, TouchableOpacity, View } from "react-native";
import { customizeText, globalStyles } from "../../styles/styles";

const SelectTypeSpend = () => {
  return (
    <View style={globalStyles.input}>
      <Text style={customizeText(16, "M", "TG", "left")}>
        ¿Qué tipo de gasto es?
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <TouchableOpacity style={globalStyles.option}>
          <Text style={customizeText(16, "M", "N", "center")}>Fijo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.option}>
          <Text style={customizeText(16, "M", "N", "center")}>Suscripción</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.option}>
          <Text style={customizeText(16, "M", "N", "center")}>Espontaneo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.option}>
          <Text style={customizeText(16, "M", "N", "center")}>Emergencia</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.option}>
          <Text style={customizeText(16, "M", "N", "center")}>Ocio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.option}>
          <Text style={customizeText(16, "M", "N", "center")}>
            Entretenimiento
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.option}>
          <Text style={customizeText(16, "M", "N", "center")}>Inversión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.option}>
          <Text style={customizeText(16, "M", "N", "center")}>Personales</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectTypeSpend;
