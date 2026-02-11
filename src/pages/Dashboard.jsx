import axios from "axios";
import { useState } from "react";

import ProductForm from "../components/ProductForm/ProductForm";
import ProductList from "../components/ProductList/ProductList";

import "./Dashboard.scss";

const Dashboard = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [editId, setEditId] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `${baseUrl}/products?page=${currentPage}`,
      );
      setProducts(response.data);
      console.log("Successfully fetch products");
    } catch (err) {
      console.error(err, "<<< Failed to fetch products");
    }
    setIsLoading(false)
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

  const openCreateModal = async () => {
    setIsModalOpen(true);
  };

  const closeCreateModal = async () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  return (
    <>
      <h2>Product List</h2>

      <div className="btn-container">
        <button onClick={syncProductsHandler} className="btn-sync">
          Sync Product
        </button>
        <button onClick={openCreateModal} className="btn-create">
          Add Product
        </button>
      </div>

      {(isModalOpen || editId) && (
        <ProductForm
          fetchProducts={fetchProducts}
          closeCreateModal={closeCreateModal}
          editId={editId}
        />
      )}

      <ProductList
        products={products}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        fetchProducts={fetchProducts}
        setEditId={setEditId}
        isLoading={isLoading}
      />
    </>
  );
};

export default Dashboard;
