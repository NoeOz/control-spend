import { Text, TouchableOpacity, View } from "react-native";
import { customizeText, globalStyles } from "../../styles/styles";

const SelectTypeSpend = () => {
  const typeSpend = [
    { text: "Fijo" },
    { text: "Suscripción" },
    { text: "Espontaneo" },
    { text: "Emergencia" },
    { text: "Ocio" },
    { text: "Entretenimiento" },
    { text: "Inversión" },
    { text: "Personales" },
  ];

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
          <TouchableOpacity key={item.text.split(0,3) + "A"} style={globalStyles.option}>
            <Text
              style={customizeText(16, "M", "N", "center")}
            >{`${item.text}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SelectTypeSpend;
