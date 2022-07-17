import React from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

import { useAuthContext } from './store/AuthContext';

function App() {
  const ctxt = useAuthContext();
  return (
    <>
      <MainHeader />
      <main>
        {!ctxt.isLoggedIn && <Login />}
        {ctxt.isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;
