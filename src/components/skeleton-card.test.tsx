import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import SkeletonCard from "./skeleton-card";

describe("SkeletonCard", () => {
  it("should render skeleton card", () => {
    render(<SkeletonCard />);
    const card = screen.getByTitle("skeleton-card");
    expect(card).toBeInTheDocument();
  });
});
