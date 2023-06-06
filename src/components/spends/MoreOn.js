import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  colors,
  customizeText,
  deviceInfo,
  globalStyles,
} from "../../styles/styles";
import { formatMK } from "../../helpers/quantityFormat";
import Animated, { FadeIn } from "react-native-reanimated";

const MoreOn = ({ concurrentSpend, setSelectedSpend }) => {
  const Item = ({ item, index }) => (
    <Animated.View
      entering={FadeIn.delay(500 * index)
        .damping(10)
        .easing()
        .duration(600)}
    >
      <TouchableOpacity
        onPress={() => setSelectedSpend(item)}
        style={styles.itemStyle}
      >
        <Text
          style={customizeText(18, "L", "B", "left", {
            textTransform: "capitalize",
          })}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text style={customizeText(24, "M", "B")} numberOfLines={1}>
          {`$${formatMK(item.mount)}`}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={{ marginVertical: 15 }}>
      <Text style={customizeText(18, "M", "N", "left", { marginLeft: 10 })}>
        Cosas en las que has gastado más este mes
      </Text>
      <FlatList
        data={concurrentSpend}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
        keyExtractor={(item) => item.id}
        style={{ marginVertical: 15 }}
        ListEmptyComponent={
          <View
            style={{ ...styles.itemStyle, width: "80%", alignSelf: "center" }}
          >
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
    backgroundColor: colors.grape_light,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
});

export default MoreOn;
