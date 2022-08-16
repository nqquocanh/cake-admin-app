import React, { useEffect, useState } from "react";
import { getOrdersData } from "../../helpers/firebase";

const sum = (obj, key) =>
  obj.reduce(function (accumulator, curValue) {
    return accumulator + curValue[key];
  }, 0);

const Orders = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const getOrderData = async () => {
      const orders = await getOrdersData();
      setOrderData(orders);
    };
    getOrderData();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title mx-4 mt-4">Orders</h1>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Order Id</th>
                <th scope="col">Customer </th>
                <th scope="col">Order Items</th>
                <th scope="col">Total quantity</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData &&
                orderData.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">{item.id}</th>
                    <th scope="row">
                      <div>
                        <label>Customer:{"\u00A0"}</label>
                        {item.user.name}
                      </div>
                      <div>
                        <span className="text-muted">
                          Phone:{"\u00A0"}
                          {item.user.phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted">
                          Address: {"\u00A0"}
                          {item.user.address}
                        </span>
                      </div>
                    </th>
                    <td>
                      {item.orderedItem.map((item, idx) => (
                        <div className="d-flex" key={idx}>
                          <img
                            src={item.img}
                            className="img-fluid img-thumbnail me-3"
                            style={{ width: 80, height: 80 }}
                            alt={item.title}
                          />
                          <div>
                            <div>
                              <span className="fw-bold">{item.title}</span>:
                            </div>
                            <div className="text-muted">
                              ${item.price} x {item.quantity} = $
                              {item.totalPrice}
                            </div>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="align-middle">
                      {sum(item.orderedItem, "quantity")}
                    </td>
                    <td className="align-middle">
                      ${sum(item.orderedItem, "totalPrice")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
