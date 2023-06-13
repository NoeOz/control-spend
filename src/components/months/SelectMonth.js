import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useMonths from "../../hooks/months/useMonths";
import { TraslucentModal } from "../modals/TraslucentModal";
import { colors, customizeText, deviceInfo } from "../../styles/styles";
import { monthsEsp } from "../../constants/calendarData";

const SelectMonth = ({ manageModal }) => {
  const { disponibleMonths, changeCurrentMonth, thisMonth, selectedMonth } =
    useMonths();

  function closeModalSelectMonth() {
    manageModal.setVisible(false);
  }

  function handleChangeCurrentMonth(numMonth) {
    changeCurrentMonth(numMonth);
    closeModalSelectMonth();
  }

  return (
    <TraslucentModal
      visible={manageModal.visible}
      setVisible={manageModal.setVisible}
      managerClose={closeModalSelectMonth}
    >
      <View style={styles.containerSelector}>
        <Text
          style={customizeText(20, "R", "N", "center", {
            marginBottom: 10,
          })}
        >
          Consultar los gastos de otro mes
        </Text>
        <View style={styles.containerListMonths}>
          <FlatList
            data={disponibleMonths()}
            keyExtractor={(item) => item.number}
            renderItem={(item) => (
              <TouchableOpacity
                onPress={() => handleChangeCurrentMonth(item.item.number)}
                style={styles.monthItem(
                  item.item.number,
                  disponibleMonths().length
                )}
              >
                <Text
                  style={customizeText(30, "L", "N", "center", {
                    textTransform: "capitalize",
                    width: "25%",
                  })}
                >
                  {item.item.number}
                </Text>
                <Text
                  style={customizeText(20, "L", "N", "center", {
                    textTransform: "capitalize",
                    width: "75%",
                  })}
                >
                  {item.item.name}
                </Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
          {selectedMonth != thisMonth ? (
            <TouchableOpacity
              onPress={() => handleChangeCurrentMonth(thisMonth)}
              style={styles.monthItem(2, 5)}
            >
              <Text
                style={customizeText(30, "M", "G", "center", {
                  textTransform: "capitalize",
                  width: "25%",
                })}
              >
                {thisMonth}
              </Text>
              <Text
                style={customizeText(18, "M", "G", "center", {
                  textTransform: "capitalize",
                  width: "75%",
                })}
              >
                {`Regresar a este mes (${monthsEsp[thisMonth - 1].name})`}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </TraslucentModal>
  );
};

const styles = StyleSheet.create({
  containerSelector: {
    width: "98%",
    padding: "2.5%",
    borderRadius: 15,
    alignSelf: "center",
    backgroundColor: colors.snow,
  },
  containerListMonths: {
    height: deviceInfo.height * 0.35,
    paddingHorizontal: "5%",
  },
  monthItem(indexMonth, totalItems) {
    return {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: indexMonth === 1 ? "15%" : 25,
      marginBottom: indexMonth === totalItems ? "15%" : 25,
    };
  },
});

export default SelectMonth;
