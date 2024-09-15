import React, { useCallback, useState } from "react";
import Dropdown from "../../Dropdown";
import { debounce } from "lodash";
import { formatPrice } from "@/utils/helpers";

interface OptionsCombinationsProps {
  data: { id: string; name: string }[];
  condition: string;
  price: string;
  onConditionChange: (selected: string) => void;
  onPriceChange: (price: string) => void;
}

const OptionsCombinations: React.FC<OptionsCombinationsProps> = ({
  data,
  condition,
  price,
  onConditionChange,
  onPriceChange,
}) => {
  const [localCondition, setLocalCondition] = useState<string>(condition);
  const [localPrice, setLocalPrice] = useState<string>("");

  const handleConditionChange = (value: string) => {
    setLocalCondition(value);
    onConditionChange(value);
  };

  const debouncedHandlePriceChange = useCallback(
    debounce((inputValue: string) => {
      const formattedPrice = formatPrice(inputValue);
      setLocalPrice(formattedPrice);
      onPriceChange(formattedPrice);
    }, 500),
    [onPriceChange],
  );

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLocalPrice(inputValue);
    debouncedHandlePriceChange(inputValue);
  };

  return (
    <>
      <div className="col-span-1">
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-1">
          Condition
        </label>
        <Dropdown
          id="condition"
          name="condition"
          value={localCondition}
          onChange={handleConditionChange}
          options={data}
          minWidth="w-60"
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
            value={localPrice}
            onChange={handlePriceChange}
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </>
  );
};

export default OptionsCombinations;
