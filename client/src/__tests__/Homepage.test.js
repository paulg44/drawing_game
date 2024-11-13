import { screen, render } from "@testing-library/react";
import Homepage from "../Pages/Homepage";
import { MemoryRouter } from "react-router-dom";

test("homepage renders with pick a category", async () => {
  render(
    <MemoryRouter>
      <Homepage />
    </MemoryRouter>
  );

  const header = screen.getByRole("heading", { name: /pick a category/i });

  expect(header).toBeInTheDocument();
});

test("renders with 4 category btns and a game start btn", async () => {
  render(
    <MemoryRouter>
      <Homepage />
    </MemoryRouter>
  );

  const btns = await screen.findAllByRole("button");

  expect(btns).toHaveLength(5);
});
