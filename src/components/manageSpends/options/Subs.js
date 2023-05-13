import React from "react";
import { FlatList, Text } from "react-native";
import { customizeText } from "../../../styles/styles";
import ItemCardSpend from "../ItemCardSpend";

const Subs = ({ currentSubs, setSelectedSpend }) => {
  return (
    currentSubs.length > 0 && (
      <React.Fragment>
        <Text style={customizeText(18, "M", "N", "left")}>
          Gastos fijos en este mes
        </Text>
        <FlatList
          data={currentSubs}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ItemCardSpend
              item={item}
              type={"card"}
              onSelect={setSelectedSpend}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </React.Fragment>
    )
  );
};
export default Subs;
