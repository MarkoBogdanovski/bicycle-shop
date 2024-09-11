import React, { useState } from "react";
import ProhibitedCombinations from "./ProhibitedCombinations/ProhibitedCombinations"; // Import the HOC-wrapped component
import withMultiSelectDropdown from "./MultiSelectDropdown/withMultiSelectDropdown";
import { convertToGroupedData } from "@/utils/helpers";

const MyComponent = (props: { children: React.ReactNode }) => (
  <>{props.children}</>
);
const EnhancedComponent = withMultiSelectDropdown(MyComponent);

interface CombinationsManagerProps {
  data: object;
  localSelectedOptions: object;
  condition: string;
  prohibitedOptions: string[];
  handleCombinationsChange: (
    groupKey: string | number,
    newSelectedOptions: Record<string, string[]>,
  ) => void;
  handleOptionChange: (groupKey: string, newSelectedOptions: string[]) => void;
}

const CombinationsManager: React.FC<CombinationsManagerProps> = ({
  data,
  localSelectedOptions,
  condition,
  prohibitedOptions,
  handleCombinationsChange,
  handleOptionChange,
}) => {
  const [combinations, setCombinations] = useState<number[]>([0]);

  const addProhibitedCombination = () => {
    setCombinations((prev) => [...prev, prev.length]);
  };

  const removeProhibitedCombination = (index: number) => {
    setCombinations((prev) => prev.filter((_, i) => i !== index));
  };

  const groups = React.useMemo(
    () => data && convertToGroupedData(data),
    [data],
  );

  return (
    <>
      {/* Multi Select Dropdown */}
      <div className="mt-5 inline-grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 md:grid-cols-5">
        <EnhancedComponent
          groupedData={groups}
          selectedOptions={localSelectedOptions}
          onChange={handleOptionChange}
        />
      </div>

      {/* Prohibited Combinations */}
      <div className="mt-5 grid grid-cols-1 gap-y-4">
        {combinations.slice().map((combinationId, index) => (
          <div key={index} className="flex items-start space-x-4">
            <ProhibitedCombinations
              data={data}
              condition={condition}
              prohibitedOptions={prohibitedOptions}
              onConditionChange={(newCondition) => {
                handleCombinationsChange(combinationId, {
                  condition: newCondition?.condition, // Update condition only
                });
              }}
              onProhibitedOptionsChange={(newOptions) => {
                handleCombinationsChange(combinationId, {
                  options: newOptions?.options, // Update options only
                });
              }}
            />

            {combinations.length > 1 && index !== 0 && (
              <button
                type="button"
                onClick={() =>
                  removeProhibitedCombination(combinations.length - 1 - index)
                }
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
