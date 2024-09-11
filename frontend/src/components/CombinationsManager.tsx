import React, { useState } from "react";
import ProhibitedCombinations from "./ProhibitedCombinations/ProhibitedCombinations"; // Import the HOC-wrapped component
import withMultiSelectDropdown from "./MultiSelectDropdown/withMultiSelectDropdown";
import { convertToGroupedData } from "@/utils/helpers";
import { useAddProductContext } from "@/contexts/AddProductContext"; // Import the context hook

const MyComponent = (props: { children: React.ReactNode }) => (
  <>{props.children}</>
);
const EnhancedComponent = withMultiSelectDropdown(MyComponent);

interface CombinationsManagerProps {
  data: object;
  localSelectedOptions: object;
  handleCombinationsChange: (
    groupKey: string | number,
    newSelectedOptions: Record<string, string[]>,
  ) => void;
  handleOptionChange: (groupKey: string, newSelectedOptions: string[]) => void;
}

const CombinationsManager: React.FC<CombinationsManagerProps> = ({
  data,
  localSelectedOptions,
  handleCombinationsChange,
  handleOptionChange,
}) => {
  const { combinations, setCombinations } = useAddProductContext(); // Use the context hook

  const addProhibitedCombination = () => {
    const newCombinationId = Object.keys(combinations).length; // Use the length as the new ID
    setCombinations((prevCombinations) => ({
      ...prevCombinations,
      [newCombinationId]: { condition: "", options: [] },
    }));
  };

  const removeProhibitedCombination = (key: string) => {
    setCombinations((prevCombinations) => {
      const updatedCombinations = { ...prevCombinations };
      delete updatedCombinations[key];
      return updatedCombinations;
    });
  };
  const groups = React.useMemo(
    () => data && convertToGroupedData(data),
    [data],
  );

  return (
    <>
      <div className="inline-grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 md:grid-cols-5">
        <EnhancedComponent
          groupedData={groups}
          selectedOptions={localSelectedOptions}
          onChange={handleOptionChange}
        />
      </div>
      <div
        className="text-base font-semibold text-gray-900 mb-5"
        style={{ marginTop: 45, marginBottom: 0 }}
      >
        Prohibited Combinations
      </div>
      <div className="mt-0 grid grid-cols-1 gap-y-4">
        {Object.entries(combinations).map(([key, combination], index) => (
          <div key={key} className="flex items-start space-x-4">
            <ProhibitedCombinations
              data={data}
              condition={combination.condition}
              prohibitedOptions={combination.options}
              onConditionChange={(newCondition) => {
                handleCombinationsChange(key, {
                  condition: newCondition, // Update condition only
                });
              }}
              onProhibitedOptionsChange={(newOptions) => {
                handleCombinationsChange(key, {
                  options: newOptions, // Update options only
                });
              }}
            />

            {Object.keys(combinations).length > 1 && index !== 0 && (
              <button
                type="button"
                onClick={() => removeProhibitedCombination(key)}
                className="mt-8 rounded-md bg-transparent text-red-500 hover:bg-red-600 hover:text-white px-3 py-1.5 text-sm font-semibold hover:shadow-sm"
              >
                -
              </button>
            )}
            {index === 0 && (
              <button
                type="button"
                onClick={addProhibitedCombination}
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

export default CombinationsManager;
