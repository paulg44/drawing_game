import { createContext, useContext, useState } from "react";
import { SoundContextTypes } from "../types/soundContextTypes";
import { ProviderPropsTypes } from "../types/common";

const SoundContext = createContext<SoundContextTypes | null>(null);

interface SoundProviderProps extends ProviderPropsTypes {
  initialSound?: boolean;
}

export function SoundProvider({
  children,
  initialSound = true,
}: SoundProviderProps) {
  const [enableSound, setEnableSound] = useState<boolean>(initialSound);
  return (
    <SoundContext.Provider value={{ enableSound, setEnableSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
