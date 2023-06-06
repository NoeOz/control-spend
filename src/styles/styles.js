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
  grape_light: "#D0CED9",
  sand: "#E0C097",
  gray_1: "#555555",
  gray_2: "#a3a3a3",
  gray_3: "#EEEEEE",
  taupe_gray: "#909090",
  cool_gray: "#4B576E",
  sky: "#A3C7D6",

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

/**
 * This function takes in parameters for size, font, color, alignment, and other styles
 * and returns an object with CSS styles for text customization.
 * @param size - The font size of the text.
 * @param font - It can be : "I" for italic, "L" for light, "M" for medium, or "B" for bold.
 * @param color - The color represents the color of the text. It can be: "G" - grape_2, "R" - error, "N" - noir, "G2" - gray_2, or "S" - snow.
 * @param align - Alignment of the text (default is "left")
 * @param other - The "other" parameter is for additional properties inside object style
 * @returns The function `customizeText` returns an object with properties `fontSize`, `fontFamily`,
 * `color`, `textAlign`, and any additional properties passed in through the `other` parameter.
 */
export const customizeText = (size, font, color, align = "left", other) => {
  const identifyColor = {
    G: colors.grape_2,
    R: colors.error,
    N: colors.noir,
    G2: colors.gray_2,
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
  line: {
    width: "100%",
    height: 1.5,
    backgroundColor: colors.gray_1,
    marginVertical: 15,
  },
  rowSpaceBetw: { flexDirection: "row", justifyContent: "space-between" },
});
