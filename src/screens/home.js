import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  colors,
  customizeText,
  deviceInfo,
  globalStyles,
} from "../styles/styles";
import AnimatedFig from "../components/home/AnimatedFigs";
import { firstTime } from "../constants/welcome";
import { useEffect } from "react";
import useInitial from "../hooks/useInitial";

const Hello = ({ navigation }) => {
  const { dayMemento } = useInitial();

  function goHome() {
    navigation.navigate("HomeTabScreen");
  }

  return (
    <ImageBackground style={styles.containerFirstTime} blurRadius={10}>
      <Text style={customizeText(30, "B", "S", "left")}>CONTROL SPEND</Text>
      <Text style={customizeText(18, "M", "S", "left")}>
        Hola, bienvenido a tu aplicación de control de gastos.
      </Text>
      <TouchableOpacity onPress={() => goHome()}>
        <Text style={customizeText(18, "L", "S", "right")}>
          C O N T I N U A R
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const Home = ({ navigation }) => {
  const { recoverDataSpends } = useInitial();

  useEffect(() => {
    recoverDataSpends();
    return () => {};
  }, []);

  return (
    <View
      style={{
        ...globalStyles.principalContainer,
        backgroundColor: colors.backgroundB,
      }}
    >
      <AnimatedFig />
      <Hello navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerFirstTime: {
    width: "90%",
    height: deviceInfo.height * 0.25,
    justifyContent: "space-between",
    padding: "5%",
    zIndex: 100,
    position: "absolute",
    bottom: "10%",
    right: "2%",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderColor: "rgba(500,500,500, 0.4)",
    borderRadius: 10,
    borderWidth: 1,
    elevation: 5,
    lineHeight: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: "rgba(500,500,500, 0.1)",
  },
});

export default Home;
