import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { daysEsp, monthsEsp } from "../../constants/calendarData";
import { colors, customizeText, globalStyles } from "../../styles/styles";
import { TraslucentModal } from "../modals/TraslucentModal";
import { Feather } from "@expo/vector-icons";

const CalendarRender = ({ show, changeShow, setSelectedDate }) => {
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

  const showDays = () => {
    const { month, year } = getActualYearMonth();
    setCurrentYear(year);
    setCurrentMonth(month);
    for (let index = 1; index <= 12; index++) {
      generateDaysMatrix(index, year);
    }
    setLoadedDays(true);
  };

  function getActualYearMonth() {
    const fecha = new Date();
    // Obtener el mes y año actual
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    return { month, year };
  }

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

  function pressedDay(day) {
    setSelectedDate({ DD: day, MM: currentMonth, YYYY: currentYear });
    changeShow(false);
  }

  const RenderDaysCalendar = () => {
    return (
      <View>
        {daysMatrix[currentMonth - 1].map((week) => (
          <View key={Math.random(100)} style={style.rowBeetwn}>
            {week.map((day) => (
              <TouchableOpacity
                onPress={() => pressedDay(day)}
                key={Math.random(100)}
                style={style.itemDate}
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

  function controlMonth(value) {
    const newMonth = currentMonth + value;
    if (newMonth <= 12 && newMonth >= 1) setCurrentMonth(newMonth);
  }

  return (
    <TraslucentModal visible={show} setVisible={changeShow}>
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
    marginTop: "35%",
  },
  rowBeetwn: { flexDirection: "row", justifyContent: "space-between" },
  itemDate: { padding: "2%", height: 40, width: 40 },
});

export default CalendarRender;
