import './ExpenseItems.css';
import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';

const ExpenseItem = props => {
  const { title, amount, date } = props.expense;

  return (
    <Card className='expense-item'>
      <ExpenseDate date={date} />
      <section className='expense-item__description'>
        <h2>{title}</h2>
        <p className='expense-item__price'>${amount}</p>
      </section>
    </Card>
  );
};

export default ExpenseItem;
