import React, { createContext, useContext, useState, useEffect } from "react";
import { AddProductContextType } from "@/types";
import { convertToGroupedData } from "@/utils/helpers";
import useFetchData from "@/hooks/useFetchData";

const API_URL = "http://localhost:3000";

const AddProductContext = createContext<AddProductContextType | undefined>(
  undefined,
);

export const AddProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [localSelectedOptions, setLocalSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [combinations, setCombinations] = useState<string[]>([]);
  const { data, error, isLoading, isError } = useFetchData(
    `${API_URL}/api/parts`,
  );

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

  const value = {
    localSelectedOptions,
    combinations,
    setLocalSelectedOptions,
    setCombinations,
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
