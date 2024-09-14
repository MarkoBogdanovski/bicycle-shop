import { Parts } from "@/types";
import { useCallback } from "react";

const useCalculatePrice = () => {
  const calculatePrice = useCallback(
    (
      basePrice: number,
      selectedOptions: Record<string, string>,
      parts: Parts[],
    ) => {
      // Calculate price based on selected options
      let total = basePrice;
      for (const key in selectedOptions) {
        const selectedId = selectedOptions[key];
        const part = parts.find((p) => p.id === selectedId);
        if (part) {
          total += part.price;
        }
      }
      return total;
    },
    [],
  );

  return calculatePrice;
};

export default useCalculatePrice;
