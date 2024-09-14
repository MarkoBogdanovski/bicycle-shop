import { Parts, GroupedParts, Product } from "@/types"; // Adjust the path as needed

// This Component takes parts as a list of objects and returns it as a
// grouped json output where parts are grouped by the part type
//
// INPUT
// [
//   {
//   "id": "44c08a5f-9890-4a02-99de-59b2a4ab07f5",
//   "name": "Full-Suspension",
//   "type": "frameType",
//   "price": 50,
//   "stock": 100,
//   "createdAt": "2024-09-09T16:41:20.475Z",
//   "updatedAt": "2024-09-09T16:41:20.475Z"
//   },
//   {
//   "id": "69cf8b07-29e6-4aba-afc8-d71b3e36f162",
//   "name": "Diamond",
//   "type": "frameType",
//   "price": 30,
//   "stock": 10,
//   "createdAt": "2024-09-09T16:41:20.475Z",
//   "updatedAt": "2024-09-09T16:41:20.475Z"
//   },
// ]
//
// OUTPUT
//
// {
//   "rimColor": {
//       "id": "23ebd64d-1939-4467-84d2-2a0f27b7b67a",
//       "label": "Rim Color",
//       "options": [
//           {
//               "id": "23ebd64d-1939-4467-84d2-2a0f27b7b67a",
//               "name": "Red"
//           },
//           {
//               "id": "04baf7e3-57df-470d-8344-ce735a7785b4",
//               "name": "Blue"
//           },
//           {
//               "id": "73ab466f-1b2f-400e-9081-bfe5372305b4",
//               "name": "Black"
//           }
//       ]
//   }
// }
export const convertToGroupedData = (data: Parts[]): GroupedParts => {
  // Initialize the output object
  const groupedParts: GroupedParts = {};

  // Iterate over the data to populate the groupedData
  data.forEach((item) => {
    // Check if the group already exists
    if (!groupedParts[item.type]) {
      // Initialize the group if it doesn't exist
      groupedParts[item.type] = {
        id: item.id,
        label: formatLabel(item.type),
        options: [],
      };
    }

    // Add the item to the appropriate group
    groupedParts[item.type].options.push({
      id: item.id,
      name: item.name,
    });
  });

  return groupedParts;
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Helper function to format the label based on type
export const formatLabel = (type: string): string => {
  switch (type) {
    case "frameType":
      return "Frame Type";
    case "frameFinish":
      return "Frame Finish";
    case "wheels":
      return "Wheels";
    case "rimColor":
      return "Rim Color";
    case "chain":
      return "Chain";
    // Add more cases as needed
    default:
      return "Unknown Type";
  }
};

// To format a number input into a standard price format (e.g., with commas and two decimal places)`
export const formatPrice = (value: string | number): string => {
  // Ensure the value is a number
  const numberValue = typeof value === "string" ? parseFloat(value) : value;

  // Check if it's a valid number
  if (isNaN(numberValue)) return "0.00";

  // Format the number as a price with two decimal places and commas
  return numberValue
    .toFixed(2) // Ensures two decimal places
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Adds commas for thousands
};

// Extract all the ids from selected parts
export const extractIds = (options: { [key: string]: string[] }) => {
  let ids: string[] = [];

  Object.values(options).forEach((optionArray) => {
    ids = [...ids, ...optionArray];
  });

  return ids;
};

export const extractParts = (product: Product): GroupedParts => {
  const groupedParts: GroupedParts = {};

  product.productParts.forEach((part) => {
    if (!groupedParts[part.type]) {
      groupedParts[part.type] = [];
    }

    // Check if the part type is 'rimColor' and add specific properties
    if (part.type === "rimColor") {
      const formattedName = part.name.toLowerCase().replace(/\s+/g, "-"); // Convert name to lowercase and replace spaces with hyphens
      if (formattedName !== "white" && formattedName !== "black") {
        part = {
          ...part,
          class: `bg-${formattedName}-500`,
          selectedClass: `ring-${formattedName}-400`,
        };
      } else {
        part = {
          ...part,
          class: `bg-${formattedName}`,
          selectedClass: `ring-${formattedName}`,
        };
      }
    }

    // Add a 'crossed over' style if the part is out of stock
    if (!part.stock) {
      part = {
        ...part,
        class: `${part.class ?? ""} line-through`, // Add 'line-through' if out of stock
      };
    }

    groupedParts[part.type].push(part);
  });

  return groupedParts;
};
