import useOperations from "../../database/useOperations";
import useInitial from "../useInitial";

const useSelectedSpend = () => {
  const { deleteSpend } = useOperations();
  const { recoverDataSpends } = useInitial();

  async function dropSpend(idSpend) {
    const response = await deleteSpend(idSpend);

    if (response) {
      await recoverDataSpends();
      return true;
    } else return false;
  }

  async function editSpend(idSpend) {}

  return { dropSpend, editSpend };
};

export default useSelectedSpend;
