import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import './CourseInput.css';

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  // const alertLebelStyle = {
  //   color: !isValid ? 'red' : 'black',
  // };

  // const alertInput = {
  //   borderColor: !isValid ? 'red' : '',
  //   backgroundColor: !isValid ? 'salmon' : '',
  // };

  const goalInputChangeHandler = event => {
    setEnteredValue(event.target.value);

    if (enteredValue.trim().length === 0) {
      setIsValid(true);
    }
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }

    props.onAddGoal(enteredValue);
    setEnteredValue('');
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={`form-control ${!isValid ? 'invalid' : ''}`}>
        <label>Course Goal</label>
        <input value={enteredValue} type='text' onChange={goalInputChangeHandler} />
      </div>
      <Button type='submit'>Add Goal</Button>
    </form>
  );
};

export default CourseInput;
