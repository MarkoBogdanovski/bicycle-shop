import React, { useEffect, useState, useCallback } from "react";
import { usePartContext } from "@/contexts/PartProvider";
import { formatPrice } from "@/utils/helpers";
import { debounce } from "lodash";
import InfoInput from "./InfoInput"; // Import the updated InfoInput component
import Dropdown from "../Dropdown";

const partTypes = [
  { id: "frameType", name: "Frame Type" },
  { id: "frameFinish", name: "Frame Finish" },
  { id: "wheels", name: "Wheels" },
  { id: "rimColor", name: "Rim Color" },
  { id: "chain", name: "Chain" },
];

const PartInfoInput: React.FC = () => {
  const [price, setPrice] = useState<string>("");
  const [type, setType] = useState<string>("");
  const { productName, productPrice, setProductName, setProductPrice } =
    usePartContext();

  // Debounced function to handle price formatting
  const debouncedHandlePriceChange = useCallback(
    debounce((inputValue: string) => {
      const formattedPrice = formatPrice(inputValue);
      setProductPrice(formattedPrice);
    }, 500), // 500ms debounce delay
    [setProductPrice], // Include setProductPrice in dependencies
  );

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setPrice(inputValue);
    debouncedHandlePriceChange(inputValue); // Call debounced function
  };

  useEffect(() => {
    setPrice(productPrice);
  }, [productPrice]);

  return (
    <>
      <InfoInput
        name={productName}
        price={price}
        onNameChange={(newName) => setProductName(newName)}
        onPriceChange={handlePriceChange}
      >
        <div className="col-span-3 w-full">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900 mb-1"
          >
            Product Type
          </label>
          <Dropdown
            id="type"
            name="Type"
            value={type}
            onChange={setType}
            options={partTypes}
            minWidth="w-60"
            placeholder="Select an option"
          />
        </div>
      </InfoInput>
    </>
  );
};

export default PartInfoInput;
