import { Text, TouchableOpacity, View } from "react-native";
import { colors, customizeText, globalStyles } from "../../styles/styles";
import { formatMK } from "../../helpers/quantityFormat";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import MatrixNumbers from "../ui/MatrixNumbers";

const SpendsMonth = ({ monthSpend }) => {
  const [modeViewSpend, setModeViewSpend] = useState(false);
  const [showSpend, setShowSpend] = useState(false);

  useEffect(() => {
    return () => {
      setModeViewSpend(false);
      setShowSpend(false);
    };
  }, []);

  function changeVisibleSpend() {
    setShowSpend(!showSpend);
  }

  function quantityMonthSpend() {
    if (!modeViewSpend) return formatMK(monthSpend);
    else return monthSpend;
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
        <Text style={customizeText(18, "M", "S")}>Total gastado</Text>
        {monthSpend > 999 ? (
          <TouchableOpacity
            onPress={() => setModeViewSpend(!modeViewSpend)}
            style={{ paddingHorizontal: "2.5%" }}
          >
            <AntDesign name="swap" size={25} color={colors.snow} />
          </TouchableOpacity>
        ) : null}
      </View>
      {!showSpend ? (
        <View style={{ flexDirection: "row" }}>
          <Text style={customizeText(44, "M", "S")}>$</Text>
          <MatrixNumbers
            triggerEnd={() => changeVisibleSpend()}
            styleText={customizeText(44, "M", "S")}
            maxNumber={10000}
          />
        </View>
      ) : (
        <Text style={customizeText(44, "M", "S")} numberOfLines={1}>
          {`$${quantityMonthSpend()}`}
        </Text>
      )}
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
      <Text style={customizeText(22, "M", "S")}>Vaya!</Text>
      <Text style={customizeText(18, "I", "S")}>
        No hay registros de gastos en este mes
      </Text>
    </View>
  );

  return monthSpend > 0 ? <ThisMonthSpends /> : <NotSpends />;
};

export default SpendsMonth;
