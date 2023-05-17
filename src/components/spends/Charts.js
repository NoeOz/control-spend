import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import {
  colors,
  customizeText,
  deviceInfo,
  globalStyles,
} from "../../styles/styles";
import { LineChart } from "react-native-chart-kit";
import { tagsTypesSpends } from "../../constants/TagsTypeSpends";

const Charts = ({ dataSpends }) => {
  return (
    <View style={{ ...globalStyles.card, backgroundColor: colors.snow }}>
      <View
        style={{
          ...globalStyles.rowSpaceBetw,
          marginBottom: 15,
        }}
      >
        <Text style={customizeText(18, "M", "N")}>Gráfica</Text>
        {/* <TouchableOpacity>
          <Text style={customizeText(18, "M", "G")}>Ver todo</Text>
        </TouchableOpacity> */}
      </View>
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
    </View>
  );
};

export default Charts;
