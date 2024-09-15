import { useCallback } from "react";
import { API_URL } from "@/utils/env";

const useCalculatePrice = () => {
  const calculatePrice = useCallback(
    async (productId: string, selectedOptions: object) => {
      try {
        const response = await fetch(
          `${API_URL}/products/${productId}/calculatePrice`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedOptions }),
          },
        );

        const data = await response.json();
        return data.totalPrice;
      } catch (error) {
        console.error("Error validating combinations:", error);
        return false;
      }
    },
    [],
  );

  return calculatePrice;
};

export default useCalculatePrice;
