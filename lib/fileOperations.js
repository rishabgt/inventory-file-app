// Define the file path for the inventory data
let filePath = [
  {
    id: 1731817733858,
    name: "1",
    quantity: 66,
    price: 2000,
  },
  {
    id: 1731829992621,
    name: "qwert",
    quantity: 123,
    price: 22,
  },
];

// Function to read inventory from the JSON file
export const readInventory = () => {
  return filePath;
};

// Function to write inventory to the JSON file
export const writeInventory = (inventory) => {
  filePath = inventory;
};
