// src/hooks/useHandleCombinationsChange.ts
import { Dispatch, SetStateAction, useCallback } from "react";

interface Combinations {
  [key: string]: {
    condition: string;
    options: string[];
  };
}

interface UseProhibitedCombinationsParams {
  setCombinations: Dispatch<SetStateAction<Combinations>>; // Ensure this matches
}

// Handle combinations for all the multiple instances of prohibited combinations
const useProhibitedCombinations = ({
  setCombinations,
}: UseProhibitedCombinationsParams) => {
  return useCallback(
    (
      groupKey: string | number,
      newCombinations: Partial<{ condition: string; options: string[] }>,
    ) => {
      setCombinations((prev) => {
        const currentCombination = prev[groupKey] || {
          condition: "",
          options: [],
        };

        const updatedCombination = {
          condition: newCombinations.condition ?? currentCombination.condition,
          options: newCombinations.options ?? currentCombination.options,
        };

        return {
          ...prev,
          [groupKey]: updatedCombination,
        };
      });
    },
    [setCombinations],
  );
};

export default useProhibitedCombinations;
