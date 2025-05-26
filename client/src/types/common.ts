import { ReactNode } from "react";

export interface ProviderProps {
  children: ReactNode;
  randomItem?: { name: string };
  initialSound: boolean;
}
