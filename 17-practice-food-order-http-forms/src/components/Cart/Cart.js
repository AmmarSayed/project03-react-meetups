import React, { useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useCartContext } from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const cartCtx = useCartContext();
  const [isCheckout, setIsCheckout] = useState(false);

  const ttlAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasImtes = cartCtx.items.length > 0;

  const cartItemRemoveHanlder = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => setIsCheckout(true);

  const submitOrderHandler = (userData) => {
    console.log(userData);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHanlder.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasImtes && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{ttlAmount}</span>
      </div>

      {isCheckout && (
        <Checkout
          onCancel={props.onCloseCart}
          onCheckout={submitOrderHandler}
        />
      )}

      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
