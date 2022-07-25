import { Component } from "react"; // for class components
import classes from "./User.module.css";

class User extends Component {
  componentWillUnmount() {
    console.log("Will be unmounted");
  }

  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
