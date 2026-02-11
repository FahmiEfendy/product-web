import axios from "axios";
import { useEffect, useState } from "react";

import { MdDelete, MdOutlineModeEdit } from "react-icons/md";

const ProductList = ({ products, currentPage, setCurrentPage, fetchProducts }) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const editProductHandler = async (id) => {
    if (!id) return;

    try {
      await axios.patch(`${baseUrl}/product/${id}`);
      fetchProducts();
      console.log("Successfully edit product");
    } catch (err) {
      console.error(err, "<<< Failed to edit product");
    }
  };

  const deleteProductHandler = async (id) => {
    if (!id) return;

    try {
      await axios.delete(`${baseUrl}/product/${id}`);
      fetchProducts();
      console.log("Successfully edit product");
    } catch (err) {
      console.error(err, "<<< Failed to delete product");
    }
  };

  const previousPageHandler = () => {
    if (currentPage === 1) return; // prevent go to page smaller than 1
    setCurrentPage((prevState) => prevState - 1);
  };

  const nextPageHandler = () => {
    if (currentPage === products.last_page) return; // prevent go to page bigger than max page
    setCurrentPage((prevState) => prevState + 1);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <>
      {products?.data?.length === 0 && <h3>No products found.</h3>}

      {products?.data ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {products.data.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.description}</td>
                  <td>
                    <MdOutlineModeEdit
                      size={28}
                      color="yellow"
                      cursor={"pointer"}
                      onClick={() => editProductHandler(product.id)}
                    />
                  </td>
                  <td>
                    <MdDelete
                      size={28}
                      color="red"
                      cursor={"pointer"}
                      onClick={() => deleteProductHandler(product.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <>
            <button onClick={previousPageHandler}>Previous</button>
            <button onClick={nextPageHandler}>Next</button>
            <p>{`Showing ${products.from} - ${products.to} out of ${products.total} products`}</p>
          </>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ProductList;
