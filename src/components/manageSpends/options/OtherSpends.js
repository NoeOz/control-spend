import React from "react";
import { FlatList, Text } from "react-native";
import { customizeText } from "../../../styles/styles";
import ItemCardSpend from "../ItemCardSpend";

const OtherSpends = ({ thisMonthSpends, setSelectedSpend }) => {
  return (
    <React.Fragment>
      <Text style={customizeText(18, "M", "N", "left")}>Todo este mes</Text>
      <FlatList
        data={thisMonthSpends}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ItemCardSpend
            item={item}
            type={"large"}
            onSelect={setSelectedSpend}
          />
        )}
        keyExtractor={(item) => item.id}
        style={{ marginVertical: 15 }}
      />
    </React.Fragment>
  );
};
export default OtherSpends;
