import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import RegisterPage from "./register-page";
import Wrapper from "../tests/wrapper";

describe("RegisterPage", () => {
  it("should render RegisterPage", () => {
    render(
      <Wrapper usr={null}>
        <RegisterPage />
      </Wrapper>
    );
    const title = screen.getByText("Register to continue.");
    expect(title).toBeInTheDocument();
  });
});
