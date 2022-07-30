import { useReducer } from "react";

const initalInputState = {
  value: "",
  isTouched: false,
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      return initalInputState;
    case "INPUT":
      return { ...state, value: action.value };
    case "BLUR":
      return { ...state, isTouched: true };

    default:
      return initalInputState;
  }
};

const useInput = (validateValue) => {
  const [inputState, dispatchInput] = useReducer(
    inputReducer,
    initalInputState
  );

  //validate entered name
  const isValidInput = validateValue(inputState.value);
  const hasError = inputState.isTouched && !isValidInput;

  // input Handling
  const inputChangeHandler = (e) => {
    dispatchInput({ type: "INPUT", value: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatchInput({ type: "BLUR" });
  };

  const restInput = () => {
    dispatchInput({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValidInput,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    restInput,
  };
};

export default useInput;
