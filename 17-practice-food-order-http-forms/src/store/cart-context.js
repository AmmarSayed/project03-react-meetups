import React, { useContext, useReducer } from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

// The below is an easy way to use the context
// custom hook to use the AuthContext
// so we won't have to import the useContext on the other components
export const useCartContext = () => {
  return useContext(CartContext);
};

const initialCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      const exCartItemIndex = state.items.findIndex(
        (exItem) => exItem.id === action.item.id
      );
      const existItem = state.items[exCartItemIndex];

      let updatedItems;

      if (existItem) {
        const updatedItem = {
          ...existItem,
          amount: existItem.amount + action.item.amount,
        };

        updatedItems = [...state.items];

        updatedItems[exCartItemIndex] = updatedItem;
      } else {
        updatedItems = [...state.items, action.item];
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    case "REMOVE": {
      const existingCartItemIndex = state.items.findIndex(
        (exitem) => exitem.id === action.id
      );

      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;
      let updatedItems;

      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((it) => it.id !== action.id);
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }
    case "CLEAR": {
      return initialCartState;
    }
    default:
      return state;
  }
};

// Context provider to wrap the components

export const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
