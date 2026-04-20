import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { TabProvider, useTab } from "@/context/TabContext";
import type { TabId } from "@/context/TabContext";

function wrapper({ children }: { children: React.ReactNode }) {
  return <TabProvider>{children}</TabProvider>;
}

describe("useTab", () => {
  it("throws when used outside TabProvider", () => {
    expect(() => renderHook(() => useTab())).toThrow(
      "useTab must be used within TabProvider"
    );
  });

  it("returns 'about' as the initial active tab", () => {
    const { result } = renderHook(() => useTab(), { wrapper });
    expect(result.current.activeTab).toBe("about");
  });

  it("updates activeTab when setActiveTab is called", () => {
    const { result } = renderHook(() => useTab(), { wrapper });

    act(() => {
      result.current.setActiveTab("projects");
    });

    expect(result.current.activeTab).toBe("projects");
  });

  it("accepts all valid TabId values without error", () => {
    const { result } = renderHook(() => useTab(), { wrapper });
    const validIds: TabId[] = ["about", "skills", "projects", "education", "contact"];

    validIds.forEach((id) => {
      act(() => {
        result.current.setActiveTab(id);
      });
      expect(result.current.activeTab).toBe(id);
    });
  });

  it("exposes a stable setActiveTab reference across renders", () => {
    const { result, rerender } = renderHook(() => useTab(), { wrapper });
    const firstRef = result.current.setActiveTab;

    act(() => {
      result.current.setActiveTab("skills");
    });
    rerender();

    expect(result.current.setActiveTab).toBe(firstRef);
  });
});
