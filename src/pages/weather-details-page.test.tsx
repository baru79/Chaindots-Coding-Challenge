import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { mockUser } from "../tests/mocks";
import WeatherDetailsPage from "./weather-details-page";
import Wrapper from "../tests/wrapper";

describe("WeatherDetailsPage", () => {
  it("should render WeatherDetailsPage", () => {
    render(
      <Wrapper usr={mockUser}>
        <WeatherDetailsPage />
      </Wrapper>
    );
    const h1 = screen.getByRole("heading", {
      level: 1,
      name: "Weather Details",
    });
    expect(h1).toBeInTheDocument();
  });
});
