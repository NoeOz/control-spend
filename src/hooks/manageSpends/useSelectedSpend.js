import useOperations from "../../database/useOperations";
import { validNumber, validateNonEmptyString } from "../../helpers/validationForm";
import useInitial from "../useInitial";

const useSelectedSpend = () => {
  const { deleteSpend, updateSpend } = useOperations();
  const { recoverDataSpends } = useInitial();

  async function dropSpend(idSpend) {
    const response = await deleteSpend(idSpend);

    if (response) {
      await recoverDataSpends();
      return true;
    } else return false;
  }

  async function editSpend(dataSpend) {
    const response = await updateSpend(dataSpend);
    if (response) {
      await recoverDataSpends();
      return true;
    } else return false;
  }

  function validateSpend(typeValue, value) {
    if (typeValue === "num") return validNumber(value);
    if (typeValue === "str") return validateNonEmptyString(value);
  }

  return { dropSpend, editSpend, validateSpend };
};

export default useSelectedSpend;
