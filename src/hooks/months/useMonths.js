import { useDispatch, useSelector } from "react-redux";
import { monthsEsp } from "../../constants/calendarData";
import { setSelectedMonth } from "../../redux/globalState";

const useMonths = () => {
  const globalState = useSelector((state) => state.globalState);
  const { thisMonth, selectedMonth } = globalState;
  const dispatch = useDispatch();

  function getYears() {
    const year = new Date().getFullYear();
    const yearsArray = [];
    for (let i = 1; i <= 5; i++) {
      yearsArray.push(year - i);
    }
    return yearsArray;
  }

  /**
   * The function changes the currently selected month.
   * @param month - The month parameter is a variable that represents the month that the user wants to
   * select. It is passed as an argument to the changeCurrentMonth function.
   */
  function changeCurrentMonth(month) {
    dispatch(setSelectedMonth(month));
  }

  /**
   * The function returns an array of available months in Spanish language.
   * @returns Returns an array of objects representing the months < thisMonth
   */
  function disponibleMonths() {
    return monthsEsp
      .map((month) => {
        if (validMonth(month.number)) return month;
      })
      .filter((month) => !!month)
      .reverse();
  }

  /**
   * The function checks if a given month is valid based on whether it is less than the current month.
   * @param numMonth - The parameter `numMonth` is a number representing a month (1-12).
   * @returns a boolean value (true or false) based on whether the input `numMonth` is less than the
   * current month (`thisMonth`).
   */
  function validMonth(numMonth) {
    if (numMonth < thisMonth) return true;
    else return false;
  }

  /**
   * The function returns a string indicating the selected month in either "Chart" or non-"Chart"
   * screens.
   * @param screen - a string indicating the current screen being displayed (either "Chart" or
   * something else)
   * @returns a string that represents the title of a section or chart based on the current selected
   * month and the screen being displayed.
   */
  function titleManageMonth(screen) {
    if (screen === "Chart") {
      if (selectedMonth != thisMonth)
        return `Mes de ${monthsEsp[selectedMonth - 1].name}`;
      else return "Durante este mes";
    } else {
      if (selectedMonth != thisMonth)
        return `En el mes de ${monthsEsp[selectedMonth - 1].name}`;
      else return "Este mes";
    }
  }

  return {
    disponibleMonths,
    changeCurrentMonth,
    getYears,
    validMonth,
    titleManageMonth,
    thisMonth,
    selectedMonth,
  };
};

export default useMonths;
