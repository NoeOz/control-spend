import { Text, TouchableOpacity, View } from "react-native";
import { customizeText } from "../../styles/styles";

const Charts = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <Text style={customizeText(18, "M", "N")}>Estadísticas</Text>
        <TouchableOpacity>
          <Text style={customizeText(18, "M", "G")}>Ver todo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Charts;
