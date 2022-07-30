import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const [err, setErr] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredName, setEnteredName] = useState("");

  const nameInputRef = useRef("");
  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
    setEnteredNameTouched(true);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setEnteredNameTouched(true);

    if (enteredName.trim() === "") {
      setErr(true);
      return;
    }
    setErr(false);
    console.log(enteredName);
    setEnteredName("");
  };

  const nameInputIsInvalid = enteredNameTouched && err;

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
      </div>
      {nameInputIsInvalid && (
        <span className="error-text">Please enter valid a name</span>
      )}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
