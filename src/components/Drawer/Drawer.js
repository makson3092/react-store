import React from "react";
import axios from "axios";

import AppContext from "../contex";
import Info from "../Info";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://64469ac9ee791e1e29042595.mockapi.io/orders",
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://64416069792fe886a8a5f9d8.mockapi.io/cart/${item.id}`
        );
        await delay(1000);
      }
    } catch (error) {
      console.log("Замовлення не можливо!");
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
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
                  <b>6 932 грн.</b>
                </li>
                <li>
                  <span>Податок 1%:</span>
                  <div></div>
                  <b>693,2 грн.</b>
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
          /* <div className="cartEmpty">
            <img
              width={120}
              height={120}
              src="/react-store/img/empty-cart.jpg"
              alt="empty"
            />
            <h2>Кошик пустий</h2>
            <p>Додайте хоть один товар , щоб зробити замовлення</p>
            <button onClick={onClose} className="greenButton">
              <img src="/react-store/img/arrow.svg" alt="arrow" />
              Повернутись назад
            </button>
          </div> */
        )}
      </div>
    </div>
  );
}

export default Drawer;
