import { Text, View } from "react-native";
import { colors, customizeText, globalStyles } from "../../styles/styles";

const SpendsMonth = ({ monthSpend }) => {
  function formatNumbers(num) {
    if (isNaN(num)) {
      return "--.--";
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K";
    }
    return num.toString();
  }

  const ThisMonthSpends = () => (
    <View
      style={{
        ...globalStyles.card,
        backgroundColor: colors.black_2,
        width: "100%",
      }}
    >
      <Text style={customizeText(18, "M", "S")}>Gastos de este mes</Text>
      <Text style={customizeText(44, "M", "S")} numberOfLines={1}>
        ${formatNumbers(monthSpend)}
      </Text>
    </View>
  );

  const NotSpends = () => (
    <View
      style={{
        ...globalStyles.card,
        backgroundColor: colors.black_2,
        width: "100%",
      }}
    >
      <Text style={customizeText(18, "M", "S")}>Vaya!</Text>
      <Text style={customizeText(20, "I", "S")}>
        No hay registros de gastos en este mes
      </Text>
    </View>
  );

  return monthSpend > 0 ? <ThisMonthSpends /> : <NotSpends />;
};

export default SpendsMonth;
