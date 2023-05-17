import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  colors,
  customizeText,
  deviceInfo,
  globalStyles,
} from "../../styles/styles";
import TagTypeSpend from "./TagTypeSpend";
import { formatMK } from "../../helpers/quantityFormat";

const ItemCardSpend = ({ item, type, onSelect, showTypeTag = true }) => {
  function assignStyle() {
    if (type === "card") return styles.container;
    else return styles.containerLarge;
  }

  return (
    <TouchableOpacity
      onPress={() => onSelect(item)}
      style={{
        ...globalStyles.card,
        ...assignStyle(),
      }}
    >
      <Text
        style={customizeText(18, "L", "N", "left", {
          width: "28%",
        })}
        numberOfLines={1}
      >
        {`${item?.name}`}
      </Text>
      <Text
        style={customizeText(18, "M", "N", "left", {
          width: "28%",
        })}
        numberOfLines={1}
      >{`$${formatMK(item?.mount)}`}</Text>
      {showTypeTag && (
        <View style={{ width: "32%" }}>
          <TagTypeSpend typeSpend={item?.typeSpend} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.snow,
    width: deviceInfo.width * 0.4,
    height: deviceInfo.height * 0.1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  containerLarge: {
    backgroundColor: colors.snow,
    width: "100%",
    height: deviceInfo.height * 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
});

export default ItemCardSpend;
