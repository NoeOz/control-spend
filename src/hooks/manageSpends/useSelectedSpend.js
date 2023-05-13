import { useDispatch, useSelector } from "react-redux";
import useOperations from "../../database/useOperations";
import useInitial from "../useInitial";

const useSelectedSpend = () => {
  /* const globalState = useSelector((state) => state.globalState);
  const dispatch = useDispatch(); */
  const { deleteSpend } = useOperations();
  const { recoverDataSpends } = useInitial();

  async function dropSpend(idSpend) {
    const response = await deleteSpend(idSpend);

    if (response) {
      recoverDataSpends();
      return true;
    } else return false;
  }

  return { dropSpend };
};

export default useSelectedSpend;
