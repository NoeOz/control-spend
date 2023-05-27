import React from "react";
import { FlatList, Text, View } from "react-native";
import {
  colors,
  customizeText,
  deviceInfo,
  globalStyles,
} from "../../../styles/styles";
import ItemCardSpend from "../ItemCardSpend";
import { useEffect } from "react";
import Animated, { FadeIn } from "react-native-reanimated";

const OtherSpends = ({ thisMonthSpends = [], setSelectedSpend }) => {
  useEffect(() => {
    return () => {};
  }, [thisMonthSpends]);

  return (
    <View>
      <Text style={customizeText(18, "M", "N", "left")}>Todo este mes</Text>
      <FlatList
        data={thisMonthSpends}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn.duration(600).delay(500 * index)}>
            <ItemCardSpend
              item={item}
              type={"large"}
              onSelect={setSelectedSpend}
            />
          </Animated.View>
        )}
        keyExtractor={(item) => item.id}
        style={{ marginVertical: 15, height: deviceInfo.height * 0.6 }}
        ListEmptyComponent={
          <View
            style={{
              ...globalStyles.card,
              width: "100%",
              backgroundColor: colors.snow,
            }}
          >
            <Text style={customizeText(18, "I", "N", "left")}>
              No hay gastos registrados en este mes
            </Text>
          </View>
        }
      />
    </View>
  );
};
export default OtherSpends;
