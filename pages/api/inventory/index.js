import { readInventory } from "../../../lib/fileOperations";

export default function handler(req, res) {
  if (req.method === "GET") {
    // Read and return the inventory data
    const inventory = readInventory();
    res.status(200).json(inventory);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
