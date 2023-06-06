import { View } from "react-native";
import GlobalChart from "./charts/GlobalChart";
import Animated, { FadeIn } from "react-native-reanimated";
//import PercentageChart from "./charts/PercentageChart";

const Charts = ({ dataSpends = [0, 0, 0, 0, 0, 0, 0] }) => {
  return (
    <Animated.View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      entering={FadeIn.duration(1500)}
    >
      <GlobalChart dataSpends={dataSpends} />
      <View style={{ flex: 1 }} />
    </Animated.View>
  );
};

export default Charts;
