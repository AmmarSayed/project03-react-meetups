import React, { useContext } from 'react';
import { useAuthContext } from '../../store/AuthContext';
import Button from '../UI/Button/Button';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = () => {
  const authCtxt = useAuthContext();
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={authCtxt.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
