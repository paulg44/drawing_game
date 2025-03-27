import { createContext, useContext, useState } from "react";

const SoundContext = createContext();

export function SoundProvider({ children, initialSound = true }) {
  const [enableSound, setEnableSound] = useState(initialSound);
  return (
    <SoundContext.Provider value={{ enableSound, setEnableSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useCategory() {
  return useContext(SoundContext);
}
