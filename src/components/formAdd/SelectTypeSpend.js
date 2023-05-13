import { Text, TouchableOpacity, View } from "react-native";
import { customizeText, globalStyles } from "../../styles/styles";

const SelectTypeSpend = ({ selectedType, onSelectType }) => {
  const typeSpend = [
    "Espontáneo",
    "Entretenimiento",
    "Inversión",
    "Personales",
    "Suscripción",
    "Otro",
    "Fijo",
  ];

  function itemSelected(item) {
    if (item === selectedType) return globalStyles.optionSelected;
    else return globalStyles.option;
  }

  function selectType(spend) {
    onSelectType("typeSpend", spend);
  }

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
        {typeSpend.map((item) => (
          <TouchableOpacity
            key={item.split(0, 3) + "A"}
            style={itemSelected(item)}
            onPress={() => selectType(item)}
          >
            <Text
              style={customizeText(16, "M", "N", "center")}
            >{`${item}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SelectTypeSpend;
