import { screen, render } from "@testing-library/react";
import DisplayBtns from "../../Components/RandomItemDisplay/DisplayBtns";

test("renders with two buttons", async () => {
  render(<DisplayBtns />);

  const btns = screen.getAllByRole("button");
  expect(btns).toHaveLength(2);
});
