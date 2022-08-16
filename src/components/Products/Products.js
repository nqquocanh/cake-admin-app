import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsData } from "../../helpers/firebase";
import { deleteProductById } from "../../helpers/firebase";

const Products = () => {
  const [prodData, setProdData] = useState([]);
  useEffect(() => {
    const getProductData = async () => {
      const prods = await getProductsData();
      setProdData(prods);
    };
    getProductData();
  }, []);

  const handleDelete = async (prod) => {
    const response = await deleteProductById(prod.id);
    alert(response.message);
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title mx-4 mt-4">Products</h1>
        <Link to="/add-product">
          <button className=" btn btn-success mx-4 my-4">
            Add New Product
          </button>
        </Link>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Image</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {prodData &&
                prodData.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>
                      <img
                        className="img-fluid img-thumbnail "
                        style={{ width: 90, height: 90 }}
                        src={item.img}
                        alt="product img"
                      />
                    </td>
                    <td>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/products/${item.id}`}
                      >
                        <button className="btn btn-secondary mt-4">Edit</button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger mt-4"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
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

export default Products;
