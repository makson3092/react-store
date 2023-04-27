import React from "react";
import AppContext from "../contex";

const Info = ({ title, image, description }) => {
  const { setCartOpen } = React.useContext(AppContext);
  return (
    <div className="cartEmpty">
      <img width={120} src={image} alt="empty" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => setCartOpen(false)} className="greenButton">
        <img src="/react-store/img/arrow.svg" alt="arrow " />
        Повернутись назад
      </button>
    </div>
  );
};

export default Info;
