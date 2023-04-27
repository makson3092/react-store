import React from "react";
import Card from "../../components/Card";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filterItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(12)] : filterItems).map((item, index) => (
      <Card
        key={index}
        {...item}
        onFavorite={(obj) => onAddFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
      />
    ));
  };

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
              src="react-store/img/btn-remove.svg"
              alt="clear"
            />
          )}
          <img
            width={18}
            height={20}
            src="react-store/img/search.svg"
            alt="Search"
          />
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Пошук..."
          />
        </div>
      </div>
      <div className="store">{renderItems()}</div>
    </div>
  );
}
export default Home;
