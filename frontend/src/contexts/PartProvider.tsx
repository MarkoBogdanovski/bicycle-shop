import React, { createContext, useContext, useState } from "react";
import { PartContextType } from "@/types";
import { useAddProduct } from "@/hooks"; // Import the custom hook

// Create context with undefined as default value
const PartContext = createContext<PartContextType | undefined>(undefined);

export const PartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [localSelectedOptions, setLocalSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [combinations, setCombinations] = useState<number[]>([0]); // Changed initial value to empty array
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [notification, setNotification] = useState<Record<string, string>>({});

  // Reset form function after successful submission
  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setLocalSelectedOptions({});
    setCombinations([]);
  };

  const handleNotification = (type: string, message: string) => {
    // Added types
    setNotification({ type, message });
  };

  // Use the handleForm hook
  const handleForm = useAddProduct(
    productName,
    productPrice,
    localSelectedOptions,
    combinations,
    resetForm,
    handleNotification,
  );

  const value: PartContextType = {
    // Ensure type matches PartContextType
    localSelectedOptions,
    combinations,
    productName,
    productPrice,
    notification,
    setLocalSelectedOptions,
    setCombinations,
    setProductPrice,
    setProductName,
    handleForm,
    resetForm,
    handleNotification,
  };

  return <PartContext.Provider value={value}>{children}</PartContext.Provider>;
};

// Corrected the hook name
export const usePartContext = () => {
  const context = useContext(PartContext);
  if (context === undefined) {
    throw new Error("usePartContext must be used within a PartProvider");
  }
  return context;
};
