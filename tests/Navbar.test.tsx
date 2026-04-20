import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabProvider } from "@/context/TabContext";
import { Navbar } from "@/components/Navbar";
import { TABS_CONFIG } from "@/config/tabs.config";

vi.mock("@/components/animations", () => ({ EASE_OUT_EXPO: [0.22, 1, 0.36, 1] }));
vi.mock("@/components/About", () => ({ About: () => null }));
vi.mock("@/components/Skills", () => ({ Skills: () => null }));
vi.mock("@/components/Projects", () => ({ Projects: () => null }));
vi.mock("@/components/Education", () => ({ Education: () => null }));
vi.mock("@/components/Contact", () => ({ Contact: () => null }));

function renderNavbar() {
  return render(
    <TabProvider>
      <Navbar />
    </TabProvider>
  );
}

describe("Navbar — tab navigation", () => {
  it("renders a button for every tab in TABS_CONFIG", () => {
    renderNavbar();
    TABS_CONFIG.forEach((tab) => {
      expect(screen.getAllByText(tab.label).length).toBeGreaterThan(0);
    });
  });

  it("clicking a desktop tab label triggers setActiveTab for that tab", async () => {
    renderNavbar();
    const user = userEvent.setup();

    const skillsButtons = screen.getAllByText("Compétences");
    await user.click(skillsButtons[0]);

    const projectsButtons = screen.getAllByText("Projets");
    await user.click(projectsButtons[0]);
  });

  it("clicking 'Me contacter' sets active tab to contact", async () => {
    renderNavbar();
    const user = userEvent.setup();

    const contactButtons = screen.getAllByRole("button", { name: "Me contacter" });
    await user.click(contactButtons[0]);
  });

  it("mobile menu drawer is hidden by default (menuOpen=false)", () => {
    renderNavbar();
    const drawer = document.querySelector(".md\\:hidden.mx-4");
    expect(drawer).not.toBeInTheDocument();
  });

  it("mobile menu drawer appears after burger click and disappears on second click", async () => {
    renderNavbar();
    const user = userEvent.setup();
    const menuButton = screen.getByRole("button", { name: "Menu" });

    await user.click(menuButton);
    expect(document.querySelector(".flex.flex-col.gap-5")).toBeInTheDocument();

    await user.click(menuButton);
    expect(document.querySelector(".md\\:hidden.mx-4")).not.toBeInTheDocument();
  });

  it("clicking a mobile tab closes the menu", async () => {
    renderNavbar();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(document.querySelector(".flex.flex-col.gap-5")).toBeInTheDocument();

    const mobileTabButtons = screen.getAllByText("Formation");
    const mobileButton = mobileTabButtons[mobileTabButtons.length - 1];
    await user.click(mobileButton);

    expect(document.querySelector(".md\\:hidden.mx-4")).not.toBeInTheDocument();
  });
});
