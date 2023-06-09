import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  colors,
  customizeText,
  deviceInfo,
  globalStyles,
} from "../styles/styles";
import SelectTypeSpend from "../components/formAdd/SelectTypeSpend";
import SelectFromCalendar from "../components/formAdd/SelectFromCalendar";
import { Feather } from "@expo/vector-icons";
import useAddSpend from "../hooks/createSpend/useAddSpend";
import { CustomAlert, useStateAlert } from "../components/modals/CustomAlert";
import TipsInput from "../components/formAdd/TipsInput";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const AddSpend = () => {
  const {
    createSpend,
    initialFormAddValues,
    formAddSpend,
    setFormAddSpend,
    changeSpendValues,
    validateForm,
  } = useAddSpend();
  const manageAlert = useStateAlert();

  const cardAnimated = useSharedValue({ transformY: deviceInfo.height * 0.15 });

  useEffect(() => {
    if (validateForm())
      cardAnimated.value = { transformY: 0 };

    return () => {
      cardAnimated.value = { transformY: deviceInfo.height * 0.15 };
    };
  }, [formAddSpend]);

  async function handleCreateSpend() {
    let dataSpend = formAddSpend;
    dataSpend.dateSpend = `${formAddSpend?.dateSpend?.DD}/${formAddSpend?.dateSpend?.MM}/${formAddSpend?.dateSpend?.YYYY}`;
    const response = await createSpend(
      dataSpend.name,
      dataSpend.description,
      dataSpend.mount,
      dataSpend.dateSpend,
      dataSpend.typeSpend
    );
    if (response) {
      manageAlert.setTitleAlert("Información guardada");
      manageAlert.setMessageAlert(
        "La información se ha guardado correctamente"
      );
      manageAlert.setVisibleAlert(true);
      setTimeout(() => {
        manageAlert.clearStates();
      }, 2000);
      setFormAddSpend(initialFormAddValues);
      cardAnimated.value = { transformY: deviceInfo.height * 0.15 };
    }
  }

  const cardAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(cardAnimated.value.transformY, {
            duration: 1500,
            damping: 25,
          }),
        },
      ],
    };
  });

  return (
    <View
      style={{
        ...globalStyles.principalContainer,
        backgroundColor: colors.backgroundS,
      }}
    >
      <CustomAlert
        {...manageAlert}
        changeVisibility={(value) => manageAlert.setVisibleAlert(value)}
      />
      <Text style={customizeText(24, "M", "N", "left")}>Añade un gasto</Text>
      <View style={{ marginVertical: 15 }}>
        <TextInput
          placeholder="¿En qué gastaste?"
          style={globalStyles.input}
          onChangeText={(value) => changeSpendValues("name", value)}
          value={formAddSpend.name}
        />
        <TipsInput typeInput={"name"} value={formAddSpend.name} />
        <TextInput
          multiline
          placeholder="Descripción"
          style={globalStyles.input}
          onChangeText={(value) => changeSpendValues("description", value)}
          value={formAddSpend.description}
        />
        <TipsInput typeInput={"description"} value={formAddSpend.description} />
        <View style={globalStyles.rowSpaceBetw}>
          <TextInput
            placeholder="Monto"
            style={{ ...globalStyles.input, width: "45%" }}
            keyboardType="decimal-pad"
            onChangeText={(value) => changeSpendValues("mount", value.trim())}
            value={formAddSpend.mount}
            textAlign="center"
          />
          <SelectFromCalendar
            dateValue={formAddSpend.dateSpend}
            onSelectDate={changeSpendValues}
          />
        </View>
        <SelectTypeSpend
          selectedType={formAddSpend.typeSpend}
          onSelectType={changeSpendValues}
        />
      </View>
      <Animated.View style={[styles.containerButton, cardAnimatedStyles]}>
        <TouchableOpacity
          onPress={() => handleCreateSpend()}
          style={styles.buttonAdd}
        >
          <Text style={customizeText(18, "M", "G", "left")}>
            Agregar este gasto
          </Text>
          <Feather name="plus" size={25} color={colors.grape} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonAdd: {
    width: "80%",
    padding: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: colors.lavander,
  },
  containerButton: {
    position: "absolute",
    bottom: 0,
    width: deviceInfo.width,
    paddingVertical: "5%",
    backgroundColor: colors.snow,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default AddSpend;
