import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { colors, customizeText, globalStyles } from "../styles/styles";
import AnimatedFig from "../components/home/AnimatedFigs";
import { firstTime, welcomeMessage } from "../constants/welcome";
import { useEffect } from "react";

const Wellcome = () => (
  <View style={styles.containerFirstTime}>
    <Text
      style={customizeText(35, "M", "S", "left", {
        width: "65%",
        marginBottom: 5,
      })}
    >{`${firstTime.title[0]}`}</Text>
    <Text
      style={customizeText(18, "M", "S", "left")}
    >{`${firstTime.content}`}</Text>
  </View>
);

const Hello = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("HomeTabScreen");
    }, 2100);
    return () => {};
  }, []);

  function dayMemento() {
    var fecha = new Date();
    var hora = fecha.getHours();
    var mensaje;

    if (hora >= 6 && hora < 12) {
      mensaje = welcomeMessage.title[0];
    } else if (hora >= 12 && hora < 19) {
      mensaje = welcomeMessage.title[1];
    } else {
      mensaje = welcomeMessage.title[2];
    }

    return mensaje;
  }

  return (
    <ImageBackground style={styles.containerFirstTime} blurRadius={10}>
      <Text
        style={customizeText(20, "M", "S", "left", {
          width: "65%",
        })}
      >{`${dayMemento()}`}</Text>
      <Text
        style={customizeText(30, "M", "S", "left")}
      >{`${"Usuario"}`}</Text>
    </ImageBackground>
  );
};

const Home = ({ navigation }) => {
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
    padding: "5%",
    zIndex: 100,
    position: "absolute",
    bottom: "5%",
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
