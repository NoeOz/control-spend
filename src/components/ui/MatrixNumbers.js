import { useEffect, useState } from "react";
import { Text } from "react-native";

const MatrixNumbers = ({
  triggerEnd,
  time = 40,
  maxNumber = 999,
  styleText,
}) => {
  const [spendText, setSpendText] = useState(1);

  useEffect(() => {
    let timerId;
    let counter = 0;

    const generateMatrixEffect = () => {
      const randomNumber = Math.floor(Math.random() * maxNumber) + 1;
      setSpendText(spendText + randomNumber);

      if (counter < time) {
        timerId = setTimeout(generateMatrixEffect, 10);
        counter++;
      } else {
        triggerEnd();
      }
    };

    generateMatrixEffect();

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return <Text style={styleText}>{spendText}</Text>;
};

export default MatrixNumbers;
