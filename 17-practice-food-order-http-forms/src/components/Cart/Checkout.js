import React, { useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isLessThan5Chars = (value) => value.trim().length < 5;

const Checkout = (props) => {
  const [formData, setFormData] = useState(() => {
    return {
      fullName: "",
      street: "",
      postal: "",
      city: "",
    };
  });

  const [inputsErrors, setInputsErrors] = useState({});

  const handleChange = (e) => {
    const { value, name } = e.target;

    const isValidEntry = !isEmpty(value) & !isLessThan5Chars(value);

    if (!isValidEntry) {
      setInputsErrors((old) => ({ ...old, [name]: true }));
    } else setInputsErrors((old) => ({ ...old, [name]: false }));

    setFormData((old) => ({ ...old, [name]: value }));
  };

  const checkoutHandler = (e) => {
    e.preventDefault();
    const allInputsValid = Object.values(inputsErrors).every(
      (value) => value === false
    );
    if (!allInputsValid) {
      console.log("Invalid input");
      return;
    }
    props.onCheckout(formData);
  };

  return (
    <form onSubmit={checkoutHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        {inputsErrors.fullName && (
          <span style={{ color: "red" }}>enter a valid name</span>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input
          type="address"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
        {inputsErrors.street && (
          <span style={{ color: "red" }}>enter a valid street name</span>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="postal"
          id="postal"
          name="postal"
          value={formData.postal}
          onChange={handleChange}
        />
        {inputsErrors.postal && (
          <span style={{ color: "red" }}>enter a valid Postal Code</span>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        {inputsErrors.city && (
          <span style={{ color: "red" }}>enter a valid city name</span>
        )}
      </div>
      <div className={classes.actions}>
        <button
          type="button"
          className={classes.submit}
          onClick={props.onCancel}
        >
          cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
