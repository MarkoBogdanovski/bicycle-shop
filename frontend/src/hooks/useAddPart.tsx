import { useCallback } from "react";
import { API_URL } from "@/utils/env";
import { extractIds } from "@/utils/helpers";

const useAddPart = (
  productName: string,
  productPrice: string,
  localSelectedOptions: Record<string, string[]>,
  combinations: Record<string, object>, // Ensure this is the correct type
  resetForm: () => void,
  setNotification: (error: string, message: string) => void,
) => {
  const handleForm = useCallback(async () => {
    // Prepare the data to be sent as JSON
    const options: string[] = extractIds(localSelectedOptions);
    const basePrice: number = parseFloat(productPrice.replace(/,/g, ""));
    const formData = {
      productName,
      categoryId: "8cfd81f4-0a99-4baf-afbc-e7a6f37748d4",
      basePrice,
      options,
      combinations,
    };

    if (!productName || !productPrice) {
      setNotification("notification", "Name and price fields are required!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData), // Convert formData to JSON
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);

      setNotification("success", "Product added successfully.");

      // Reset the form after successful submission
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      setNotification("error", "An error occurred while submitting the form.");
    }
  }, [
    productName,
    productPrice,
    localSelectedOptions,
    combinations,
    resetForm,
    setNotification,
  ]);

  return handleForm;
};

export default useAddPart;
