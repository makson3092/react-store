import React from "react";
import { NavLink } from "react-router-dom";

import { useCart } from "../../hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header>
      <NavLink to="/">
        <div className="headerLeft">
          <img
            width={90}
            height={55}
            src="/react-store/img/logo.png"
            alt="logo"
          />
          <div className="headerInfo">
            <h2>React Store</h2>
            <p>Магазин різних асортиментів</p>
          </div>
        </div>
      </NavLink>
      <ul className="headerRight">
        <li onClick={props.onClickCart}>
          <img
            width={18}
            height={18}
            src="/react-store/img/shopping.png"
            alt="кошик"
          />
          <span>{totalPrice ? `${totalPrice} грн.` : "0 грн."}</span>
        </li>
        <li>
          <NavLink to="/favorites">
            <img
              width={18}
              height={18}
              src="/react-store/img/heart.svg"
              alt="закладки"
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders">
            <img
              width={18}
              height={18}
              src="/react-store/img/user.svg"
              alt="користувач"
            />
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
export default Header;
