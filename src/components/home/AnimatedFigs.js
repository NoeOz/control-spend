import Animated, {
  FadeIn,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { colors, deviceInfo } from "../../styles/styles";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const selectionColors = [
  colors.tea_green + "99",
  colors.cactus_1 + "99",
  colors.cactus_2 + "99",
  colors.cool_gray,
  colors.taupe_gray + "99",
  colors.gray_1 + "99",
  colors.gray_2 + "99",
  colors.gray_3 + "99",
  colors.grape_2 + "99",
];

const selectionColorsAlt = [
  colors.coffe + "99",
  colors.mustad + "99",
  colors.honey + "99",
  colors.orange + "99",
  colors.peach + "99",
  colors.sand + "99",
  colors.snow + "99",
];

const palleteColors = () => {
  const randomPalette = Math.random() >= 0.5;
  return randomPalette ? selectionColors : selectionColorsAlt;
};

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

  function generateRandomSizeCircle(donut) {
    const size = Math.floor(Math.random() * (230 - 30) + 30);
    const maxBorder = size * 0.25;
    const minBorder = size * 0.04;
    const randomBorderW = Math.floor(
      Math.random() * (maxBorder - minBorder) + minBorder
    );
    const circle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      backgroundColor: backgroundColor,
    };
    const wtfDonut = {
      borderRadius: size / 2,
      borderWidth: randomBorderW,
      height: size,
      width: size,
      borderColor: backgroundColor,
    };

    return donut ? wtfDonut : circle;
  }

  function generateStyle() {
    const randomH = Math.floor(Math.random() * (deviceInfo.height * 0.3));
    const randomW = Math.floor(Math.random() * (deviceInfo.width * 0.6));

    const randomDonut = Math.random() >= 0.5;
    setYPosition(randomH);

    setStyleFig({
      position: "absolute",
      top: randomH,
      left: randomW,
      zIndex: 1,
      ...generateRandomSizeCircle(randomDonut),
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
      {palleteColors().map((extractorColor, index) => (
        <AnimatedCircle key={index + "A"} backgroundColor={extractorColor} />
      ))}
    </View>
  );
};

export default AnimatedFig;
