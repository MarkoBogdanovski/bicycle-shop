import React from "react";
import OptionsCombinations from "./Combinations/OptionsCombinations";
import { usePartContext } from "@/contexts/PartProvider";

interface OptionsCombinationsManagerProps {
  data: { id: string; name: string }[];
  localSelectedOptions: object;
  onConditionChange: (key: string, newCondition: string) => void;
  onPriceChange: (key: string, newPrice: string) => void; // Ensure this is included
}

const OptionsCombinationsManager: React.FC<OptionsCombinationsManagerProps> = ({
  data,
  localSelectedOptions,
  onConditionChange,
  onPriceChange,
}) => {
  const { combinations, setCombinations } = usePartContext();

  const addOptionsCombinations = () => {
    const newCombinationId = Object.keys(combinations).length;
    setCombinations((prevCombinations) => ({
      ...prevCombinations,
      [newCombinationId]: { condition: "", options: [], price: "" },
    }));
  };

  const removeOptionsCombinations = (key: string) => {
    setCombinations((prevCombinations) => {
      const updatedCombinations = { ...prevCombinations };
      delete updatedCombinations[key];
      return updatedCombinations;
    });
  };

  return (
    <>
      <div
        className="text-base font-semibold text-gray-900 mb-5"
        style={{ marginTop: 45, marginBottom: 0 }}
      >
        Options Pricing Combinations
      </div>
      <div className="mt-0 grid grid-cols-1 gap-y-4">
        {Object.entries(combinations).map(([key, combination], index) => (
          <div key={key} className="flex items-start space-x-4">
            <OptionsCombinations
              data={data}
              condition={combination.condition}
              price={combination.price}
              onConditionChange={(newCondition) =>
                onConditionChange(key, newCondition)
              }
              onPriceChange={(newPrice) => onPriceChange(key, newPrice)} // Ensure this is called
            />
            {Object.keys(combinations).length > 1 && index !== 0 && (
              <button
                type="button"
                onClick={() => removeOptionsCombinations(key)}
                className="mt-8 rounded-md bg-transparent text-red-500 hover:bg-red-600 hover:text-white px-3 py-1.5 text-sm font-semibold hover:shadow-sm"
              >
                -
              </button>
            )}
            {index === 0 && (
              <button
                type="button"
                onClick={addOptionsCombinations}
                className="mt-8 rounded-md bg-transparent px-3 py-1.5 text-sm font-semibold text-gray-900 hover:shadow-sm hover:bg-gray-200"
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default OptionsCombinationsManager;
