import { FlatList, Text, View } from "react-native";
import { colors, customizeText, deviceInfo, globalStyles } from "../../styles/styles";

const MoreOn = () => {
  const concurrentSpend = [
    { id: "h1", name: "hbo", coust: "120" },
    { id: "n1", name: "netflix", coust: "300" },
    { id: "m1", name: "mubi", coust: "84" },
    { id: "s1", name: "spotify", coust: "100" },
  ];

  const Item = ({ item }) => (
    <View
      style={{
        ...globalStyles.card,
        width: deviceInfo.width * 0.3,
        height: deviceInfo.width * 0.25,
        backgroundColor: colors.snow,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
      }}
    >
      <Text
        style={customizeText(18, "L", "B", "left", {
          textTransform: "capitalize",
        })}
      >
        {item.name}
      </Text>
      <Text style={customizeText(24, "M", "B")}>{`$${item.coust}`}</Text>
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
      />
    </View>
  );
};

export default MoreOn;
