import { Text, TouchableOpacity } from "react-native";
import { customizeText, globalStyles } from "../../styles/styles";
import React, { useState } from "react";
import CalendarRender from "./selectFromCalendar/CalendarRender";

const SelectFromCalendar = ({ dateValue, onSelectDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  function selectedDay() {
    if (dateValue.DD === "") return null;
    else return `${dateValue?.DD}/${dateValue?.MM}/${dateValue?.YYYY}`;
  }

  const handleChangeDate = (selectedDate) => {
    onSelectDate("dateSpend", selectedDate);
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => setShowCalendar(!showCalendar)}
        style={{ ...globalStyles.input, width: "45%" }}
      >
        <Text style={customizeText(16, "M", "G2", "center")}>
          {selectedDay() ?? "¿Cúando pasó?"}
        </Text>
      </TouchableOpacity>

      <CalendarRender
        show={showCalendar}
        changeShow={setShowCalendar}
        setSelectedDate={handleChangeDate}
      />
    </React.Fragment>
  );
};

export default SelectFromCalendar;
