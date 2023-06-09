import { useEffect, useState } from "react";
import { Text } from "react-native";

const TextAuto = ({ textRender, customStyle, speed = 150 }) => {
  const [text, setText] = useState("");
  const fullText = textRender;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText(t => t + fullText[index]);
        setIndex(index + 1);
      }, speed);
    }
  }, [index]);

  return <Text style={customStyle}>{text}</Text>;
};

export default TextAuto;
