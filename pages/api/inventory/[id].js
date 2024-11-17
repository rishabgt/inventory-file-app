import { readInventory, writeInventory } from "../../../lib/fileOperations";

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method == "GET") {
    const inventory = readInventory();
    const updatedInventory = inventory.filter(
      (product) => product.id == parseInt(id)
    );
    res.status(200).json(updatedInventory);
  } else if (req.method === "PUT") {
    const { name, quantity, price } = req.body;

    // Read the current inventory
    const inventory = readInventory();
    const productIndex = inventory.findIndex(
      (product) => product.id === parseInt(id)
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product
    inventory[productIndex] = {
      ...inventory[productIndex],
      name,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
    };

    // Write the updated inventory back to the file
    writeInventory(inventory);

    res.status(200).json(inventory[productIndex]);
  } else if (req.method === "DELETE") {
    // Delete the product
    const inventory = readInventory();
    const updatedInventory = inventory.filter(
      (product) => product.id !== parseInt(id)
    );

    if (inventory.length === updatedInventory.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Write the updated inventory back to the file
    writeInventory(updatedInventory);

    res.status(200).json({ message: "Product deleted" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
