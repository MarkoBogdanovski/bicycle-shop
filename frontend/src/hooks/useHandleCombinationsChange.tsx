// src/hooks/useHandleCombinationsChange.ts
import { Dispatch, SetStateAction, useCallback } from "react";

interface Combinations {
  [key: string]: {
    condition: string;
    options: string[];
  };
}

interface UseHandleCombinationsChangeParams {
  setCombinations: Dispatch<SetStateAction<Combinations>>; // Ensure this matches
}

const useHandleCombinationsChange = ({
  setCombinations,
}: UseHandleCombinationsChangeParams) => {
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

export default useHandleCombinationsChange;
