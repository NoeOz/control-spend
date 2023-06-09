import { StyleSheet, Text, View } from "react-native";
import { colors, customizeText, deviceInfo } from "../styles/styles";
import Charts from "../components/spends/Charts";
import useGraphics from "../hooks/graphics/useGraphics";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  SelectedSpend,
  StateSelectedSpend,
} from "../components/manageSpends/selectSpend/SelectedSpend";
import CardThisMonth from "../components/spends/CardThisMonth";
import useInitial from "../hooks/useInitial";
import TextAuto from "../components/ui/TextAuto";
import Animated, { FadeIn } from "react-native-reanimated";

const MessageInit = () => {
  const { dayMemento } = useInitial();
  const [sizeText, setSizeText] = useState(30);

  useEffect(() => {
    setTimeout(() => {
      setSizeText(18);
    }, 2500);
    return () => {};
  }, []);

  return (
    <TextAuto
      textRender={dayMemento()}
      customStyle={customizeText(sizeText, "M", "S", "left", {
        marginBottom: 5,
        marginLeft: "5%",
      })}
    />
  );
};

const Graphics = () => {
  const [textInit, setTextInit] = useState(true);
  const manageSelectedSpend = StateSelectedSpend();
  const focusScreen = useIsFocused();
  const { monthSpend, concurrentSpend, spendsByTag, spendsbyTagPercent } =
    useGraphics({
      focusScreen,
    });

  useEffect(() => {
    return () => {};
  }, [focusScreen]);

  useEffect(() => {
    changeTextInit();
    return () => {};
  }, [textInit]);

  function changeTextInit() {
    setTimeout(() => {
      if (textInit) setTextInit(false);
    }, 2500);
  }

  function checkValidData() {
    return spendsByTag.every((spend) => spend === 0);
  }

  return (
    <View
      style={
        !checkValidData()
          ? styles.containerThisMonth
          : styles.containerEmptyThisMonth
      }
    >
      <MessageInit />
      {!textInit ? (
        <Animated.Text
          entering={FadeIn.duration(2500).damping(30)}
          style={customizeText(30, "M", "S", "left", {
            marginBottom: 15,
            marginLeft: "5%",
          })}
        >
          Durante este mes
        </Animated.Text>
      ) : (
        <Text
          style={customizeText(30, "M", "S", "left", {
            marginBottom: 15,
            marginLeft: "5%",
          })}
        />
      )}
      {!checkValidData() ? (
        <Charts dataSpends={spendsByTag} />
      ) : (
        <View
          style={{
            height: deviceInfo.height * 0.01,
          }}
        />
      )}
      <CardThisMonth
        monthSpend={monthSpend}
        concurrentSpend={concurrentSpend}
        manageSelectedSpend={manageSelectedSpend}
      />
      <SelectedSpend {...manageSelectedSpend} actions={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerThisMonth: {
    flex: 1,
    backgroundColor: colors.grape_2,
    paddingTop: deviceInfo.statusbar,
  },
  containerEmptyThisMonth: {
    flex: 1,
    backgroundColor: colors.gray_1,
    paddingTop: deviceInfo.statusbar,
  },
});

export default Graphics;
