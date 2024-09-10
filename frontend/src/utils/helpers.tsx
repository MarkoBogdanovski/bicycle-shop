import { GroupedData } from "@/types"; // Adjust the path as needed

export const convertToGroupedData = (data: any[]): GroupedData => {
  // Initialize the output object
  const groupedData: GroupedData = {};

  // Iterate over the data to populate the groupedData
  data.forEach((item) => {
    // Check if the group already exists
    if (!groupedData[item.type]) {
      // Initialize the group if it doesn't exist
      groupedData[item.type] = {
        id: item.id,
        label: formatLabel(item.type),
        options: [],
      };
    }

    // Add the item to the appropriate group
    groupedData[item.type].options.push({
      id: item.id,
      name: item.name,
    });
  });

  return groupedData;
};

// Helper function to format the label based on type
const formatLabel = (type: string): string => {
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
