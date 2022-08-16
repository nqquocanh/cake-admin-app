import { useParams, useNavigate } from "react-router-dom";
import { getProductsData } from "../../helpers/firebase";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateProductById } from "../../helpers/firebase";

const cats = ["cake", "gato", "bread"];

export const ProductDetail = () => {
  const [productData, setProductData] = useState({
    id: null,
    title: null,
    description: null,
    price: null,
    img: null,
    category: cats[0],
  });

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getProductData = async () => {
      const prods = await getProductsData();
      const productById = prods.find((prod) => prod.id === id);
      setProductData(productById);
    };
    getProductData();
  }, [id]);

  const saveProduct = async (e) => {
    e.preventDefault();

    const response = await updateProductById(productData);
    alert(response.message);
    navigate("/products");
    if (response.status) {
    }
    return;
  };
  return (
    <div className="container">
      {productData && (
        <div className="card">
          <h1 className="card-title">{productData?.title}</h1>
          <div className="card-body">
            <form onSubmit={saveProduct}>
              <div className="row">
                <div className="col-lg-6 col-sm-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="title">
                      Title
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="title"
                      id="title"
                      value={productData.title ? productData.title : ""}
                      onChange={(e) =>
                        setProductData((prevState) => ({
                          ...prevState,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="price">
                      Price
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      name="price"
                      id="price"
                      value={productData.price ? productData.price : ""}
                      onChange={(e) =>
                        setProductData((prevState) => ({
                          ...prevState,
                          price: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="img">
                      Image
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="img"
                      id="img"
                      value={productData.img ? productData.img : ""}
                      onChange={(e) =>
                        setProductData((prevState) => ({
                          ...prevState,
                          img: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="category">
                      Category
                    </label>
                    <select
                      className="form-control"
                      id="category"
                      name="category"
                      value={productData.category}
                      onChange={(e) =>
                        setProductData((prevState) => ({
                          ...prevState,
                          category: e.target.value,
                        }))
                      }
                    >
                      {cats &&
                        cats.map((cat, index) => (
                          <option value={cat} key={index}>
                            {cat.toUpperCase()}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12 col-sm-12">
                  <div className="form-group">
                    <label className="form-label" htmlFor="description">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      rows="5"
                      id="description"
                      name="description"
                      onChange={(e) =>
                        setProductData((prevState) => ({
                          ...prevState,
                          description: e.target.value,
                        }))
                      }
                      value={
                        productData.description ? productData.description : ""
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-end">
                <Link to="/products">
                  <button className="btn btn-warning me-3">Back</button>
                </Link>
                <button className="btn btn-primary ">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
