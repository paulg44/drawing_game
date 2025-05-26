export type ToolType = "pen" | "eraser";

export interface LinesType {
  tool: ToolType;
  points: number[];
  color: string;
}

export interface CanvasContextType {
  tool: ToolType;
  setTool: (tool: ToolType) => void;
  color: string;
  setColor: (color: string) => void;
  lines: any[];
  stageRef: React.RefObject<any>;
  clearCanvas: () => void;
  handleMouseDown: (e: any) => void;
  handleMouseUp: (e: any) => void;
  handleMouseMove: (e: any) => void;
}
