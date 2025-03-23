import { screen, render } from "@testing-library/react";
import Display from "../../Components/RandomItemDisplay/Display";
import { MemoryRouter } from "react-router-dom";
import { CategoryProvider } from "../../context/CategoryContext";

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

it("renders a message when no category is selected", () => {
  render(
    <MemoryRouter>
      <CategoryProvider initialCategory={category}>
        <Display />
      </CategoryProvider>
    </MemoryRouter>
  );

  expect(screen.getByText(/no category selected/i)).toBeInTheDocument();
});

it("renders with two buttons when random item is present", async () => {
  render(
    <MemoryRouter>
      <CategoryProvider initialCategory={category}>
        <Display randomItem={randomItem} />
      </CategoryProvider>
    </MemoryRouter>
  );

  const btns = screen.getAllByRole("button");
  expect(btns).toHaveLength(2);
});

it("renders with correct random header and image", async () => {
  render(
    <MemoryRouter>
      <CategoryProvider initialCategory={category}>
        <Display randomItem={randomItem} />
      </CategoryProvider>
    </MemoryRouter>
  );

  const header = screen.getByRole("heading", { name: /triangle/i });
  const image = screen.getByRole("img", { name: /triangle/i });

  expect(header).toBeInTheDocument();
  expect(image).toBeInTheDocument();
});
