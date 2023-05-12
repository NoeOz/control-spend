import { FlatList, StyleSheet, Text, View } from "react-native";
import {
  colors,
  customizeText,
  deviceInfo,
  globalStyles,
} from "../../styles/styles";
import { useEffect, useState } from "react";
import useGraphics from "../../hooks/graphics/useGraphics";

const MoreOn = () => {
  const [concurrentSpend, setConcurrentSpend] = useState([]);
  const { getMoreOnSpends } = useGraphics();

  useEffect(() => {
    handleGetMoreOnSpends();
    return () => {};
  }, []);

  function handleGetMoreOnSpends() {
    const spendsMoreOn = getMoreOnSpends();
    setConcurrentSpend(spendsMoreOn.splice(0, 4));
  }

  const Item = ({ item }) => (
    <View style={styles.itemStyle}>
      <Text
        style={customizeText(18, "L", "B", "left", {
          textTransform: "capitalize",
        })}
      >
        {item.name}
      </Text>
      <Text style={customizeText(24, "M", "B")}>${item.mount}</Text>
    </View>
  );

  return (
    <View style={{ marginVertical: 15 }}>
      <Text style={customizeText(18, "M", "N")}>
        Cosas en las que gastas más
      </Text>
      <FlatList
        data={concurrentSpend}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
        style={{ marginVertical: 15 }}
        ListEmptyComponent={
          <View style={{ ...styles.itemStyle, width: "98%" }}>
            <Text style={customizeText(18, "L", "B", "left")}>
              No hay suficientes gastos para determinar esto :(
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    ...globalStyles.card,
    width: deviceInfo.width * 0.3,
    height: deviceInfo.width * 0.25,
    backgroundColor: colors.snow,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
});

export default MoreOn;
