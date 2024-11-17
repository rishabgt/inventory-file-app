import { readInventory, writeInventory } from "../../../lib/fileOperations";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, quantity, price } = req.body;
    const newProduct = {
      id: Date.now(), // Simple unique ID
      name,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
    };

    // Read the existing inventory
    const inventory = readInventory();
    inventory.push(newProduct);

    // Write the updated inventory back to the file
    writeInventory(inventory);

    res.status(201).json(newProduct);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
