import { useDispatch } from "react-redux";
import useOperations from "../database/useOperations";
import { setSpends } from "../redux/globalState";
import { welcomeMessage } from "../constants/welcome";

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

  function dayMemento() {
    var fecha = new Date();
    var hora = fecha.getHours();
    var mensaje;

    if (hora >= 6 && hora < 12) {
      mensaje = welcomeMessage.title[0];
    } else if (hora >= 12 && hora < 19) {
      mensaje = welcomeMessage.title[1];
    } else {
      mensaje = welcomeMessage.title[2];
    }

    return mensaje;
  }

  return { recoverDataSpends, dayMemento };
};

export default useInitial;
