import React, { createContext, useContext, useState } from "react";
import { PartContextType } from "@/types";
import { useAddPart } from "@/hooks"; // Import the custom hook

// Create context with undefined as default value
const PartContext = createContext<PartContextType | undefined>(undefined);

export const PartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [combinations, setCombinations] = useState<number[]>([0]); // Changed initial value to empty array
  const [partName, setPartName] = useState<string>("");
  const [partPrice, setPartPrice] = useState<string>("");
  const [partType, setPartType] = useState<string>("");
  const [notification, setNotification] = useState<Record<string, string>>({});

  // Reset form function after successful submission
  const resetForm = () => {
    setPartName("");
    setPartPrice("");
    setPartType("");
    setCombinations([0]);
  };

  const handleNotification = (type: string, message: string) => {
    // Added types
    setNotification({ type, message });
  };

  // Use the handleForm hook
  const handleForm = useAddPart(
    partName,
    partPrice,
    partType,
    combinations,
    resetForm,
    handleNotification,
  );

  const value: PartContextType = {
    // Ensure type matches PartContextType
    combinations,
    partName,
    partPrice,
    partType,
    notification,
    setCombinations,
    setPartPrice,
    setPartName,
    setPartType,
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
