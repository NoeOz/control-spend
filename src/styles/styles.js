import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";

export const colors = {
  black: "#232324",
  black_2: "#252525",
  black_3: "#1A1A1A",

  tea_green: "#D1F0B1",
  cactus_1: "#abc4aa",
  cactus_2: "#839292",
  mustad: "#675a1e",
  honey: "#DFB921",
  honey_2: "#DFB92199",
  coffe: "#504945",
  orange: "#f4a261",
  peach: "#f5cac3",
  lavander: "#A292B0",
  grape: "#443C6899",
  grape_2: "#443C68",
  gray_1: "#555555",
  gray_2: "#a3a3a3",
  taupe_gray: "#909090",
  cool_gray: "#4B576E",

  error: "#C54444",
  backgroundB: "#121212",
  backgroundS: "##eff0f0",
  noir: "#000000",
  snow: "#ffffff",
};

export const deviceInfo = {
  //Colores para corporativos
  height: Dimensions.get("screen").height,
  width: Dimensions.get("screen").width,
  statusbar:
    Platform.OS === "android"
      ? StatusBar.currentHeight + 15
      : Dimensions.get("screen").height * 0.025,
  os: Platform.OS,
};

export const customizeText = (size, font, color, align = "left", other) => {
  const identifyColor = {
    G: colors.grape_2,
    R: colors.error,
    N: colors.noir,
    TG: colors.gray_2,
    S: colors.snow,
  };

  const identifyFont = {
    I: "Roboto-Italic",
    L: "Roboto-Light",
    M: "Roboto-Medium",
    B: "Roboto-Bold",
  };

  return {
    fontSize: size,
    fontFamily: identifyFont[font],
    color: identifyColor[color],
    textAlign: align,
    ...other,
  };
};

export const globalStyles = StyleSheet.create({
  principalContainer: {
    paddingVertical: "5%",
    paddingHorizontal: "2.5%",
    paddingTop: deviceInfo.statusbar,
    flex: 1,
  },
  card: {
    padding: "5%",
    borderRadius: 20,
  },
  input: {
    padding: "2.5%",
    paddingVertical: "5%",
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.snow,
    ...customizeText(16, "M", "N", "left"),
  },
  option: {
    padding: "2.5%",
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: colors.taupe_gray,
  },
  optionSelected: {
    padding: "2.5%",
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: colors.orange,
  },
});
