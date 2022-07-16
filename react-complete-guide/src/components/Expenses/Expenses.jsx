import './Expenses.css';
import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import ExpensesFilter from '../ExpensesFilter/ExpensesFilter';
import { useState } from 'react';

const Expenses = ({ expenses }) => {
  const [selectedYear, setSelectedYear] = useState('2020');

  if (selectedYear) console.log(selectedYear);

  const changeYearHandler = year => setSelectedYear(year);

  return (
    <Card className='expenses'>
      <ExpensesFilter onYearChange={changeYearHandler} selected={selectedYear} />

      <ExpenseItem expense={expenses[0]} />
      <ExpenseItem expense={expenses[1]} />
      <ExpenseItem expense={expenses[2]} />
      <ExpenseItem expense={expenses[3]} />
    </Card>
  );
};

export default Expenses;
