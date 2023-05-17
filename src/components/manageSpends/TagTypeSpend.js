import { Text, View } from "react-native";
import { colors, customizeText, globalStyles } from "../../styles/styles";
import { useEffect, useState } from "react";
import { tagsTypesSpends } from "../../constants/TagsTypeSpends";

const TagTypeSpend = ({ typeSpend }) => {
  const [colorTagType, setColorTagType] = useState(null);

  useEffect(() => {
    assignColorSpend();
    return () => {};
  }, []);

  function assignColorSpend() {
    tagsTypesSpends.forEach((type) => {
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
        marginHorizontal: 5,
      }}
    >
      <Text
        style={customizeText(16, "M", "N", "center")}
      >{`${typeSpend}`}</Text>
    </View>
  ) : null;
};

export default TagTypeSpend;
