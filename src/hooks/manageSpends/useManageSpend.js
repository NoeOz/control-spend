import { useSelector } from "react-redux";

const useManageSpend = () => {
  const globalState = useSelector((state) => state.globalState);
  //today date
  const d = new Date();
  const month = d.getMonth() + 1;

  function handleGetSpendsThisMonth() {
    const globalSpends = globalState.spends;
    let tempData = [];
    if (globalSpends?.length > 0) {
      globalSpends.forEach((spend) => {
        if (
          !!spend?.id &&
          spend?.typeSpend !== "Suscripción" &&
          spend?.typeSpend !== "Fijo"
        ) {
          const fixMonthSpend = parseInt(spend?.dateSpend.split("/")[1]);
          if (parseInt(fixMonthSpend) === month) {
            tempData.push(spend);
          }
        }
      });
      tempData.reverse();
      return tempData;
    }
  }

  function getThisMonthSubs() {
    const globalSpends = globalState.spends;
    let tempSubs = [];
    if (globalSpends?.length > 0) {
      globalSpends.forEach((spend) => {
        if (
          (!!spend?.dateSpend &&
            !!spend?.mount &&
            spend?.typeSpend === "Suscripción") ||
          spend?.typeSpend === "Fijo"
        ) {
          tempSubs.push(spend);
        }
      });
      tempSubs.reverse();
    }
    return tempSubs;
  }

  function getAllSpends() {
    //todo: ordenar por fecha / monto
    return globalState.spends;
  }

  return {
    getThisMonthSubs,
    handleGetSpendsThisMonth,
    getAllSpends,
  };
};

export default useManageSpend;
