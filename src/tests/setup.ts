import { afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import mediaQuery from "css-mediaquery";

export function createMatchMedia(width: number | string) {
  return (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    media: query,
    onchange: null,
    addListener: () => vi.fn(),
    removeListener: () => vi.fn(),
    addEventListener: () => vi.fn(),
    removeEventListener: () => vi.fn(),
    dispatchEvent: vi.fn(),
  });
}

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  window.matchMedia = createMatchMedia(window.innerWidth);
});
