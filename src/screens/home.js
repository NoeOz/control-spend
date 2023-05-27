import { ImageBackground, StyleSheet, Text, View } from "react-native";
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

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("HomeTabScreen");
    }, 2100);
    return () => {};
  }, []);

  return (
    <ImageBackground style={styles.containerFirstTime} blurRadius={10}>
      <Text
        style={customizeText(35, "M", "S", "left", {
          width: "65%",
        })}
      >{`Hola ${dayMemento()}`}</Text>
      <Text
        style={customizeText(18, "M", "S", "left")}
      >{`${firstTime.content}`}</Text>
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
    width: "100%",
    height: deviceInfo.height * 0.3,
    justifyContent: "space-between",
    padding: "5%",
    zIndex: 100,
    position: "absolute",
    bottom: "25%",
    alignSelf: "center",
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
