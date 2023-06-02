import React from "react";
import ContentLoader from "react-content-loader";

import AppContext from "../contex";

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);

  const [count] = React.useState(0);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const itemObj = {
    id,
    parentId: id,
    title,
    imageUrl,
    count,
    price,
  };
  const handleClick = () => {
    onPlus(itemObj);
  };

  const handleClickFavorire = () => {
    onFavorite(itemObj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card">
      {loading ? (
        <ContentLoader
          speed={2}
          width={160}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="160" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="160" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className="cardTittle">
            {onFavorite && (
              <div className="favorite" onClick={onFavorite}>
                <img
                  onClick={handleClickFavorire}
                  src={
                    isFavorite
                      ? "react-store/img/liked.svg"
                      : "react-store/img/unliked.svg"
                  }
                  alt="Unliked"
                />
              </div>
            )}
            <img width={133} height={112} src={imageUrl} alt="store" />
            <h5>{title}</h5>
          </div>
          <div className="cardBottom">
            <div className="cardPrice">
              <span>Вартість:</span>
              <b>{price} грн.</b>
            </div>
            {onPlus && (
              <img
                className="plus"
                onClick={handleClick}
                src={
                  isItemAdded(id)
                    ? "react-store/img/btn-checked.svg"
                    : "react-store/img/btn-plus.svg"
                }
                alt="plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
