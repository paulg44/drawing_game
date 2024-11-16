import { screen, render } from "@testing-library/react";
import Homepage from "../Pages/Homepage";
import { MemoryRouter } from "react-router-dom";
import { CategoryProvider } from "../context/CategoryContext";

test("homepage renders with pick a category", async () => {
  render(
    <MemoryRouter>
      <CategoryProvider>
        <Homepage />
      </CategoryProvider>
    </MemoryRouter>
  );

  const header = screen.getByRole("heading", { name: /pick a category/i });

  expect(header).toBeInTheDocument();
});

test("renders with 4 category btns and a game start btn", async () => {
  render(
    <CategoryProvider>
      <MemoryRouter>
        <Homepage />
      </MemoryRouter>
    </CategoryProvider>
  );

  const btns = await screen.findAllByRole("button");

  expect(btns).toHaveLength(5);
});
