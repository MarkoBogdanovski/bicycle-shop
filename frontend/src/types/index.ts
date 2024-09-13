export interface DataItem {
  id: string;
  name: string;
}

export interface Part {
  id: string;
  name: string;
  type: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export type GroupedParts = {
  [key: string]: Part[];
};

export interface Option {
  id: string;
  name: string;
}

export interface OptionGroup {
  id: string;
  label: string;
  options: Option[];
}

export interface GroupedData {
  [key: string]: OptionGroup;
}

export interface FormData {
  productName: string;
  productPrice: string;
  localSelectedOptions: Record<string, string[]>;
  combinations: number[];
}

export interface AddProductContextType {
  localSelectedOptions: Record<string, string[]>;
  notification: string;
  productName: string;
  productPrice: number;
  condition: string;
  combinations: object;
  prohibitedOptions: string[];
  setLocalSelectedOptions: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  setProductName: React.Dispatch<React.SetStateAction<string>>;
  setProductPrice: React.Dispatch<React.SetStateAction<string>>;
  setCombinations: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  resetForm: React.MouseEventHandler<HTMLButtonElement>;
  handleForm: React.MouseEventHandler<HTMLButtonElement>;
  data: GroupedData[] | undefined;
  error: Error | null;
  isLoading: boolean;
  isError: boolean;
}
