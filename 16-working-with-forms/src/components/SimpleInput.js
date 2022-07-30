import useInput from "../hooks/useInput";

const SimpleInput = (props) => {
  const {
    value: nameInputValue,
    isValidInput: validNameInput,
    hasError: nameInputHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    restInput: resetNameInput,
  } = useInput((val) => val.trim() !== "");

  //validate entered Email
  const validateEmail = (emailInput) => {
    const regexEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailInput.match(regexEmail) ? true : false;
  };

  const {
    value: emailInputValue,
    isValidInput: validEmailInput,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    restInput: resetEmailInput,
  } = useInput(validateEmail);

  // Validate the form
  const formIsValid = validNameInput && validEmailInput;

  //////////////////////
  // Form submit handling
  //////////////////////
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) return;
    resetNameInput();
    resetEmailInput();
  };

  //////////////////////
  // Styling the inputs
  //////////////////////
  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={nameInputValue}
        />
        {nameInputHasError && (
          <span className="error-text">Please Enter a valid name!</span>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={emailInputValue}
        />
        {emailInputHasError && (
          <span className="error-text">Please Enter a valid email!</span>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
