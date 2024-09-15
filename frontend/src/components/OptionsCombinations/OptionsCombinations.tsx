import React, { useCallback, useState } from "react";
import Dropdown from "../Dropdown";
import { debounce } from "lodash";
import { formatPrice } from "@/utils/helpers";

interface OptionsCombinationsProps {
  data: { id: string; name: string }[]; // Adjust the type based on your data structure
  condition: string; // Single selected option for the `select` element
  onConditionChange: (selected: string) => void; // Callback for handling change in `select`
}

const OptionsCombinations: React.FC<OptionsCombinationsProps> = ({
  data,
  onConditionChange,
}) => {
  const [localCondition, setLocalCondition] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleConditionChange = (value: string) => {
    setLocalCondition(value);
    onConditionChange(value);
  };

  const debouncedHandlePriceChange = useCallback(
    debounce((inputValue: string) => {
      const formattedPrice = formatPrice(inputValue);
      setPrice(formattedPrice);
    }, 500), // 500ms debounce delay
    [setPrice], // Include setProductPrice in dependencies
  );

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPrice(inputValue);
    debouncedHandlePriceChange(inputValue); // Call debounced function
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
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Price
        </label>
        <div className="mt-2">
          <input
            required
            id="price"
            name="price"
            type="text"
            value={price}
            onChange={handlePriceChange}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </>
  );
};

export default OptionsCombinations;
