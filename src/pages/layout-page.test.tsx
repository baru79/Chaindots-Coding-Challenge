import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import LayoutPage from "./layout-page";
import Wrapper from "../tests/wrapper";

describe("LayoutPage", () => {
  it("should render LayoutPage", () => {
    render(
      <Wrapper usr={null}>
        <LayoutPage />
      </Wrapper>
    );
    const card = screen.getByText("Challenge - Chaindots");
    expect(card).toBeInTheDocument();
  });
});
