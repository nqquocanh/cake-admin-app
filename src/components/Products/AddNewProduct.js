import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cats = ["cake", "gato", "bread"];
const isEmpty = (value) => value.trim() === "";

const submitProduct = async (newProduct) => {
  const response = await fetch(
    "https://cake-app-8ff1d-default-rtdb.asia-southeast1.firebasedatabase.app/Products.json",
    {
      method: "POST",
      body: JSON.stringify(newProduct),
    }
  );
  if (response.ok) {
    alert("Update successful");
  }
};

const AddNewProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [category, setCategory] = useState(cats[0]);
  const [productFormValidity, setProductFormValidity] = useState({
    title: true,
    price: true,
    img: true,
    description: true,
  });

  const handleAddProducts = async (e) => {
    e.preventDefault();

    const enteredTitleIsValid = !isEmpty(title);
    const enteredPriceIsValid = !isEmpty(price);
    const enteredImgIsValid = !isEmpty(img);
    const enteredDescriptionIsValid = !isEmpty(description);

    setProductFormValidity({
      title: enteredTitleIsValid,
      price: enteredPriceIsValid,
      img: enteredImgIsValid,
      description: enteredDescriptionIsValid,
    });

    const productFormValid =
      enteredTitleIsValid &&
      enteredPriceIsValid &&
      enteredDescriptionIsValid &&
      enteredImgIsValid;

    if (!productFormValid) return;

    if (productFormValid) {
      await submitProduct({ title, price, img, description, category });
      navigate("../../products");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleAddProducts}>
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
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                  {!productFormValidity.title && (
                    <p className="text-danger">Please enter title</p>
                  )}
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
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                  {!productFormValidity.price && (
                    <p className="text-danger">Please enter Price</p>
                  )}
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
                    id="file"
                    onChange={(e) => setImg(e.target.value)}
                    value={img}
                  />
                  {!productFormValidity.img && (
                    <p className="text-danger">Please enter Image</p>
                  )}
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
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
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
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                  {!productFormValidity.description && (
                    <p className="text-danger">Please enter Description</p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3 text-end">
              <button className="btn btn-primary ">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
