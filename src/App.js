import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer/";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [setOpen, setCartOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // fetch("https://64416069792fe886a8a5f9d8.mockapi.io/items")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });
    async function fetchData() {
      setLoading(true);
      const cartResponse = await axios.get(
        "https://64416069792fe886a8a5f9d8.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get(
        "https://64469ac9ee791e1e29042595.mockapi.io/favorites"
      );
      const itemsResponse = await axios.get(
        "https://64416069792fe886a8a5f9d8.mockapi.io/items"
      );

      setLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://64416069792fe886a8a5f9d8.mockapi.io/cart/${obj.id}`
        );
        // setCartItems([...cartItems, obj]);
        // setCartItems((prev) => [...prev, obj]);
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post("https://64416069792fe886a8a5f9d8.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {}
  };

  const onRemoveItemCart = (id) => {
    console.log(id);
    axios.delete(`https://64416069792fe886a8a5f9d8.mockapi.io/cart/${id}`);
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };

  const onAddFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://64469ac9ee791e1e29042595.mockapi.io/favorites/${obj.id}`
        );
        // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://64469ac9ee791e1e29042595.mockapi.io/favorites",
          obj
        );
        // setCartItems([...cartItems, obj]);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.log("Не можливо добавити в вибране");
    }
  };

  const onChangeSearchInput = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper">
      {setOpen && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={onRemoveItemCart}
        />
      )}
      <Header onClickCart={() => setCartOpen(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddFavorite={onAddFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddFavorite={onAddFavorite} />
          }
        />
        <Route path="*" />
      </Routes>
    </div>
  );
}

export default App;
