import fs from "fs";
import path from "path";

// Define the file path for the inventory data
const filePath = path.join(process.cwd(), "data", "inventory.json");

// Function to read inventory from the JSON file
export const readInventory = () => {
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  }
  return []; // If the file doesn't exist, return an empty array
};

// Function to write inventory to the JSON file
export const writeInventory = (inventory) => {
  fs.writeFileSync(filePath, JSON.stringify(inventory, null, 2), "utf8");
};
