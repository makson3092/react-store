import { NavLink } from "react-router-dom";

function Header(props) {
  return (
    <header>
      <NavLink to="/">
        <div className="headerLeft">
          <img width={90} height={55} src="/img/logo.png" alt="logo" />
          <div className="headerInfo">
            <h2>React Store</h2>
            <p>Магазин різних асортиментів</p>
          </div>
        </div>
      </NavLink>
      <ul className="headerRight">
        <li onClick={props.onClickCart}>
          <img width={18} height={18} src="/img/shopping.png" alt="кошик" />
          <span>1050 грн.</span>
        </li>
        <li>
          <NavLink to="/favorites">
            <img width={18} height={18} src="/img/heart.svg" alt="закладки" />
          </NavLink>
        </li>
        <li>
          <img width={18} height={18} src="/img/user.svg" alt="користувач" />
        </li>
      </ul>
    </header>
  );
}
export default Header;
