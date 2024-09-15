import { useState, useCallback } from "react";
import useCalculatePrice from "@/hooks/useCalculatePrice";
import useValidateCombinations from "@/hooks/useValidateCombinations";
import { Product } from "@/types";

interface UseProductProps {
  product: Product;
}

const useProduct = ({ product }: UseProductProps) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [isValid, setIsValid] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const validateCombinations = useValidateCombinations();
  const calculatePrice = useCalculatePrice();

  const handleOptionChange = useCallback(
    async (groupKey: string, newOptionId: string) => {
      setSelectedOptions((prev) => {
        // Check if the new option is the same as the current one
        const isUnselect = prev[groupKey] === newOptionId;
        const updatedOptions = isUnselect
          ? { ...prev, [groupKey]: undefined } // Remove the option if it's the same
          : { ...prev, [groupKey]: newOptionId }; // Update with the new option

        (async () => {
          // Validate combinations
          const valid = await validateCombinations(product.id, updatedOptions);
          setIsValid(valid);
          if (valid) {
            // Calculate price
            const price = await calculatePrice(product.id, updatedOptions);
            setTotalPrice(price);
          } else {
            setTotalPrice(product.basePrice); // Reset to base price if not valid
          }
        })();

        // Return the updated options without the unselected option
        return Object.fromEntries(
          Object.entries(updatedOptions).filter(
            ([_, value]) => value !== undefined,
          ),
        );
      });
    },
    [
      product.id,
      product.basePrice,
      validateCombinations,
      calculatePrice,
      product.productParts,
    ],
  );

  // Cleanup function to reset states
  const resetProductState = () => {
    setSelectedOptions({});
    setIsValid(true);
    setTotalPrice(product.basePrice);
  };

  return {
    selectedOptions,
    isValid,
    totalPrice,
    handleOptionChange,
    resetProductState,
    setTotalPrice,
  };
};

export default useProduct;
