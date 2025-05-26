import { createContext, useContext, useState } from "react";
import { SoundContextTypes } from "../types/soundContextTypes";
import { ProviderProps } from "../types/common";

const SoundContext = createContext<SoundContextTypes | null>(null);

export function SoundProvider({
  children,
  initialSound = true,
}: ProviderProps) {
  const [enableSound, setEnableSound] = useState(initialSound);
  return (
    <SoundContext.Provider value={{ enableSound, setEnableSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
