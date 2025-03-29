import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export function CategoryProvider({ children, initialCategory = null }) {
  const [category, setCategory] = useState(initialCategory);
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  return useContext(CategoryContext);
}
