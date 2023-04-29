import { View } from "react-native";
import { colors, globalStyles } from "../styles/styles";
import MoreOn from "../components/spends/MoreOn";
import Charts from "../components/spends/charts";
import SpendsMonth from "../components/spends/SpendsMoth";

const Graphics = () => {
  return (
    <View
      style={{
        ...globalStyles.principalContainer,
        backgroundColor: colors.backgroundS,
      }}
    >
      <SpendsMonth />
      <MoreOn />
      <Charts />
    </View>
  );
};

export default Graphics;
