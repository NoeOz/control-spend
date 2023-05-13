import { Text } from "react-native";
import { customizeText } from "../../styles/styles";

const TipsInput = ({ typeInput, value = "" }) => {
  function message() {
    const type = {
      name: "Se recomienda que el título sea breve pero útil",
      description:
        "Se recomienda poner una descripción detallada para que en un futuro puedas recordar con mayor facilidad este gasto",
    };
    const rules = {
      name: 5,
      description: 10,
    };

    if (value.length < rules[typeInput] && value.length > 0)
      return type[typeInput];
    else return "";
  }
  return (
    message() !== "" && (
      <Text style={customizeText(14, "I", "G", "left")}>{message()}</Text>
    )
  );
};

export default TipsInput;
