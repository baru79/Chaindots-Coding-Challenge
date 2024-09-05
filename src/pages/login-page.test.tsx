import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import LoginPage from "./login-page";
import Wrapper from "../tests/wrapper";

describe("LoginPage", () => {
  it("should render LoginPage", () => {
    render(
      <Wrapper usr={null}>
        <LoginPage />
      </Wrapper>
    );
    const title = screen.getByText("Log in to continue.");
    expect(title).toBeInTheDocument();
  });
});
