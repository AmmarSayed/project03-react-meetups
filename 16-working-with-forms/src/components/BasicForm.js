import useInput from "../hooks/useInput";

//validate entered Email
const validateEmail = (emailInput) => {
  const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailInput.match(regexEmail) ? true : false;
};

const isNotEmpty = (val) => val.trim() !== "";

const BasicForm = (props) => {
  //////////////////////
  // Handling first Name input
  //////////////////////
  const {
    value: fNameInputValue,
    isValidInput: validFNameInput,
    hasError: fNameInputHasError,
    inputChangeHandler: fNameChangeHandler,
    inputBlurHandler: fNameBlurHandler,
    restInput: resetFNameInput,
  } = useInput(isNotEmpty);

  //////////////////////
  // Handling last Name input
  //////////////////////
  const {
    value: lNameInputValue,
    isValidInput: validLNameInput,
    hasError: lNameInputHasError,
    inputChangeHandler: lNameChangeHandler,
    inputBlurHandler: lNameBlurHandler,
    restInput: resetLNameInput,
  } = useInput(isNotEmpty);

  //////////////////////
  // Handling email input
  //////////////////////
  const {
    value: emailInputValue,
    isValidInput: validEmailInput,
    hasError: emailInputHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    restInput: resetEmailInput,
  } = useInput(validateEmail);

  // Validate the form
  const formIsValid = validFNameInput && validLNameInput && validEmailInput;

  //////////////////////
  // Form submit handling
  //////////////////////
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) return;
    resetFNameInput();
    resetLNameInput();
    resetEmailInput();
  };

  //////////////////////
  // Styling inputs
  //////////////////////
  const fNameInputClasses = fNameInputHasError
    ? "form-control invalid"
    : "form-control";

  const lNameInputClasses = lNameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  //////////////////////
  // Component
  //////////////////////
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={fNameInputClasses}>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            value={fNameInputValue}
            onBlur={fNameBlurHandler}
            onChange={fNameChangeHandler}
          />
          {fNameInputHasError && (
            <span className="error-text">Please Enter a valid Name!</span>
          )}
        </div>
        <div className={lNameInputClasses}>
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            value={lNameInputValue}
            onBlur={lNameBlurHandler}
            onChange={lNameChangeHandler}
          />
          {lNameInputHasError && (
            <span className="error-text">Please Enter a valid Name!</span>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={emailInputValue}
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
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

export default BasicForm;
