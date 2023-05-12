import { Text, View } from "react-native";
import { colors, customizeText, globalStyles } from "../../styles/styles";
import { useEffect, useState } from "react";
import useGraphics from "../../hooks/graphics/useGraphics";

const SpendsMonth = () => {
  const [monthSpend, setMonthSpend] = useState(0);
  const { getThisMonthSpends } = useGraphics();

  useEffect(() => {
    handleGetSpend();
    return () => {};
  }, []);

  function handleGetSpend() {
    const resMonthSp = getThisMonthSpends();
    setMonthSpend(resMonthSp.toFixed(2));
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
      <Text style={customizeText(44, "M", "S")}>${monthSpend}</Text>
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
