import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useGraphics = ({ focusScreen }) => {
  const globalState = useSelector((state) => state.globalState);
  //today date
  const d = new Date();
  const month = d.getMonth() + 1;

  const [monthSpend, setMonthSpend] = useState(0);
  const [concurrentSpend, setConcurrentSpend] = useState([]);

  useEffect(() => {
    getThisMonthSpends();
    getMoreOnSpends();
    return () => {
      clearStates();
    };
  }, [focusScreen]);

  function clearStates() {
    setMonthSpend(0);
    setConcurrentSpend([]);
  }

  function getThisMonthSpends() {
    const globalSpends = globalState.spends;

    let thisMonthSpend = 0;

    if (globalSpends?.length > 0) {
      globalSpends.forEach((spend) => {
        if (!!spend?.dateSpend && !!spend?.mount) {
          const fixMonthSpend = parseInt(spend?.dateSpend.split("/")[1]);
          if (parseInt(fixMonthSpend) === month) {
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
          if (fixMonthSpend <= month && fixMonthSpend >= month - 2) {
            spendsLastMonths.push(spend);
          }
        }
      });
      spendsLastMonths.sort((a, b) => b?.mount - a?.mount);
      const final = spendsLastMonths.slice(0, 4);
      setConcurrentSpend(final);
    }
  }

  return { monthSpend, concurrentSpend };
};

export default useGraphics;
