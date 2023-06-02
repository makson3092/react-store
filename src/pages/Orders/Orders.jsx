import React from "react";
import axios from "axios";

import Card from "../../components/Card";
const API_KEY2 = process.env.REACT_APP_API_KEY2;
function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://${API_KEY2}.mockapi.io/orders`
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setLoading(false);
      } catch (error) {
        console.log("Помилка при запиту заказів");
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="content">
      <div className="header-block">
        <h1>Мої замовлення</h1>
        <div className="search-block"></div>
      </div>
      <div className="store">
        {(isLoading ? [...Array(12)] : orders).map((item, index) => (
          <Card key={index} {...item} loading={isLoading} />
        ))}
      </div>
    </div>
  );
}
export default Orders;
