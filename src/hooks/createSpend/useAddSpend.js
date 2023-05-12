import { useEffect, useState } from "react";
import useOperations from "../../database/useOperations";
import useInitial from "../useInitial";

const useAddSpend = () => {
  const initialFormAddValues = {
    name: "",
    description: "",
    mount: "",
    dateSpend: { DD: "", MM: "", YYYY: "" },
    typeSpend: "",
  };
  const [formAddSpend, setFormAddSpend] = useState(initialFormAddValues);
  const { pushSpend, updateSpend } = useOperations();
  const { recoverDataSpends } = useInitial();

  useEffect(() => {
    return () => {
      setFormAddSpend(initialFormAddValues);
    };
  }, []);

  /**
   * The function changes the value of a specific key in an object and updates the state of a form.
   * @param key - The key is a string representing the name of a property in an object. In this case,
   * it is used to specify which property in the `formAddSpend` object should be updated with the new
   * `value`.
   * @param value - The value that will be assigned to the specified key in the formAddSpend object.
   */
  function changeSpendValues(key, value) {
    setFormAddSpend({ ...formAddSpend, [key]: value });
  }

  function validateValueForm(key) {
    if (formAddSpend[key] !== initialFormAddValues[key] && !!formAddSpend[key])
      return true;
    else return false;
  }

  function validateForm() {
    const arrayKeysForm = Object.keys(formAddSpend);
    let validatedElements = new Array();
    arrayKeysForm.forEach((keyForm) => {
      validatedElements.push(validateValueForm(keyForm));
    });

    const validation = validatedElements.every((valid) => valid === true);
    return validation;
  }

  async function createSpend(name, description, mount, dateSpend, typeSpend) {
    const response = await pushSpend(
      name,
      description,
      mount,
      dateSpend,
      typeSpend
    );

    if (response) {
      recoverDataSpends();
      return true;
    } else return false;
  }

  function editSpend(id, name, description, mount, dateSpend, typeSpend) {
    const response = updateSpend(id, [
      name,
      description,
      mount,
      dateSpend,
      typeSpend,
    ]);

    if (response) recoverDataSpends();
  }

  return {
    createSpend,
    editSpend,
    initialFormAddValues,
    formAddSpend,
    setFormAddSpend,
    changeSpendValues,
    validateForm,
  };
};

export default useAddSpend;
