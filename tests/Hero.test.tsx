import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabProvider, useTab } from "@/context/TabContext";
import { Hero } from "@/components/Hero";
import type { TabId } from "@/context/TabContext";

vi.mock("@/components/animations", () => ({ EASE_OUT_EXPO: [0.22, 1, 0.36, 1] }));

function renderHeroWithTabSpy() {
  let capturedTab: TabId | null = null;

  function Spy() {
    const { activeTab } = useTab();
    capturedTab = activeTab;
    return null;
  }

  render(
    <TabProvider>
      <Hero />
      <Spy />
    </TabProvider>
  );

  return { getActiveTab: () => capturedTab };
}

describe("Hero — CTA buttons", () => {
  it("renders the 'Voir mes projets' CTA button", () => {
    renderHeroWithTabSpy();
    expect(screen.getByRole("button", { name: "Voir mes projets" })).toBeInTheDocument();
  });

  it("renders the 'Me contacter' CTA button", () => {
    renderHeroWithTabSpy();
    expect(screen.getByRole("button", { name: "Me contacter" })).toBeInTheDocument();
  });

  it("clicking 'Voir mes projets' sets active tab to 'projects'", async () => {
    const { getActiveTab } = renderHeroWithTabSpy();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Voir mes projets" }));

    expect(getActiveTab()).toBe("projects");
  });

  it("clicking 'Me contacter' sets active tab to 'contact'", async () => {
    const { getActiveTab } = renderHeroWithTabSpy();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Me contacter" }));

    expect(getActiveTab()).toBe("contact");
  });

  it("tab is still 'about' before any CTA click", () => {
    const { getActiveTab } = renderHeroWithTabSpy();
    expect(getActiveTab()).toBe("about");
  });
});
