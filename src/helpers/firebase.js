import { initializeApp } from "firebase/app";
import { getDatabase, ref, remove, set } from "firebase/database";

const firebaseConfig = {
  databaseURL:
    "https://cake-app-8ff1d-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

export const deleteProductById = async (id) => {
  const db = getDatabase(app);
  try {
    await remove(ref(db, "/Products/" + id));
    return { status: true, message: "Delete product success" };
  } catch (err) {
    return { status: false, message: err.message };
  }
};

export const updateProductById = async (product) => {
  if (!product) return;
  const db = getDatabase(app);
  try {
    await set(ref(db, "/Products/" + product.id), {
      title: product.title,
      price: product.price,
      img: product.img,
      description: product.description,
      category: product.category,
    });
    return { status: true, message: "Update product success!", data: product };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

export const getOrdersData = async () => {
  const response = await fetch(
    "https://cake-app-8ff1d-default-rtdb.asia-southeast1.firebasedatabase.app/Orders.json"
  );
  const data = await response.json();
  const orders = Object.keys(data).map((order) => ({
    id: order,
    ...data[order],
  }));
  return orders;
};

export const getProductsData = async () => {
  const response = await fetch(
    "https://cake-app-8ff1d-default-rtdb.asia-southeast1.firebasedatabase.app/Products.json"
  );
  const data = await response.json();
  const products = Object.keys(data).map((product) => ({
    id: product,
    ...data[product],
  }));
  return products;
};
