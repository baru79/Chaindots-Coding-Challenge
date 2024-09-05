import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import FavoritesPage from "./favorites-page";
import { mockUser } from "../tests/mocks";
import Wrapper from "../tests/wrapper";

describe("FavoritesPage", () => {
  it("should render FavoritesPage", () => {
    render(
      <Wrapper usr={mockUser}>
        <FavoritesPage />
      </Wrapper>
    );
    const h1 = screen.getByRole("heading", { level: 1, name: "Favorites" });
    expect(h1).toBeInTheDocument();
  });
});
