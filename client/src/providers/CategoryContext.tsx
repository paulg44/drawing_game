import { createContext, useContext, useState } from "react";
import { ProviderPropsTypes } from "../types/common";
import {
  CategoryContextType,
  CategoryType,
} from "../types/categoryContextTypes";

// Creates a new context
const CategoryContext = createContext<CategoryContextType | null>(null);

// Two ways of doing this. Can either extend the common one we are importing or create a new interface (like I have for score, check scoreContextTypes.ts)
interface CategoryProviderProps extends ProviderPropsTypes {
  initialCategory?: CategoryType | null;
}

// Wraps part of the app in this provider to share the category state. children represents the components that will have access to this context
export const CategoryProvider = ({
  children,
  initialCategory = null,
}: CategoryProviderProps) => {
  // This is the variable for the currently selected category
  const [category, setCategory] = useState<CategoryType | null>(
    initialCategory
  );
  return (
    // Makes the category state and updater function available to all children components via context
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Custom hook to access the category context (category and setCategory) from any component
export const useCategory = (): CategoryContextType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
