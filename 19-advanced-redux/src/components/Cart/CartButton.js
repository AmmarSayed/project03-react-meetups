import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceActions } from "../store/us-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQty = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(uiSliceActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQty}</span>
    </button>
  );
};

export default CartButton;
