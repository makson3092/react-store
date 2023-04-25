import React from "react";

function Card({ id, onFavorite, onPlus, title, imageUrl, price, favorited }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const handleClick = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
    console.log("Сheck" + isAdded);
  };

  const handleClickFavorire = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };
  // React.useEffect(() => {
  //   console.log("Check change");
  // }, [isAdded]);

  return (
    <div className="card">
      <div className="cardTittle">
        <div className="favorite" onClick={onFavorite}>
          <img
            onClick={handleClickFavorire}
            src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
            alt="Unliked"
          />
        </div>
        <img width={133} height={112} src={imageUrl} alt="store" />
        <h5>{title}</h5>
      </div>
      <div className="cardBottom">
        <div className="cardPrice">
          <span>Вартість:</span>
          <b>{price} грн.</b>
        </div>
        <img
          className="plus"
          onClick={handleClick}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="plus"
        />
        {/* <button className="button">
          <img width={11} height={11} src="/img/plus.svg" alt="plus" />
        </button> */}
      </div>
    </div>
  );
}

export default Card;
