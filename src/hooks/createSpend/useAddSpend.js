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
    if (key === "mount") {
      if (validateNumber(value))
        setFormAddSpend({ ...formAddSpend, [key]: value });
    } else setFormAddSpend({ ...formAddSpend, [key]: value });
  }

  
  /**
   * The function checks if a given value is a valid number greater than zero.
   * @param value - The value parameter is a variable that represents a number that needs to be
   * validated.
   * @returns The function `validateNumber` returns a boolean value. It returns `true` if the input
   * `value` is an empty string, or if it is a number greater than 0 and not NaN. It returns `false`
   * otherwise.
   */
  function validateNumber(value) {
    if (value === "") return true;
    else return value > 0 && !isNaN(value);
  }

  /**
   * The function checks if a value in a form has been changed and is not empty.
   * @param key - The key parameter is a string representing the name of a property in an object. It is
   * used to access the value of a specific property in the formAddSpend and initialFormAddValues
   * objects.
   * @returns a boolean value (true or false) depending on whether the value of the specified key in
   * the formAddSpend object is different from the initialFormAddValues object and is not empty.
   */
  function validateValueForm(key) {
    if (formAddSpend[key] !== initialFormAddValues[key] && !!formAddSpend[key])
      return true;
    else return false;
  }

  /**
   * The function validates all elements in a form and returns a boolean indicating if all elements are
   * valid.
   * @returns a boolean value indicating whether all the elements in the form have been validated
   * successfully or not.
   */
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
