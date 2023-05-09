import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  colors,
  customizeText,
  deviceInfo,
  globalStyles,
} from "../../styles/styles";
import { useEffect, useState } from "react";

const ItemCardSpend = ({ item, type }) => {
  const [selected, setSelected] = useState(false);
  const [colorTagType, setColorTagType] = useState(null);

  useEffect(() => {
    assignColorSpend();
    return () => {};
  }, []);

  const colorsTypeSpend = [
    { text: "Fijo", color: colors.taupe_gray },
    { text: "Suscripción", color: null },
    { text: "Espontaneo", color: colors.tea_green },
    { text: "Emergencia", color: colors.cactus_1 },
    { text: "Ocio", color: colors.cactus_2 },
    { text: "Entretenimiento", color: colors.orange },
    { text: "Inversión", color: colors.peach },
    { text: "Personales", color: colors.lavander },
    { text: "Otro", color: colors.honey },
  ];

  function assignColorSpend() {
    colorsTypeSpend.forEach((type) => {
      if (type.text === item.typeSpend) {
        setColorTagType(type.color);
      }
    });
  }

  function assignStyle() {
    if (type === "card") return styles.container;
    else return styles.containerLarge;
  }

  return (
    <TouchableOpacity
      style={{
        ...globalStyles.card,
        ...assignStyle(),
      }}
    >
      <Text
        style={customizeText(16, "L", "N", "center", {
          textTransform: "capitalize",
        })}
      >
        {`${item.name}`}
      </Text>
      {!!colorTagType && (
        <View
          style={{
            ...globalStyles.option,
            backgroundColor: colorTagType,
          }}
        >
          <Text
            style={customizeText(16, "M", "N", "center")}
          >{`${item.typeSpend}`}</Text>
        </View>
      )}
      <Text
        style={customizeText(18, "M", "N", "center")}
      >{`$${item.mount}`}</Text>
      {/* {selected && (
        <View style={{ ...globalStyles.rowSpaceBetw, width: "80%" }}>
          <Feather name={"trash"} size={25} color={colors.error} />
          <Feather name={"edit-2"} size={25} color={colors.black} />
        </View>
      )} */}
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
