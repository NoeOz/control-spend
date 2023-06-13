import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  colors,
  customizeText,
  deviceInfo,
  globalStyles,
} from "../styles/styles";
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
import { MaterialIcons } from "@expo/vector-icons";
import { StateTraslucentModal } from "../components/modals/TraslucentModal";
import SelectMonth from "../components/months/SelectMonth";
import useMonths from "../hooks/months/useMonths";

const MessageInit = () => {
  const { dayMemento } = useInitial();
  const [sizeText, setSizeText] = useState(30);

  useEffect(() => {
    setTimeout(() => {
      setSizeText(18);
    }, 2300);
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

const MonthOptions = ({ showSelectMonth }) => {
  const [textInit, setTextInit] = useState(true);
  const { titleManageMonth } = useMonths();

  useEffect(() => {
    changeTextInit();
    return () => {};
  }, [textInit]);

  function changeTextInit() {
    setTimeout(() => {
      if (textInit) setTextInit(false);
    }, 2500);
  }

  return !textInit ? (
    <View
      style={{
        ...globalStyles.rowSpaceBetw,
        paddingHorizontal: "5%",
        marginBottom: 15,
        alignItems: "center",
      }}
    >
      <Animated.Text
        entering={FadeIn.duration(2500).damping(30)}
        style={customizeText(30, "M", "S", "left", {})}
      >
        {titleManageMonth("Chart")}
      </Animated.Text>
      <TouchableOpacity onPress={() => showSelectMonth(true)}>
        <MaterialIcons name="date-range" size={25} color={colors.snow} />
      </TouchableOpacity>
    </View>
  ) : (
    <Text
      style={customizeText(30, "M", "S", "left", {
        marginBottom: 15,
        marginLeft: "5%",
      })}
    />
  );
};

const Graphics = () => {
  const manageSelectedSpend = StateSelectedSpend();
  const focusScreen = useIsFocused();
  const manageTraslucentModal = StateTraslucentModal();
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
      <MessageInit />
      <MonthOptions showSelectMonth={manageTraslucentModal.setVisible} />
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
      <SelectMonth manageModal={manageTraslucentModal} />
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
