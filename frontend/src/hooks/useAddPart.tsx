import { useCallback } from "react";
import { API_URL } from "@/utils/env";

const useAddPart = (
  partName: string,
  partPrice: string,
  partType: string,
  combinations: Record<string, object>, // Ensure this is the correct type
  resetForm: () => void,
  setNotification: (error: string, message: string) => void,
) => {
  const handleForm = useCallback(async () => {
    // Prepare the data to be sent as JSON
    const basePrice: number = parseFloat(partPrice.replace(/,/g, ""));

    const formData = {
      partName,
      basePrice,
      type: partType,
      combinations,
    };

    if (!partName || !partPrice) {
      setNotification("notification", "Name and price fields are required!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/parts`, {
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
  }, [partName, partPrice, partType, combinations, resetForm, setNotification]);

  return handleForm;
};

export default useAddPart;
