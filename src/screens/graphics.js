import { StyleSheet, Text, View } from "react-native";
import { colors, customizeText, deviceInfo } from "../styles/styles";
import Charts from "../components/spends/Charts";
import useGraphics from "../hooks/graphics/useGraphics";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import {
  SelectedSpend,
  StateSelectedSpend,
} from "../components/manageSpends/selectSpend/SelectedSpend";
import CardThisMonth from "../components/spends/CardThisMonth";

const Graphics = () => {
  const manageSelectedSpend = StateSelectedSpend();
  const focusScreen = useIsFocused();
  const { monthSpend, concurrentSpend, spendsByTag, spendsbyTagPercent } =
    useGraphics({
      focusScreen,
    });

  useEffect(() => {
    return () => {};
  }, [focusScreen]);

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
      <Text
        style={customizeText(30, "M", "S", "left", {
          marginBottom: 15,
          marginLeft: "5%",
        })}
      >
        Durante este mes
      </Text>
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
