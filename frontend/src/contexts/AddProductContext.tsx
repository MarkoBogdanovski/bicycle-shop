import React, { createContext, useContext, useState, ReactNode } from "react";

interface AddProductContextType {
  localSelectedOptions: object;
  setLocalSelectedOptions: (value: object) => void;
  condition: string;
  setCondition: (value: string) => void;
  prohibitedOptions: string[];
  setProhibitedOptions: (value: string[]) => void;
}

const AddProductContext = createContext<AddProductContextType | undefined>(
  undefined,
);

export const AddProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [localSelectedOptions, setLocalSelectedOptions] = useState<object>({});
  const [condition, setCondition] = useState<string>("");
  const [prohibitedOptions, setProhibitedOptions] = useState<string[]>([]);

  return (
    <AddProductContext.Provider
      value={{
        localSelectedOptions,
        setLocalSelectedOptions,
        condition,
        setCondition,
        prohibitedOptions,
        setProhibitedOptions,
      }}
    >
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
