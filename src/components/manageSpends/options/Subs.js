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

const Subs = ({ currentSubs = [], setSelectedSpend }) => {
  useEffect(() => {
    return () => {};
  }, [currentSubs]);
  
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={customizeText(18, "M", "N", "left", { marginBottom: 10 })}>
        Gastos fijos / suscripciones de este mes
      </Text>
      <FlatList
        contentContainerStyle={{
          height: deviceInfo.height * 0.1,
          width: "100%",
        }}
        data={currentSubs}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ItemCardSpend
            item={item}
            type={"card"}
            onSelect={setSelectedSpend}
            showTypeTag={false}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View
            style={{
              ...globalStyles.card,
              width: "100%",
              backgroundColor: colors.snow,
            }}
          >
            <Text style={customizeText(18, "I", "N", "center")}>
              No hay gastos de este rubro en este mes
            </Text>
          </View>
        }
      />
    </View>
  );
};
export default Subs;
