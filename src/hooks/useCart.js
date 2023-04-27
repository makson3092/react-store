import React from "react";
import AppContext from "../components/contex";

export const useCart = () => {
  const { cartItems, setCartItem } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return { cartItems, setCartItem, totalPrice };
};
