import { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";
import { AuthContext } from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const authCtxt = useContext(AuthContext);
  const history = useHistory();
  const newPasswordInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const newPassword = newPasswordInputRef.current.value;
    const changePassword = async () => {
      try {
        const res = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCW5V0lSaziJvgcf4kp9FpVqVOrPIx9-70",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: authCtxt.token,
              password: newPassword,
              returnSecureToken: true,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error(res);
        }
        const data = await res.json();
        console.log(data);
        history.replace("/");
      } catch (error) {
        console.error(error);
      }
    };

    changePassword();
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
