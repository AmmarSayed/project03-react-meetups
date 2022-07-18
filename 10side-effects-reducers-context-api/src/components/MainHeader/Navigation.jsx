import React from 'react';
import { useAuthContext } from '../../store/AuthContext';
import classes from './Navigation.module.css';

function Navigation() {
  const ctxt = useAuthContext();

  return (
    <nav className={classes.nav}>
      <ul>
        {ctxt.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctxt.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctxt.isLoggedIn && (
          <li>
            <button type="button" onClick={ctxt.onLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
