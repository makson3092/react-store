import Card from "../../components/Card";

function Favorites({ items, onAddFavorite }) {
  return (
    <div className="content">
      <div className="header-block">
        <h1>Мої закладки</h1>
        <div className="search-block"></div>
      </div>
      <div className="store">
        {items.map((item) => (
          <Card
            key={item.title}
            // title={item.title}
            // price={item.price}
            // imageUrl={item.imageUrl}
            {...item}
            favorited={true}
            onFavorite={onAddFavorite}
          />
        ))}
        {/* {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item) => (
            <Card
              key={item.title}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={(obj) => onAddFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))} */}
      </div>
    </div>
  );
}
export default Favorites;
