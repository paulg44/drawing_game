export interface ScoreContextType {
  score: string;
  isDisabled: boolean;
  handleCalculateScore: () => Promise<void>;
}
