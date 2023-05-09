import { Text, View } from "react-native";
import { colors, customizeText, globalStyles } from "../../styles/styles";

const SpendsMonth = () => {
  return (
    <View
      style={{
        ...globalStyles.card,
        backgroundColor: colors.black_2,
        width: "100%",
      }}
    >
      <Text style={customizeText(18, "M", "S")}>Gastos de este mes</Text>
      <Text style={customizeText(44, "M", "S")}>$00.00</Text>
    </View>
  );
};

export default SpendsMonth;
