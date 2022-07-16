import './ExpenseItems.css';
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import { useState } from 'react';

const ExpenseItem = ({ expense }) => {
  const { amount, date } = expense;
  const [title, setTitle] = useState(expense.title);

  const clickHandler = () => {
    setTitle('Updated!');
  };

  return (
    <Card className='expense-item'>
      <ExpenseDate date={date} />
      <section className='expense-item__description'>
        <h2>{title}</h2>
        <p className='expense-item__price'>${amount}</p>
      </section>
      <button onClick={clickHandler}>Change Title</button>
    </Card>
  );
};

export default ExpenseItem;
