function Drawer({ onClose, onRemove, items = [] }) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2>
          Кошик
          <img
            onClick={onClose}
            className="removeBtn"
            src="react-store/img/btn-remove.svg"
            alt="remove"
          />
        </h2>
        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((obj) => (
                <div className="cartItem">
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
                    src="react-store/img/btn-remove.svg"
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
              <button className="greenButton">
                Оформити замовлення{" "}
                <img src="react-store/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <div className="cartEmpty">
            <img
              width={120}
              height={120}
              src="react-store/img/empty-cart.jpg"
              alt="empty"
            />
            <h2>Кошик пустий</h2>
            <p>Додайте хоть один товар , щоб зробити замовлення</p>
            <button onClick={onClose} className="greenButton">
              <img src="react-store/img/arrow.svg" alt="arrow " />
              Повернутись назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
