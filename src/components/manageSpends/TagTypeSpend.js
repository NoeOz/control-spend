import { Text, View } from "react-native";
import { colors, customizeText, globalStyles } from "../../styles/styles";
import { useEffect, useState } from "react";

const TagTypeSpend = ({ typeSpend }) => {
  const [colorTagType, setColorTagType] = useState(null);

  useEffect(() => {
    assignColorSpend();
    return () => {};
  }, []);

  const colorsTypeSpend = [
    { text: "Fijo", color: colors.taupe_gray },
    { text: "Suscripción", color: null },
    { text: "Espontáneo", color: colors.tea_green },
    { text: "Entretenimiento", color: colors.orange },
    { text: "Inversión", color: colors.peach },
    { text: "Personales", color: colors.lavander },
    { text: "Otro", color: colors.honey },
  ];

  function assignColorSpend() {
    colorsTypeSpend.forEach((type) => {
      if (type.text === typeSpend) {
        setColorTagType(type.color);
      }
    });
  }

  return !!colorTagType ? (
    <View
      style={{
        ...globalStyles.option,
        marginHorizontal: 0,
        backgroundColor: colorTagType,
      }}
    >
      <Text
        style={customizeText(16, "M", "N", "center")}
      >{`${typeSpend}`}</Text>
    </View>
  ) : null;
};

export default TagTypeSpend;
