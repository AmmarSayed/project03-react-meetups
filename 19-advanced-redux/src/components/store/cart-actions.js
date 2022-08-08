import { cartActions } from "./cart-slice";
import { uiSliceActions } from "./us-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    try {
      const res = await fetch(
        "https://react-http-f0957-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Error sending cart data!");
      }

      dispatch(
        uiSliceActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        status: "pending",
        title: "Fetching data...",
        message: "Fetching cart data!",
      })
    );

    try {
      const res = await fetch(
        "https://react-http-f0957-default-rtdb.firebaseio.com/cart.json"
      );

      if (!res.ok) {
        throw new Error("Error sending cart data!");
      }
      dispatch(
        uiSliceActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Cart data fetched successfully!",
        })
      );

      const data = await res.json();

      dispatch(
        cartActions.replaceCartItems({
          items: data?.items || [],
          totalQuantity: data?.totalQuantity || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiSliceActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
  };
};
