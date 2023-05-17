import { View } from "react-native";
import { colors, globalStyles } from "../styles/styles";
import MoreOn from "../components/spends/MoreOn";
import SpendsMonth from "../components/spends/SpendsMoth";
import Charts from "../components/spends/Charts";
import useGraphics from "../hooks/graphics/useGraphics";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import {
  SelectedSpend,
  StateSelectedSpend,
} from "../components/manageSpends/selectSpend/SelectedSpend";

const Graphics = () => {
  const manageSelectedSpend = StateSelectedSpend();
  const focusScreen = useIsFocused();
  const { monthSpend, concurrentSpend, spendsByTag } = useGraphics({ focusScreen });

  useEffect(() => {
    return () => {};
  }, [focusScreen]);

  return (
    <View
      style={{
        ...globalStyles.principalContainer,
        backgroundColor: colors.backgroundS,
      }}
    >
      <SpendsMonth monthSpend={monthSpend} />
      <MoreOn
        concurrentSpend={concurrentSpend}
        setSelectedSpend={manageSelectedSpend.setSelectedSpend}
      />
      <Charts dataSpends={spendsByTag} />
      <SelectedSpend {...manageSelectedSpend} actions={false} />
    </View>
  );
};

export default Graphics;
