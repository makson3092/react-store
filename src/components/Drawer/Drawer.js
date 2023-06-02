import React from "react";
import axios from "axios";

import Info from "../Info";
import AppContext from "../contex";

const API_KEY1 = process.env.REACT_APP_API_KEY1;
const API_KEY2 = process.env.REACT_APP_API_KEY2;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `https://${API_KEY2}.mockapi.io/orders`,
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://${API_KEY1}.mockapi.io/cart/${item.id}`);
        await delay(1000);
      }
    } catch (error) {
      console.log("Замовлення не можливо!");
    }
    setIsLoading(false);
  };

  return (
    <div className={`overlay  ${opened ? "overlayVisible" : ""} `}>
      <div className="drawer">
        <h2>
          Кошик
          <img
            onClick={onClose}
            className="removeBtn"
            src="/react-store/img/btn-remove.svg"
            alt="remove"
          />
        </h2>
        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="cart">
                    <p>{obj.title}</p>
                    <b>{obj.price} грн.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/react-store/img/btn-remove.svg"
                    alt="remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Всього:</span>
                  <div></div>
                  <b>{totalPrice} грн.</b>
                </li>
                <li>
                  <span>Податок 2%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 2} грн.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформити замовлення
                <img src="/react-store/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Замовлення оформлено!" : "Кошик пустий"}
            description={
              isOrderComplete
                ? `Ваше замовлення ${orderId} незабаром буде передано кур'єрській доставці`
                : "Додайте хоть один товар , щоб зробити замовлення"
            }
            image={
              isOrderComplete
                ? "/react-store/img/complete-order.jpg"
                : "/react-store/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
