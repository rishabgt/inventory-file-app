/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchInventory() {
      const response = await axios.get("/api/inventory");
      setInventory(response.data);
    }
    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/inventory/${id}`);
      setInventory(inventory.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>Inventory List</h2>
      <button onClick={() => router.push("/inventory/add")}>Add Product</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>
                <button
                  onClick={() => router.push(`/inventory/edit/${product.id}`)}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
