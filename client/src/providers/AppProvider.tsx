/* File for global state management 
currently I'm looking at adding the respin/next, selected category, game statuses, user score functions. These are only used in one scenario in the current form, but there will be multiple game modes eventually
*/
import { createContext, useContext } from "react";
import { ProviderPropsTypes } from "../types/common";
import { AppContextType } from "../types/appContextTypes";

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: ProviderPropsTypes) => {
  // Delete this once added actual states, this is a placeholder for typescript
  const placeholder = null;
  return (
    <AppContext.Provider value={placeholder}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
