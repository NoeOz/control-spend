import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { tagsTypesSpends } from "../../constants/TagsTypeSpends";

const useGraphics = ({ focusScreen }) => {
  const globalState = useSelector((state) => state.globalState);
  const { selectedMonth } = globalState;

  const [monthSpend, setMonthSpend] = useState(0);
  const [concurrentSpend, setConcurrentSpend] = useState([]);
  const [spendsByTag, setSpendsByTag] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (focusScreen || selectedMonth) {
      getThisMonthSpends();
      getMoreOnSpends();
      orderSpendsByTag();
    }
    return () => {
      clearStates();
    };
  }, [focusScreen, selectedMonth]);

  function clearStates() {
    setMonthSpend(0);
    setConcurrentSpend([]);
    setSpendsByTag([]);
  }

  function getThisMonthSpends() {
    const globalSpends = globalState.spends;

    let thisMonthSpend = 0;

    if (globalSpends?.length > 0) {
      globalSpends.forEach((spend) => {
        if (!!spend?.dateSpend && !!spend?.mount) {
          //? get the month registered
          const fixMonthSpend = parseInt(spend?.dateSpend.split("/")[1]);
          //? compare teh month in spend and the actual month
          if (parseInt(fixMonthSpend) === selectedMonth) {
            thisMonthSpend += spend?.mount;
          }
        }
      });
      setMonthSpend(thisMonthSpend.toFixed(2));
    }
  }

  function getMoreOnSpends() {
    const globalSpends = globalState.spends;
    let spendsLastMonths = [];

    if (globalSpends?.length > 0) {
      globalSpends.forEach((spend) => {
        if (!!spend?.dateSpend && !!spend?.mount) {
          const fixMonthSpend = parseInt(spend?.dateSpend.split("/")[1]);
          if (fixMonthSpend <= selectedMonth && fixMonthSpend >= selectedMonth)
            spendsLastMonths.push(spend);
        }
      });
      spendsLastMonths.sort((a, b) => b?.mount - a?.mount);
      const final = spendsLastMonths.slice(0, 4);
      setConcurrentSpend(final);
    }
  }

  function orderSpendsByTag() {
    const globalSpends = globalState.spends;
    //? this is the order in tagsTypesSpends
    //?Fijo, Suscripción, Espontáneo, Entretenimiento, Inversión, Personales, Otro
    let newSpendsByTag = [0, 0, 0, 0, 0, 0, 0];

    if (globalSpends?.length > 0) {
      globalSpends.forEach((spend) => {
        if (!!spend?.dateSpend && !!spend?.mount) {
          const fixMonthSpend = parseInt(spend?.dateSpend.split("/")[1]);
          if (parseInt(fixMonthSpend) === selectedMonth) {
            const position = tagsTypesSpends.findIndex(
              (element) => spend.typeSpend == element.text
            );
            newSpendsByTag[position] = parseFloat(
              newSpendsByTag[position] + spend.mount
            );
          }
        }
      });
      setSpendsByTag(newSpendsByTag);
    }
  }

  return { monthSpend, concurrentSpend, spendsByTag };
};

export default useGraphics;
