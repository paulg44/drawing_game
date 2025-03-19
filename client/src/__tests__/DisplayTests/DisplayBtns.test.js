import { screen, render } from "@testing-library/react";
import DisplayBtns from "../../Components/RandomItemDisplay/DisplayBtns";

test("renders two buttons", () => {
  render(<DisplayBtns />);
  expect(screen.getAllByRole("button")).toHaveLength(2);
});
