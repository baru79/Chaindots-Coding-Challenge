import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routesConfig } from "../lib/routes-config";

describe("ErrorPage", () => {
  it("should render ErrorPage", () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/error"],
    });

    render(<RouterProvider router={router} />);
    const errorMessage = screen.getByText(
      "Sorry, an unexpected error has occurred."
    );
    const errorStatus = screen.getByText("Not Found");
    expect(errorMessage).toBeInTheDocument();
    expect(errorStatus).toBeInTheDocument();
  });
});
