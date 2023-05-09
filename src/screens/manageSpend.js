import { FlatList, Text, View } from "react-native";
import { colors, customizeText, globalStyles } from "../styles/styles";
import ItemCardSpend from "../components/manageSpends/ItemCardSpend";

const ManageSpend = () => {
  const concurrentSpend = [
    [
      { id: "h1", name: "hbo", mount: "120", typeSpend: "Suscripción" },
      { id: "n1", name: "netflix", mount: "300", typeSpend: "Suscripción" },
      { id: "m1", name: "mubi", mount: "84", typeSpend: "Suscripción" },
      { id: "s1", name: "spotify", mount: "100", typeSpend: "Suscripción" },
    ],
    [
      { id: "a2", name: "papas fritas", mount: "35", typeSpend: "Espontaneo" },
      { id: "cf", name: "doritos", mount: "20", typeSpend: "Otro" },
      { id: "fg", name: "celular", mount: "5000", typeSpend: "Personales" },
      { id: "lp", name: "mouse", mount: "1500", typeSpend: "Personales" },
    ]
  ];

  return (
    <View style={globalStyles.principalContainer}>
      <Text style={customizeText(24, "M", "N", "left")}>
        Administrar gastos
      </Text>
      <View style={{...globalStyles.line, backgroundColor: colors.backgroundS}} />
      <Text style={customizeText(18, "M", "N", "left")}>Suscripciones</Text>
      <FlatList
        data={concurrentSpend[0]}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <ItemCardSpend item={item} type={"card"} />}
        keyExtractor={(item) => item.id}
        style={{ marginVertical: 15 }}
      />
      <Text style={customizeText(18, "M", "N", "left")}>Otros</Text>
      <FlatList
        data={concurrentSpend[1]}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <ItemCardSpend item={item} type={"large"} />}
        keyExtractor={(item) => item.id}
        style={{ marginVertical: 15 }}
      />
    </View>
  );
};

export default ManageSpend;
