import React, { useState, useEffect, useCallback } from "react";

export const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

let logoutTimer;

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const expirationDate = localStorage.getItem("expirationTime");

  const expirationTime = calculateRemainingTime(expirationDate);

  if (expirationTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return { token: storedToken, duration: expirationTime };
};

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpTime = new Date(expirationTime).getTime();

  const remainingTime = adjExpTime - currentTime;
  return remainingTime;
};

const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let intitalToken = tokenData && tokenData.token;

  const [token, setToken] = useState(intitalToken);

  const userIsLoggedIn = token ? true : false;

  const logOutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logOutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logOutHandler, tokenData.duration);
    }
  }, [tokenData, logOutHandler]);

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logOutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
