import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { TabProvider, useTab } from "@/context/TabContext";
import { TabShell } from "@/components/TabShell";
import type { TabId } from "@/context/TabContext";

vi.mock("@/components/About", () => ({ About: () => <div>Section About</div> }));
vi.mock("@/components/Skills", () => ({ Skills: () => <div>Section Skills</div> }));
vi.mock("@/components/Projects", () => ({ Projects: () => <div>Section Projects</div> }));
vi.mock("@/components/Education", () => ({ Education: () => <div>Section Education</div> }));
vi.mock("@/components/Contact", () => ({ Contact: () => <div>Section Contact</div> }));
vi.mock("@/components/animations", () => ({ EASE_OUT_EXPO: [0.22, 1, 0.36, 1] }));

function renderWithTab(initialTab: TabId = "about") {
  let externalSetTab: (id: TabId) => void;

  function Harness() {
    const { setActiveTab } = useTab();
    externalSetTab = setActiveTab;
    return <TabShell />;
  }

  render(
    <TabProvider>
      <Harness />
    </TabProvider>
  );

  return {
    switchTab: (id: TabId) => act(() => externalSetTab(id)),
  };
}

describe("TabShell", () => {
  it("renders the About section on initial load", () => {
    renderWithTab();
    expect(screen.getByText("Section About")).toBeInTheDocument();
  });

  it("renders the section matching the active tab", async () => {
    const { switchTab } = renderWithTab();

    await switchTab("skills");
    expect(screen.getByText("Section Skills")).toBeInTheDocument();

    await switchTab("projects");
    expect(screen.getByText("Section Projects")).toBeInTheDocument();
  });

  it("renders only one section at a time", async () => {
    const { switchTab } = renderWithTab();
    await switchTab("contact");

    expect(screen.queryByText("Section About")).not.toBeInTheDocument();
    expect(screen.getByText("Section Contact")).toBeInTheDocument();
  });

  it("renders every section correctly when cycling through all tabs", async () => {
    const { switchTab } = renderWithTab();
    const cases: Array<[TabId, string]> = [
      ["about", "Section About"],
      ["skills", "Section Skills"],
      ["projects", "Section Projects"],
      ["education", "Section Education"],
      ["contact", "Section Contact"],
    ];

    for (const [id, expectedText] of cases) {
      await switchTab(id);
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    }
  });
});
