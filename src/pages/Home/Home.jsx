import Card from "../../components/Card";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddFavorite,
  onAddToCart,
}) {
  return (
    <div className="content">
      <div className="header-block">
        <h1>
          {searchValue ? `Пошук по запросу: "${searchValue}"` : "Всі товари"}
        </h1>
        <div className="search-block">
          {searchValue && (
            <img
              className="clear"
              onClick={() => setSearchValue("")}
              src="/img/btn-remove.svg"
              alt="clear"
            />
          )}
          <img width={18} height={20} src="/img/search.svg" alt="Search" />
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Пошук..."
          />
        </div>
      </div>
      <div className="store">
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item) => (
            <Card
              key={item.title}
              // title={item.title}
              // price={item.price}
              // imageUrl={item.imageUrl}
              {...item}
              onFavorite={(obj) => onAddFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
      </div>
    </div>
  );
}
export default Home;
