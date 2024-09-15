// Base types for commonly used structures
export interface DataItem {
  id: string;
  name: string;
}

// Grouped parts based on their type
export type GroupedParts = Record<string, Parts[]>;

// Option structure for dropdowns or similar UI components
export interface Option {
  id: string;
  name: string;
}

// Grouped options used in forms, with label and associated options
export interface OptionGroup {
  id: string;
  label: string;
  options: Option[];
}

// Form data interface for adding products
export interface FormData {
  productName: string;
  productPrice: string;
  localSelectedOptions: Record<string, string[]>; // Tracks selected options
  combinations: number[]; // Stores selected combination indices
}

// Context for managing state in the AddProduct component
export interface ProductContextType {
  localSelectedOptions: Record<string, string[]>;
  notification: Record<string, string>; // Holds notification messages
  productName: string;
  productPrice: string;
  condition: string;
  combinations: Record<string, string[]>; // Holds prohibited combinations
  prohibitedOptions: string[];
  setLocalSelectedOptions: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  setProductName: React.Dispatch<React.SetStateAction<string>>;
  setProductPrice: React.Dispatch<React.SetStateAction<string>>; // Consistency: use number instead of string for price
  setCombinations: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  resetForm: React.MouseEventHandler<HTMLButtonElement>;
  handleForm: React.MouseEventHandler<HTMLButtonElement>;
  data: GroupedParts[] | undefined; // Optional data state
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
}

// Defines a product and its attributes
export interface Product {
  id: string;
  name: string;
  categoryId: string;
  basePrice: number; // Base price as number for consistency
  productParts: Parts[];
  prohibitedCombinations: Record<
    string,
    { options: string[]; condition: string }
  >;
}

// Defines individual product parts with optional visual classes
export interface Parts {
  id: string;
  name: string;
  type: string;
  price: number; // Price as number for easier calculations
  stock: boolean;
  class?: string; // Optional: CSS class for visual styling
  selectedClass?: string; // Optional: CSS class for selected state
}

// Context for managing state in the AddProduct component
export interface PartContextType {
  localSelectedOptions: Record<string, string[]>;
  notification: Record<string, string>; // Holds notification messages
  productName: string;
  productPrice: string;
  condition: string;
  combinations: Record<string, string[]>; // Holds prohibited combinations
  prohibitedOptions: string[];
  setLocalSelectedOptions: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  setProductName: React.Dispatch<React.SetStateAction<string>>;
  setProductPrice: React.Dispatch<React.SetStateAction<string>>; // Consistency: use number instead of string for price
  setCombinations: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  resetForm: React.MouseEventHandler<HTMLButtonElement>;
  handleForm: React.MouseEventHandler<HTMLButtonElement>;
  data: GroupedParts[] | undefined; // Optional data state
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
}
