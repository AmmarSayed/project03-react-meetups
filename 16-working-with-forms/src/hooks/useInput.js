import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  //validate entered name
  const isValidInput = validateValue(enteredValue);
  const hasError = isTouched && !isValidInput;

  // input Handling
  const inputChangeHandler = (e) => {
    const entry = e.target.value;
    setEnteredValue(entry);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const restInput = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValidInput,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    restInput,
  };
};

export default useInput;
