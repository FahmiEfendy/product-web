import axios from "axios";
import { useEffect, useState } from "react";

import "./ProductForm.scss";
import { FaTimes } from "react-icons/fa";

const ProductForm = ({ fetchProducts, closeCreateModal, editId }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [inputForm, setInputForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const fetchProductDetail = async () => {
    try {
      if (!editId) return;

      const response = await axios.get(`${baseUrl}/product/${editId}`);
      const productDetail = response?.data?.data;
      console.log("Successfully fetch product detail");

      setInputForm({
        name: productDetail.name,
        price: productDetail.price,
        stock: productDetail.stock,
        description: productDetail.description,
      });
    } catch (err) {
      console.error(err, "<<< Failed fetch product detail");
    }
  };

  const addProductHandler = async () => {
    try {
      const payload = {
        name: inputForm.name,
        price: inputForm.price,
        stock: inputForm.stock,
        description: inputForm.description,
      };

      if (editId) {
        // update existing product
        await axios.patch(`${baseUrl}/product/${editId}`, payload);
      } else {
        // create new product
        await axios.post(`${baseUrl}/product`, payload);
      }

      fetchProducts();
      console.log("Successfully add product");
      closeCreateModal();
    } catch (err) {
      console.error(err, "<<< Failed to add product");
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [editId]);

  return (
    <div className="form-modal-overlay" onClick={closeCreateModal}>
      <div
        className="form-container"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <h2>{`${editId ? "Edit" : "Add"} Product`}</h2>
        <FaTimes
          size={26}
          onClick={closeCreateModal}
          cursor={"pointer"}
          className="close-btn"
        />
        <div>
          <p className="form-label">Name</p>
          <input
            type="text"
            name="name"
            placeholder="Input product name"
            value={inputForm.name}
            onChange={(e) =>
              setInputForm((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <p className="form-label">Price</p>
          <input
            type="number"
            name="name"
            placeholder="Input product price"
            value={inputForm.price}
            onChange={(e) =>
              setInputForm((prevState) => ({
                ...prevState,
                price: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <p className="form-label">Stock</p>
          <div>
            <input
              type="number"
              name="name"
              placeholder="Input product stock"
              value={inputForm.stock}
              onChange={(e) =>
                setInputForm((prevState) => ({
                  ...prevState,
                  stock: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div>
          <p className="form-label">Description</p>
          <input
            type="text"
            name="name"
            placeholder="Input product description"
            value={inputForm.description}
            onChange={(e) =>
              setInputForm((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div className="btn-container">
          <button onClick={closeCreateModal}>Cancel</button>
          <button
            onClick={addProductHandler}
            className="btn-add"
          >{`${editId ? "Edit" : "Add"} Product`}</button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
