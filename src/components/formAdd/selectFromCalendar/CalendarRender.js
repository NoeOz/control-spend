import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { daysEsp, monthsEsp } from "../../../constants/calendarData";
import { colors, customizeText, globalStyles } from "../../../styles/styles";
import { TraslucentModal } from "../../modals/TraslucentModal";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const CalendarRender = ({ show, changeShow, setSelectedDate }) => {
  const globalState = useSelector((state) => state.globalState);
  const { thisMonth } = globalState;

  const [daysMatrix, setDaysMatrix] = useState(new Array());
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [loadedDays, setLoadedDays] = useState(false);

  useEffect(() => {
    showDays();
    return () => {
      cleanAll();
    };
  }, []);

  function cleanAll() {
    setDaysMatrix(new Array());
    setCurrentMonth(0);
    setCurrentYear(0);
  }

  /**
   * The function generates a matrix of days for each month of the current year.
   */
  const showDays = () => {
    const { month, year } = getActualYearMonth();
    setCurrentYear(year);
    setCurrentMonth(month);
    for (let index = 1; index <= 12; index++) {
      generateDaysMatrix(index, year);
    }
    setLoadedDays(true);
  };

  /**
   * The function returns the current month and year as an object.
   * @returns An object with the current month and year as properties.
   */
  function getActualYearMonth() {
    const fecha = new Date();
    // Obtener el mes y año actual
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    return { month, year };
  }

  /**
   * Function to generate an Array of Arrays of weeks making a Matrix
   * @param {Number} month Number of month
   * @param {Number} year Number of Year
   */
  function generateDaysMatrix(month, year) {
    // Obtener la cantidad de días en el mes seleccionado
    const cantidadDias = new Date(year, month, 0).getDate();

    // Obtener el día de la semana del primer día del mes
    const diaInicio = new Date(year, month - 1, 1).getDay();

    // Crear la matriz de vectores de días
    const matrizDias = [];

    // Crear un contador para llevar la cuenta de los días
    let contadorDias = 1;

    // Crear un bucle para generar las filas de la matriz
    for (let i = 0; i < 6; i++) {
      // Crear un vector para representar la fila
      const fila = [];

      // Crear un bucle para agregar los días de la semana al vector
      for (let j = 0; j < 7; j++) {
        // Verificar si ya se han agregado todos los días del mes
        if (contadorDias > cantidadDias) {
          // Agregar un valor nulo para representar un día vacío
          fila.push(null);
        } else if (i === 0 && j < diaInicio) {
          // Agregar un valor nulo para los días del mes anterior al primer día del mes actual
          fila.push(null);
        } else {
          // Agregar el número del día al vector
          fila.push(contadorDias);

          // Incrementar el contador de días
          contadorDias++;
        }
      }

      // Agregar la fila a la matriz
      matrizDias.push(fila);

      // Si ya se agregaron todos los días del mes, salir del bucle
      if (contadorDias > cantidadDias) {
        break;
      }
    }
    setDaysMatrix((oldDaysMatrix) => [...oldDaysMatrix, matrizDias]);
  }

  /**
   * This is a JavaScript function that returns a row of days in Spanish abbreviated format.
   * @returns The `RowNameDays` component is being returned, which renders a row of days of the week in
   * Spanish abbreviated form.
   */
  const RowNameDays = () => {
    return (
      <View style={style.rowBeetwn}>
        {daysEsp.map((day) => (
          <View key={Math.random(100)} style={style.itemDate}>
            <Text
              style={customizeText(16, "I", "N", "center", {
                textTransform: "capitalize",
              })}
            >{`${day.slice(0, 3)}.`}</Text>
          </View>
        ))}
      </View>
    );
  };

  /**
   * The function sets the selected date to a specific day in the current month and year, and then
   * hides the date picker.
   * @param day - The day parameter is a variable that represents the day of the month that was pressed
   * by the user. It is passed as an argument to the pressedDay function.
   */
  function pressedDay(day) {
    setSelectedDate({ DD: day, MM: currentMonth, YYYY: currentYear });
    changeShow(false);
  }

  /**
   * The function renders a calendar with days organized in rows and columns.
   * @returns A component that renders a calendar with days of the current month
   */
  const RenderDaysCalendar = () => {
    function isToday(day) {
      const today = new Date();
      const todayMonth = today.getMonth() + 1;
      const currentMapMonth = monthsEsp[currentMonth - 1].number.toString();
      if (
        currentMapMonth == todayMonth.toString() &&
        day == today.getDate().toString()
      ) {
        return style.todayItemDate;
      } else return style.itemDate;
    }

    return (
      <View>
        {daysMatrix[currentMonth - 1].map((week) => (
          <View key={Math.random(100)} style={style.rowBeetwn}>
            {week.map((day) => (
              <TouchableOpacity
                onPress={() => pressedDay(day)}
                key={Math.random(100)}
                style={isToday(day)}
              >
                <Text
                  style={customizeText(16, "M", "N", "center", {
                    textTransform: "capitalize",
                  })}
                >{`${day ?? ""}`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    );
  };

  /**
   * The function controls the current month by adding or subtracting a given value.
   * @param value - The amount by which the current month is to be incremented or decremented. It can
   * be a positive or negative integer.
   */
  function controlMonth(value) {
    const newMonth = currentMonth + value;
    if (newMonth <= 12 && newMonth >= 1 && newMonth <= thisMonth)
      setCurrentMonth(newMonth);
  }

  return (
    <TraslucentModal
      visible={show}
      setVisible={changeShow}
      managerClose={() => changeShow(false)}
    >
      <View style={style.cardCalendar}>
        <Text
          style={customizeText(20, "M", "N", "center", {
            marginBottom: 25,
          })}
        >
          Selecciona una fecha
        </Text>
        <View style={style.headerCalendar}>
          <TouchableOpacity onPress={() => controlMonth(-1)}>
            <Feather name="chevron-left" color={colors.gray_1} size={30} />
          </TouchableOpacity>
          <Text
            style={customizeText(20, "M", "N", "center", {
              textTransform: "capitalize",
            })}
          >
            {monthsEsp[currentMonth - 1]?.name}
            {` ${currentYear}`}
          </Text>
          <TouchableOpacity onPress={() => controlMonth(+1)}>
            <Feather name="chevron-right" color={colors.gray_1} size={30} />
          </TouchableOpacity>
        </View>
        <View style={globalStyles.line} />
        <RowNameDays />
        {loadedDays && <RenderDaysCalendar />}
      </View>
    </TraslucentModal>
  );
};

const style = StyleSheet.create({
  headerCalendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardCalendar: {
    width: "98%",
    padding: "2.5%",
    borderRadius: 15,
    alignSelf: "center",
    backgroundColor: colors.snow,
  },
  rowBeetwn: { flexDirection: "row", justifyContent: "space-between" },
  itemDate: { padding: "2%", height: 40, width: 40 },
  todayItemDate: {
    padding: "2%",
    height: 40,
    width: 40,
    backgroundColor: colors.grape,
    borderRadius: 100,
  },
});

export default CalendarRender;
