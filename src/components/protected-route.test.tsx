import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import ProtectedRoute from "./protected-route";
import { mockUser } from "../tests/mocks";
import { AuthenticatedContextProvider } from "../provider/authenticated-context-provider";
import { WeatherContextProvider } from "../provider/weather-context-provider";
import { MemoryRouter } from "react-router-dom";

describe("ProtectedRoute", () => {
  it("should render a protected route", () => {
    render(<ProtectedRoute />, {
      wrapper: ({ children }) => (
        <AuthenticatedContextProvider usr={mockUser}>
          <WeatherContextProvider>
            <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
          </WeatherContextProvider>
        </AuthenticatedContextProvider>
      ),
    });
  });
  it("should render not a protected route", () => {
    render(<ProtectedRoute />, {
      wrapper: ({ children }) => (
        <AuthenticatedContextProvider usr={null}>
          <WeatherContextProvider>
            <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
          </WeatherContextProvider>
        </AuthenticatedContextProvider>
      ),
    });
  });
});
