import React from "react";
import Card from "../../components/Card";
import AppContext from "../../components/contex";

function Favorites({ onAddFavorite }) {
  const { favorites } = React.useContext(AppContext);
  return (
    <div className="content">
      <div className="header-block">
        <h1>Мої закладки</h1>
        <div className="search-block"></div>
      </div>
      <div className="store">
        {favorites.map((item, index) => (
          <Card
            key={index}
            {...item}
            favorited={true}
            onFavorite={onAddFavorite}
          />
        ))}
      </div>
    </div>
  );
}
export default Favorites;
