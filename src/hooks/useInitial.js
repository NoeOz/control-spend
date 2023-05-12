import { useDispatch } from "react-redux";
import useOperations from "../database/useOperations";
import { setSpends } from "../redux/globalState";

const useInitial = () => {
  const { getSpends } = useOperations();
  const dispatch = useDispatch();

  /**
   * The function recovers and sets the spends data if it exists.
   */
  async function recoverDataSpends() {
    const recoverSpends = await getSpends();
    if (recoverSpends != null && recoverSpends != false)
      dispatch(setSpends(recoverSpends?.rows?._array));
  }

  return { recoverDataSpends };
};

export default useInitial;
