import React, { useEffect, useState, useCallback } from "react";
import { usePartContext } from "@/contexts/PartProvider";
import { formatPrice } from "@/utils/helpers";
import { debounce } from "lodash";
import InfoInput from "./InfoInput"; // Import the updated InfoInput component

const PartInfoInput: React.FC = () => {
  const [price, setPrice] = useState<string>("");
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
      />
    </>
  );
};

export default PartInfoInput;
