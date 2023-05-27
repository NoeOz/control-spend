import { colors, deviceInfo } from "../../../styles/styles";

import { tagsTypesSpends } from "../../../constants/TagsTypeSpends";
import { LineChart } from "react-native-chart-kit";

const GlobalChart = ({ dataSpends }) => {
  return (
    <LineChart
      data={{
        labels: tagsTypesSpends.map((objeto) => objeto.text.slice(0, 4)),
        datasets: [
          {
            data: dataSpends,
          },
        ],
      }}
      width={deviceInfo.width * 0.85} // from react-native
      height={deviceInfo.height * 0.35}
      yAxisLabel="$"
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: colors.snow,
        backgroundGradientFrom: colors.lavander,
        backgroundGradientTo: colors.grape_2,
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
          r: "4",
          strokeWidth: "2",
          stroke: colors.grape,
        },
      }}
      bezier
      style={{
        marginVertical: 5,
        borderRadius: 15,
      }}
    />
  );
};

export default GlobalChart;
