import React, { useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useCartContext } from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [buttonIshighlighted, setButtonIsHighlighted] = useState(false);
  const cartCtx = useCartContext();

  const { items } = cartCtx;

  const noOfCartItems = items.reduce((prevVal, item) => {
    return prevVal + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${
    buttonIshighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonIsHighlighted(true);
    const timer = setTimeout(() => setButtonIsHighlighted(false), 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
