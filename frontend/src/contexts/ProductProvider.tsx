import React, { createContext, useContext, useState } from "react";
import { ProductContextType } from "@/types";
import { useAddProduct } from "@/hooks"; // Import the custom hook

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [localSelectedOptions, setLocalSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [combinations, setCombinations] = useState<number[] | unknown>([0]);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [notification, setNotification] = useState<Record<string, string>>({});

  // Reset form function after successful submission
  const resetForm = () => {
    setProductName("");
    setProductPrice("");
    setLocalSelectedOptions({});
    setCombinations([0]);
  };

  const handleNotification = (type, message) => {
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

  const value = {
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

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error(
      "useAddProductContext must be used within an AddProductProvider",
    );
  }
  return context;
};
