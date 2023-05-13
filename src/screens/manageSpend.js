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
import { useEffect } from "react";

const ManageSpend = () => {
  const manageSelectedSpend = StateSelectedSpend();
  const focusScreen = useIsFocused();
  const { currentSubs, thisMonthSpends } = useManageSpend({ focusScreen });

  useEffect(() => {
    return () => {};
  }, [focusScreen]);

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
      <SelectedSpend {...manageSelectedSpend} />
    </View>
  );
};

export default ManageSpend;
