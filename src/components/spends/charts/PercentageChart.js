import { PieChart } from "react-native-chart-kit";
import { tagsTypesSpends } from "../../../constants/TagsTypeSpends";
import { colors, deviceInfo } from "../../../styles/styles";
import { useEffect, useState } from "react";

const PercentageChart = ({ dataSpends = [] }) => {
  const [dataSpendsPie, setDataSpendsPie] = useState([]);

  useEffect(() => {
    structureData();
    return () => {};
  }, []);

  function structureData() {
    let newDataSpends = [];
    dataSpends.forEach((spend, index) => {
      newDataSpends.push({
        name: String(tagsTypesSpends[index].text).slice(0,9)+".",
        spend: spend,
        color: tagsTypesSpends[index].color,
        legendFontColor: colors.black_2,
        legendFontSize: 14,
      });
    });
    setDataSpendsPie(newDataSpends);
  }

  return (
    dataSpendsPie.length > 0 && (
      <PieChart
        data={dataSpendsPie}
        width={deviceInfo.width * 0.85}
        height={deviceInfo.height * 0.24}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={"spend"}
        backgroundColor={"transparent"}
        hasLegend={false}
        absolute
      />
    )
  );
};

export default PercentageChart;
