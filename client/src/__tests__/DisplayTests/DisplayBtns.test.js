import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import DisplayBtns from "../../Components/RandomItemDisplay/DisplayBtns";

test("renders with two buttons", async () => {
  render(<DisplayBtns />);

  const btns = screen.getAllByRole("button");
  expect(btns).toHaveLength(2);
});

test("onRespin gets called on button click", async () => {
  const mock = jest.fn();
  render(<DisplayBtns onRespin={mock} />);

  const respinBtn = screen.getByTestId("respinBtn");

  user.click(respinBtn);

  expect(mock).toHaveBeenCalled();
});

test("onSound gets called on button click", async () => {
  const mock = jest.fn();
  render(<DisplayBtns onSound={mock} />);

  const soundBtn = screen.getByTestId("soundBtn");

  user.click(soundBtn);

  expect(mock).toHaveBeenCalled();
});
