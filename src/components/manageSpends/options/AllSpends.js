import React from "react";
import { FlatList, Text } from "react-native";
import { customizeText } from "../../../styles/styles";
import ItemCardSpend from "../ItemCardSpend";
import useManageSpend from "../../../hooks/manageSpends/useManageSpend";

const AllSpends = () => {
  const { allSpends } = useManageSpend();
  return (
    <React.Fragment>
      <Text style={customizeText(18, "M", "N", "left")}>Todos tus gastos</Text>
      <FlatList
        data={allSpends}
        showsHorizontalScrollIndicator={false}
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

export default AllSpends;
