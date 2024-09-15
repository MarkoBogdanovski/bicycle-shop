// src/hooks/useHandleCombinationsChange.ts
import { Dispatch, SetStateAction, useCallback } from "react";

interface Combination {
  condition: string;
  price: string; // Add price to the combination
}

interface Combinations {
  [key: string]: Combination;
}

interface UseOptionsCombinationsParams {
  setCombinations: Dispatch<SetStateAction<Combinations>>;
}

const useOptionsCombinations = ({
  setCombinations,
}: UseOptionsCombinationsParams) => {
  return useCallback(
    (
      key: string | number,
      newCombination: Partial<Combination>, // Use Partial to allow partial updates
    ) => {
      setCombinations((prev) => {
        const currentCombination = prev[key] || {
          condition: "",
          price: "",
        };

        const updatedCombination = {
          condition: newCombination.condition ?? currentCombination.condition,
          price: newCombination.price ?? currentCombination.price,
        };

        return {
          ...prev,
          [key]: updatedCombination,
        };
      });
    },
    [setCombinations],
  );
};

export default useOptionsCombinations;
