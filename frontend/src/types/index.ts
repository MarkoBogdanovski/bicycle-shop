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
