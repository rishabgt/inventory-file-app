import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const EditProduct = () => {
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      axios.get(`/api/inventory/${id}`).then((response) => {
        const productData = response.data;
        setProduct(productData);
        setName(productData.name);
        setQuantity(productData.quantity);
        setPrice(productData.price);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = { name, quantity, price };
    try {
      await axios.put(`/api/inventory/${id}`, updatedProduct);
      router.push("/inventory");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
