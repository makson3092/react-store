import React from "react";
import ContentLoader from "react-content-loader";

function Card({
  id,
  onFavorite,
  onPlus,
  title,
  imageUrl,
  price,
  favorited = false,
  added = false,
  loading = false,
}) {
  const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const handleClick = () => {
    onPlus({ id, title, imageUrl, price });
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
              src={
                isAdded
                  ? "react-store/img/btn-checked.svg"
                  : "react-store/img/btn-plus.svg"
              }
              alt="plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
