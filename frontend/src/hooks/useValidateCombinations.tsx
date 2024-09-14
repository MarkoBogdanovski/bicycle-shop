import { useCallback } from "react";
import { API_URL } from "@/utils/env";

const useValidateCombinations = () => {
  const validateCombinations = useCallback(
    async (productId: string, selectedOptions: object) => {
      try {
        const response = await fetch(
          `${API_URL}/products/${productId}/validateCombinations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedOptions }),
          },
        );

        const data = await response.json();
        return data.isValid;
      } catch (error) {
        console.error("Error validating combinations:", error);
        return false;
      }
    },
    [],
  );

  return validateCombinations;
};

export default useValidateCombinations;
