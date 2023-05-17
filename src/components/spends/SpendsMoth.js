import { Text, TouchableOpacity, View } from "react-native";
import { colors, customizeText, globalStyles } from "../../styles/styles";
import { formatMK } from "../../helpers/quantityFormat";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const SpendsMonth = ({ monthSpend }) => {
  const [modeViewSpend, setModeViewSpend] = useState(false);

  function viewMonthSpend() {
    if (!modeViewSpend) return formatMK(monthSpend);
    else return `${monthSpend}`;
  }

  const ThisMonthSpends = () => (
    <View
      style={{
        ...globalStyles.card,
        backgroundColor: colors.black_2,
        width: "100%",
      }}
    >
      <View style={globalStyles.rowSpaceBetw}>
        <Text style={customizeText(18, "M", "S")}>Gastos de este mes</Text>
        <TouchableOpacity
          onPress={() => setModeViewSpend(!modeViewSpend)}
          style={{ paddingHorizontal: "2.5%" }}
        >
          <Feather name="more-horizontal" size={25} color={colors.snow} />
        </TouchableOpacity>
      </View>
      <Text style={customizeText(44, "M", "S")} numberOfLines={1}>
        ${`${viewMonthSpend()}`}
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
