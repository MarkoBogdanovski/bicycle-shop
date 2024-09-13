import React, { createContext, useContext, useState, useEffect } from "react";
import { AddProductContextType } from "@/types";
import { convertToGroupedData } from "@/utils/helpers";
import useFetchData from "@/hooks/useFetchData";
import useHandleForm from "@/hooks/useHandleForm"; // Import the custom hook

const AddProductContext = createContext<AddProductContextType | undefined>(
  undefined,
);

export const AddProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [localSelectedOptions, setLocalSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [combinations, setCombinations] = useState<number[]>([0]);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [notification, setNotification] = useState<Record<string, string>>({});

  const { data, error, isLoading, isError } = useFetchData(`parts`);

  useEffect(() => {
    if (data) {
      const groups = convertToGroupedData(data);
      setLocalSelectedOptions(
        Object.keys(groups).reduce(
          (acc, groupKey) => {
            acc[groupKey] = []; // Initialize selected options for each group
            return acc;
          },
          {} as Record<string, string[]>,
        ),
      );
    }
  }, [data]);

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
  const handleForm = useHandleForm(
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
    data,
    error,
    isLoading,
    isError,
  };

  return (
    <AddProductContext.Provider value={value}>
      {children}
    </AddProductContext.Provider>
  );
};

export const useAddProductContext = () => {
  const context = useContext(AddProductContext);
  if (context === undefined) {
    throw new Error(
      "useAddProductContext must be used within an AddProductProvider",
    );
  }
  return context;
};
