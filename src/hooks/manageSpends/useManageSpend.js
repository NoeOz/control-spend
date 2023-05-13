import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useManageSpend = ({ focusScreen }) => {
  const globalState = useSelector((state) => state.globalState);
  //today date
  const d = new Date();
  const month = d.getMonth() + 1;
  //all lists
  const [currentSubs, setCurrentSubs] = useState([]);
  const [thisMonthSpends, setThisMonthSpends] = useState([]);
  const [allSpends, setAllSpends] = useState([]);

  useEffect(() => {
    handleGetSpendsThisMonth();
    getThisMonthSubs();
    getAllSpends();
    return () => {
      cleanStates();
    };
  }, [focusScreen, globalState]);

  function cleanStates() {
    setCurrentSubs([]);
    setThisMonthSpends([]);
    setAllSpends([]);
  }

  function handleGetSpendsThisMonth() {
    const globalSpends = globalState.spends;
    let tempData = [];
    if (globalSpends?.length > 0) {
      globalSpends.forEach((spend) => {
        if (!!spend?.id) {
          const fixMonthSpend = parseInt(spend?.dateSpend.split("/")[1]);
          const found = thisMonthSpends.findIndex(
            (element) => element.id === spend.id
          );
          if (parseInt(fixMonthSpend) === month && found === -1) {
            tempData.push(spend);
          }
        }
      });
      tempData.reverse();
      setThisMonthSpends(tempData);
    }
  }

  function getThisMonthSubs() {
    const globalSpends = globalState.spends;
    let tempSubs = [];
    if (globalSpends?.length > 0) {
      globalSpends.forEach((spend) => {
        if (
          !!spend?.dateSpend &&
          !!spend?.mount &&
          spend?.typeSpend === "Suscripción"
        ) {
          tempSubs.push(spend);
        }
      });
      tempSubs.reverse();
    }
    setCurrentSubs(tempSubs);
  }

  function getAllSpends() {
    setAllSpends(globalState.spends);
  }

  return {
    currentSubs,
    thisMonthSpends,
    allSpends,
    cleanStates,
  };
};

export default useManageSpend;
