import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import SpendsMonth from "./SpendsMoth";
import MoreOn from "./MoreOn";
import { StyleSheet } from "react-native";
import { colors, deviceInfo } from "../../styles/styles";

const CardThisMonth = ({
  monthSpend,
  concurrentSpend,
  manageSelectedSpend,
}) => {
  const cardAnimated = useSharedValue({ transformY: 0 });

  useEffect(() => {
    moveCard();
    return () => {};
  }, [monthSpend]);

  function moveCard() {
    setTimeout(() => {
      if (monthSpend > 0)
        cardAnimated.value = { transformY: deviceInfo.height * 0.37 };
      else cardAnimated.value = { transformY: 0 };
    }, 2500);
  }

  const cardAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(cardAnimated.value.transformY, {
            duration: 1200,
            damping: 40,
          }),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[styles.containerInfoMonthAnimated, cardAnimatedStyles]}
    >
      <SpendsMonth monthSpend={monthSpend} />
      <MoreOn
        concurrentSpend={concurrentSpend}
        setSelectedSpend={manageSelectedSpend.setSelectedSpend}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  containerInfoMonthAnimated: {
    width: "100%",
    backgroundColor: colors.snow,
    paddingVertical: "5%",
    paddingHorizontal: "2.5%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: deviceInfo.height * 0.9,
    position: "absolute",
    top: deviceInfo.height * 0.145,
  },
});

export default CardThisMonth;
