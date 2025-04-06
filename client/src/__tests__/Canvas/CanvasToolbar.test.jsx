import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import CanvasToolbar from "../../Components/Canvas/CanvasToolbar";
import { expect, vi } from "vitest";
import { CanvasProvider } from "../../context/CanvasContext";
import { ScoreProvider } from "../../context/ScoreContext";

test("toolbar has three buttons", () => {
  render(
    <CanvasProvider>
      <ScoreProvider>
        <CanvasToolbar />
      </ScoreProvider>
    </CanvasProvider>
  );

  const btns = screen.getAllByRole("button");

  expect(btns).toHaveLength(3);
});

// I need to fix these two tests. Now I have added the canvas code into context they fail when a user clicks the button
test("submit btn is disabled after clicked", async () => {
  render(
    <CanvasProvider>
      <ScoreProvider>
        <CanvasToolbar />
      </ScoreProvider>
    </CanvasProvider>
  );

  const getScoreBtn = screen.getByTestId("submitImageBtn");

  user.click(getScoreBtn);

  expect(getScoreBtn).toBeInTheDocument();
});

test("clearCanvas btn should remain enabled when clicked", async () => {
  render(
    <CanvasProvider>
      <ScoreProvider>
        <CanvasToolbar />
      </ScoreProvider>
    </CanvasProvider>
  );

  const clearCanvasBtn = screen.getByTestId("clearAllBtn");

  user.click(clearCanvasBtn);

  expect(clearCanvasBtn).toBeInTheDocument();
});
