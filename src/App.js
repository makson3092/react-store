import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer/";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./components/contex";
import Orders from "./pages/Orders";

const API_KEY1 = import.meta.env.VITE_API_KEY1;
const API_KEY2 = process.env.REACT_APP_API_KEY2;
function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState("");
  const [setOpen, setCartOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get(`https://${API_KEY1}.mockapi.io/cart`),
            axios.get(`https://${API_KEY2}.mockapi.io/favorites`),
            axios.get(`https://${API_KEY1}.mockapi.io/items`),
          ]);
        setLoading(true);
        setLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.log("Помилка при запросі даних");
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://${API_KEY1}.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          `https://${API_KEY1}.mockapi.io/cart`,
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.log("Помилка при добавлені в корзину");
    }
  };

  const onRemoveItemCart = (id) => {
    try {
      axios.delete(`https://${API_KEY1}.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      console.log("Помилка при видалені з корзини");
    }
  };

  const onAddFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://${API_KEY2}.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          `https://${API_KEY2}.mockapi.io/favorites`,
          obj
        );
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToCart,
        onAddFavorite,
        setCartOpen,
        setCartItems,
      }}
    >
      <div className="wrapper">
        <Drawer
          onClose={() => setCartOpen(false)}
          onRemove={onRemoveItemCart}
          items={cartItems}
          opened={setOpen}
        />
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
          <Route path="favorites" element={<Favorites />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
