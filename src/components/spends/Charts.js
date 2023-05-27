import { Text, View } from "react-native";
import { colors, customizeText, globalStyles } from "../../styles/styles";
import GlobalChart from "./charts/GlobalChart";
import Animated, { FadeIn } from "react-native-reanimated";
//import PercentageChart from "./charts/PercentageChart";

const Charts = ({ dataSpends }) => {
  return (
    <View style={{ ...globalStyles.card, backgroundColor: colors.snow }}>
      <Animated.View entering={FadeIn.duration(1500)}>
        <GlobalChart dataSpends={dataSpends} />
      </Animated.View>
    </View>
  );
};

export default Charts;
