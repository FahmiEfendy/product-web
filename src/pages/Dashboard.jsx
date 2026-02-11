import axios from "axios";
import { useState } from "react";

import ProductList from "../components/ProductList/ProductList";

const Dashboard = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/products?page=${currentPage}`,
      );
      setProducts(response.data);
      console.log("Successfully fetch products");
    } catch (err) {
      console.error(err, "<<< Failed to fetch products");
    }
  };

  const syncProductsHandler = async () => {
    try {
      await axios.post(`${baseUrl}/products/sync`);
      fetchProducts();
      console.log("Successfully sync products");
    } catch (err) {
      console.error(err, "<<< Failed to sync products");
    }
  };

  return (
    <>
      <h2>Product List</h2>

      <button onClick={syncProductsHandler}>Sync Product</button>

      <ProductList
        products={products}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        fetchProducts={fetchProducts}
      />
    </>
  );
};

export default Dashboard;
