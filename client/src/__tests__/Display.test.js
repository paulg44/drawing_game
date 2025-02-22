import { screen, render } from "@testing-library/react";
import Display from "../Components/Display";
import { MemoryRouter } from "react-router-dom";
import { CategoryProvider } from "../context/CategoryContext";

test("renders with two buttons and random item name", async () => {
  const category = {
    name: "shapes",
    items: [
      { id: 1, name: "circle", image: "/test/circle.jpg" },
      { id: 2, name: "square", image: "/test/square.jpg" },
      { id: 3, name: "triangle", image: "/test/triangle.jpg" },
      { id: 4, name: "star", image: "/test/star.jpg" },
    ],
  };

  const randomItem = category.items[2];

  render(
    <MemoryRouter>
      <CategoryProvider initialCategory={category}>
        <Display randomItem={randomItem} />
      </CategoryProvider>
    </MemoryRouter>
  );

  const btns = screen.getAllByRole("button");
  expect(btns).toHaveLength(2);

  const itemName = screen.getByRole("heading", { name: /triangle/i });
  expect(itemName).toBeInTheDocument();
});
