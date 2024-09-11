import React, { useState } from "react";
import MultiSelectDropdown from "../MultiSelectDropdown/MultiSelectDropdown"; // Adjust the import path
import withProhibitedCombinations from "./withProhibitedCombinations";
import Dropdown from "../Dropdown";

interface ProhibitedCombinationsProps {
  data: { id: string; name: string }[]; // Adjust the type based on your data structure
  condition: string; // Single selected option for the `select` element
  prohibitedOptions: string[]; // Multiple selected options for the `MultiSelectDropdown`
  onConditionChange: (selected: string) => void; // Callback for handling change in `select`
  onProhibitedOptionsChange: (selected: string[]) => void; // Callback for handling changes in `MultiSelectDropdown`
}

const ProhibitedCombinations: React.FC<ProhibitedCombinationsProps> = ({
  data,
  prohibitedOptions,
  onConditionChange,
  onProhibitedOptionsChange,
}) => {
  const [localCondition, setLocalCondition] = useState<string>("");
  const [localProhibitedOptions, setLocalProhibitedOptions] = useState<
    string[]
  >([]);

  const options = React.useMemo(() => {
    return {
      proh: {
        options: Object.values(data).map((item) => item),
      },
    };
  }, [data]);

  const handleConditionChange = (value: string) => {
    setLocalCondition(value);
    onConditionChange(value);
  };

  const handleProhibitedOptionsChange = (value: string[]) => {
    setLocalProhibitedOptions(value);
    onProhibitedOptionsChange(value);
  };

  return (
    <>
      <div className="col-span-1">
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
          Condition
        </label>
        <Dropdown
          id="country"
          name="country"
          value={localCondition}
          onChange={handleConditionChange}
          options={data}
          minWidth="w-48"
          placeholder="Select an option"
        />
      </div>
      <div className="sm:col-span-1 mt-0">
        <MultiSelectDropdown
          label="Options"
          groups={options} // Assuming data structure fits here
          selectedOptions={localProhibitedOptions}
          onChange={handleProhibitedOptionsChange}
        />
      </div>
    </>
  );
};

ProhibitedCombinations.displayName = "ProhibitedCombinations";

export default withProhibitedCombinations(ProhibitedCombinations);
