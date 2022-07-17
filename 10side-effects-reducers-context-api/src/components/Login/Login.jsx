import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/AuthContext';

// email reducer function
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }

  return { value: '', isValid: false };
};

// password reducer function
const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  return { value: '', isValid: false };
};

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  // use effect will run after the state updates
  // we validate the email and password state
  useEffect(() => {
    const timeoutReference = setTimeout(() => {
      // delay checking for validity, so we check after 1 second
      // check if the user stopped typing
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      // Cleanup function will clear the timeout on each render
      // clearing the timeout after each key strock, to avoid sending unnecessary traffic
      clearTimeout(timeoutReference);
    };
    // run the use effect whever the validity changes, not the entire state
  }, [emailState.isValid, passwordState.isValid]);

  const authCtxt = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    const action = { type: 'USER_INPUT', val: event.target.value };
    dispatchEmail(action);

    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    const action = { type: 'USER_INPUT', val: event.target.value };
    dispatchPassword(action);

    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  // const validateEmailHandler = () => {
  //   // setEmailIsValid(emailState.isValid)
  //   const action = { type: 'INPUT_BLUR' }
  //   dispatchEmail(action)
  // }

  // const validatePasswordHandler = () => {
  //   setPasswordIsValid(enteredPassword.trim().length > 6)
  // }

  const submitHandler = (event) => {
    event.preventDefault();
    authCtxt.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={emailState.value}
            onChange={emailChangeHandler}
            // onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={passwordState.value}
            onChange={passwordChangeHandler}
            // onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
