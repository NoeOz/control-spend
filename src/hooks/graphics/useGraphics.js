import { useSelector } from "react-redux";

const useGraphics = () => {
  const globalState = useSelector((state) => state.globalState);
  //today date
  const d = new Date();
  const month = d.getMonth() + 1;

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
    }

    return thisMonthSpend;
  }

  function getMoreOnSpends() {
    const globalSpends = globalState.spends;
    let spendsLastMonths = [];

    if (globalSpends?.length > 0) {
      globalSpends.forEach((spend) => {
        if (!!spend?.dateSpend && !!spend?.mount) {
          const fixMonthSpend = parseInt(spend?.dateSpend.split("/")[1]);
          if (fixMonthSpend <= month && fixMonthSpend >= month - 2)
            spendsLastMonths.push(spend);
        }
      });
    }

    spendsLastMonths.sort((a, b) => b?.mount - a?.mount);
    return spendsLastMonths;
  }

  return { getThisMonthSpends, getMoreOnSpends };
};

export default useGraphics;
