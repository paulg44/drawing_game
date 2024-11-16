import { screen, render } from "@testing-library/react";
import Display from "../Components/Display";
import { MemoryRouter } from "react-router-dom";
import { CategoryProvider } from "../context/CategoryContext";

test("renders with a header and image", async () => {
  const category = {
    name: "shapes",
    items: [
      { id: 1, name: "circle", image: "/test/circle.jpg" },
      { id: 2, name: "square", image: "/test/square.jpg" },
      { id: 3, name: "triangle", image: "/test/triangle.jpg" },
      { id: 4, name: "star", image: "/test/star.jpg" },
    ],
  };
  render(
    <MemoryRouter>
      <CategoryProvider initialCategory={category}>
        <Display />
      </CategoryProvider>
    </MemoryRouter>
  );

  const heading = await screen.findByRole("heading");
  expect(heading).toBeInTheDocument();

  const image = screen.getByRole("img");
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src");
});
