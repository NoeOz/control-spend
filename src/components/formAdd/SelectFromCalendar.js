import { Text, TouchableOpacity, View } from "react-native";
import { customizeText, deviceInfo, globalStyles } from "../../styles/styles";
import React, { useState } from "react";
import CalendarRender from "../selectFromCalendar/CalendarRender";

const SelectFromCalendar = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    DD: "",
    MM: "",
    YYYY: "",
  });

  function selectedDay() {
    if (selectedDate.DD === "") return null;
    else return `${selectedDate?.DD}/${selectedDate?.MM}/${selectedDate?.YYYY}`;
  }

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => setShowCalendar(!showCalendar)}
        style={{ ...globalStyles.input, width: "45%" }}
      >
        <Text style={customizeText(16, "M", "TG", "left")}>
          {selectedDay() ?? "¿Cúando pasó?"}
        </Text>
      </TouchableOpacity>

      <CalendarRender
        show={showCalendar}
        changeShow={setShowCalendar}
        setSelectedDate={setSelectedDate}
      />
    </React.Fragment>
  );
};

export default SelectFromCalendar;
