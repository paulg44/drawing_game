import { ReactNode } from "react";

export interface ScorePropsTypes {
  children: ReactNode;
  randomItem?: { name: string };
}

export interface ScoreContextType {
  score: string;
  isDisabled: boolean;
  handleCalculateScore: () => Promise<void>;
}
