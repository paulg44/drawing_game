export interface CategoryType {
  name: string;
  items: string[];
}

export interface CategoryContextType {
  category: CategoryType | null;
  setCategory: (category: CategoryType) => void;
}
