import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import CanvasToolbar from "../../Components/Canvas/CanvasToolbar";
import { expect, vi } from "vitest";

test("toolbar has three buttons", () => {
  render(<CanvasToolbar />);

  const btns = screen.getAllByRole("button");

  expect(btns).toHaveLength(3);
});

test("onGetScore is called when button clicked", async () => {
  const mockOnGetScore = vi.fn();

  render(<CanvasToolbar onGetScore={mockOnGetScore} />);

  const onGetScoreBtn = screen.getByTestId("submitImageBtn");

  user.click(onGetScoreBtn);

  expect(mockOnGetScore).toHaveBeenCalled();
});

test("onClear is called when button clicked", async () => {
  const mockOnClear = vi.fn();

  render(<CanvasToolbar onClear={mockOnClear} />);

  const onClearBtn = screen.getByTestId("clearAllBtn");

  user.click(onClearBtn);

  expect(mockOnClear).toHaveBeenCalled();
});
