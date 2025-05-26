import { createContext, useContext, useState } from "react";
import { ProviderProps } from "../types/common";
import { CategoryContextType } from "../types/categoryContextTypes";

// Creates a new context
const CategoryContext = createContext<CategoryContextType | null>(null);

interface CategoryProviderProps extends ProviderProps {
  initialCategory?: string | null;
}

// Wraps part of the app in this provider to share the category state. children represents the components that will have access to this context
export const CategoryProvider = ({
  children,
  initialCategory = null,
}: CategoryProviderProps) => {
  // This is the variable for the currently selected category
  const [category, setCategory] = useState<string | null>(initialCategory);
  return (
    // Makes the category state and updater function available to all children components via context
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to access the category context (category and setCategory) from any component
export const useCategory = () => useContext(CategoryContext);
