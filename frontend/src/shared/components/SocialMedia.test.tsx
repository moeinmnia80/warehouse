import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";

import { SocialMedia } from "@/shared";

describe("SocialMedia", () => {
  it("should render the social media icons", () => {
    render(<SocialMedia className="size-3" data-testid="social-media" />);
    const socialMediaElement = screen.getByTestId("social-media");

    expect(socialMediaElement).toBeInTheDocument();
  });

  it("should render all 5 social media icons", () => {
    const { container } = render(<SocialMedia className="size-3" />);

    const svgElements = container.querySelectorAll("svg");
    expect(svgElements).toHaveLength(5);
  });

  it("should apply custom className to all SVG icons", () => {
    const { container } = render(<SocialMedia className="size-3" />);

    const svgElements = container.querySelectorAll("svg");
    svgElements.forEach((svg) => {
      expect(svg).toHaveClass("size-3");
    });
  });
});
