import { useState, useRef, useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const history = useHistory();

  const authCtxt = useContext(AuthContext);

  const API_KEY = "AIzaSyCW5V0lSaziJvgcf4kp9FpVqVOrPIx9-70";

  const signUpURL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";

  const signInURL =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    // We can add validation for the input here

    const authenticate = async (params) => {
      console.log(params);

      const { url, API_KEY, enteredEmail, enteredPassword } = params;
      try {
        const res = await fetch(`${url}${API_KEY}`, {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        setIsLoading(false);

        if (!res.ok) {
          let errorMessage = data?.error?.message || "Authentication Failed!";
          alert(errorMessage);
          throw new Error(errorMessage);
        }

        console.log(data);

        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );

        authCtxt.login(data.idToken, expirationTime.toISOString());
        history.replace("/");
      } catch (error) {
        console.error(error);
        return error;
      }
    };

    if (isLogin) {
      const url = signInURL;
      authenticate({ url, API_KEY, enteredEmail, enteredPassword });
    } else {
      const url = signUpURL;
      authenticate({ url, API_KEY, enteredEmail, enteredPassword });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request ...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
