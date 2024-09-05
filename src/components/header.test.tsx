import { describe, it, expect, vi } from "vitest";
import { screen, render, waitFor, within } from "@testing-library/react";
import Header from "./header";
import userEvent from "@testing-library/user-event";
import { createMatchMedia } from "../tests/setup";
import { mockUser } from "../tests/mocks";
import Wrapper from "../tests/wrapper";

describe("Header", () => {
  it("should Autocomplete input match (max-width:425px)", () => {
    window.matchMedia = createMatchMedia(425);
    render(
      <Wrapper usr={mockUser}>
        <Header />
      </Wrapper>
    );
    const inputAutocomplete = screen.getByTestId("autocomplete-matches");
    expect(inputAutocomplete.ariaLabel).to.equal("autocomplete-matches-true");
  });

  it("should Autocomplete input match (max-width:1024px)", () => {
    window.matchMedia = createMatchMedia(1024);
    render(
      <Wrapper usr={mockUser}>
        <Header />
      </Wrapper>
    );
    const inputAutocomplete = screen.getByTestId("autocomplete-matches");
    expect(inputAutocomplete.ariaLabel).to.equal("autocomplete-matches-false");
  });

  it("should all Autocomplete options match (max-width:425px)", async () => {
    window.matchMedia = createMatchMedia(425);
    render(
      <Wrapper usr={mockUser}>
        <Header />
      </Wrapper>
    );
    const inputSearch = screen.getByPlaceholderText("Search city");
    await vi.waitFor(() => expect(inputSearch).toBeDefined());
    await userEvent.type(inputSearch, "Buenos Aires{enter}");
    await vi.waitFor(() => screen.getByRole("listbox"), {
      timeout: 2000,
    });
    const optionsAutocomplete = screen.getAllByTestId(
      "autocomplete-option-matches"
    );
    expect(
      optionsAutocomplete.every(
        (optAutocomplete) =>
          optAutocomplete.ariaLabel === "autocomplete-option-matches-true"
      )
    ).to.equal(true);
  });

  it("should all Autocomplete options match (max-width:1024px)", async () => {
    window.matchMedia = createMatchMedia(1024);
    render(
      <Wrapper usr={mockUser}>
        <Header />
      </Wrapper>
    );
    const inputSearch = screen.getByPlaceholderText("Search city");
    await waitFor(() => expect(inputSearch).toBeDefined());
    await userEvent.type(inputSearch, "Buenos Aires{enter}");
    await waitFor(() => screen.getByRole("listbox"), {
      timeout: 2000,
    });
    const optionsAutocomplete = screen.getAllByTestId(
      "autocomplete-option-matches"
    );
    expect(
      optionsAutocomplete.every(
        (optAutocomplete) =>
          optAutocomplete.ariaLabel === "autocomplete-option-matches-false"
      )
    ).to.equal(true);
  });

  it("should render options on Autocomplete input", async () => {
    render(
      <Wrapper usr={mockUser}>
        <Header />
      </Wrapper>
    );
    const inputSearch = screen.getByPlaceholderText("Search city");
    await waitFor(() => expect(inputSearch).toBeDefined());
    await userEvent.type(inputSearch, "Buenos Aires{enter}");
    const listbox = await waitFor(() => screen.getByRole("listbox"), {
      timeout: 2000,
    });
    await userEvent.click(within(listbox).queryAllByRole("option")[0]);
    expect(within(listbox).queryAllByRole("option").length).toBeGreaterThan(0);
  });

  it("should click on close icon", async () => {
    render(
      <Wrapper usr={mockUser}>
        <Header />
      </Wrapper>
    );
    const inputSearch = screen.getByPlaceholderText("Search city");
    await waitFor(() => expect(inputSearch).toBeDefined());
    await userEvent.type(inputSearch, "Buenos Aires{enter}");
    const listbox = await waitFor(() => screen.getByRole("listbox"), {
      timeout: 2000,
    });
    await userEvent.click(within(listbox).queryAllByRole("option")[0]);
    const iconClose = screen.getByTitle("Clear");
    await userEvent.click(iconClose);
    expect(inputSearch).toHaveValue("");
  });
});
