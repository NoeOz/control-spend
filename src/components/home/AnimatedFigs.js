import Animated, {
  FadeIn,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { colors, deviceInfo } from "../../styles/styles";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export const selectionColors = [
  colors.taupe_gray+"99",
  colors.coffe+"99",
  colors.lavander+"99",
  colors.grape,
  colors.honey+"99",
  colors.cactus_1+"99",
  colors.tea_green+"99",
  colors.orange+"99",
  colors.peach+"99",
];

const AnimatedCircle = ({ backgroundColor }) => {
  const [styleFig, setStyleFig] = useState({});
  const [yPosition, setYPosition] = useState(0);

  useEffect(() => {
    generateStyle();
    return () => {
      setStyleFig(new Object());
    };
  }, []);

  const TanslateYStyle = (number) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: withSpring(number, {
              damping: 5,
              stiffness: 10,
            }),
          },
        ],
      };
    });

  function generateRandomSizeCircle() {
    const size = Math.floor(Math.random() * (230 - 30) + 30);
    return {
      height: size,
      width: size,
      borderRadius: size / 2,
    };
  }

  function generateStyle() {
    const randomH = Math.floor(Math.random() * (deviceInfo.height * 0.3));
    const randomW = Math.floor(Math.random() * (deviceInfo.width * 0.6));
    setYPosition(randomH);

    setStyleFig({
      position: "absolute",
      top: randomH,
      //bottom: randomH,
      left: randomW,
      //right: randomW,
      zIndex: 1,
      backgroundColor: backgroundColor,
      ...generateRandomSizeCircle(),
    });
  }

  return (
    <Animated.View
      entering={FadeIn.damping(5).duration(1500)}
      style={[styleFig, TanslateYStyle(yPosition)]}
    />
  );
};

const AnimatedFig = () => {
  return (
    <View style={{ flex: 1 }}>
      {selectionColors.map((extractorColor, index) => (
        <AnimatedCircle key={index + "A"} backgroundColor={extractorColor} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});

export default AnimatedFig;
