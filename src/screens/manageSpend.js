import { Text, View } from "react-native";
import { colors, customizeText, globalStyles } from "../styles/styles";
import {
  SelectedSpend,
  StateSelectedSpend,
} from "../components/manageSpends/selectSpend/SelectedSpend";
import useManageSpend from "../hooks/manageSpends/useManageSpend";
import Subs from "../components/manageSpends/options/Subs";
import OtherSpends from "../components/manageSpends/options/OtherSpends";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

const ManageSpend = () => {
  const manageSelectedSpend = StateSelectedSpend();
  const focusScreen = useIsFocused();
  // Spends states
  const [currentSubs, setCurrentSubs] = useState([]);
  const [thisMonthSpends, setThisMonthSpends] = useState([]);
  // trigger to recharge
  const [recharge, setRecharge] = useState(false);

  const { getThisMonthSubs, handleGetSpendsThisMonth } = useManageSpend();

  useEffect(() => {
    getValues();
    return () => {};
  }, [focusScreen, recharge]);

  function getValues() {
    const subs = getThisMonthSubs();
    const allMonth = handleGetSpendsThisMonth();
    setCurrentSubs(subs);
    setThisMonthSpends(allMonth);
  }

  function activateTrigger() {
    setRecharge(!recharge);
  }

  return (
    <View style={globalStyles.principalContainer}>
      <Text style={customizeText(24, "M", "N", "left")}>
        Administrar gastos
      </Text>
      <View
        style={{ ...globalStyles.line, backgroundColor: colors.backgroundS }}
      />
      <Subs
        currentSubs={currentSubs}
        setSelectedSpend={manageSelectedSpend.setSelectedSpend}
      />
      <OtherSpends
        thisMonthSpends={thisMonthSpends}
        setSelectedSpend={manageSelectedSpend.setSelectedSpend}
      />
      <SelectedSpend {...manageSelectedSpend} trigger={activateTrigger} />
    </View>
  );
};

export default ManageSpend;
