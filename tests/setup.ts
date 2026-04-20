import "@testing-library/jest-dom";
import { vi } from "vitest";
import { forwardRef, createElement } from "react";
import type React from "react";

const MOTION_PROPS_TO_STRIP = new Set([
  "initial", "animate", "exit", "transition",
  "whileHover", "whileTap", "variants", "layoutId",
]);

const motionComponentCache: Record<string, React.ForwardRefExoticComponent<React.PropsWithChildren<Record<string, unknown>>>> = {};

function getMotionComponent(tag: string) {
  if (!motionComponentCache[tag]) {
    motionComponentCache[tag] = forwardRef<unknown, React.PropsWithChildren<Record<string, unknown>>>(
      ({ children, ...props }, ref) => {
        const filtered = Object.fromEntries(
          Object.entries(props).filter(([k]) => !MOTION_PROPS_TO_STRIP.has(k))
        );
        return createElement(tag, { ...filtered, ref }, children as React.ReactNode);
      }
    );
    motionComponentCache[tag].displayName = `motion.${tag}`;
  }
  return motionComponentCache[tag];
}

vi.mock("framer-motion", () => ({
  motion: new Proxy({} as Record<string, unknown>, {
    get: (_target, tag: string) => getMotionComponent(tag),
  }),
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
  useAnimation: () => ({ start: vi.fn() }),
}));

Object.defineProperty(window, "scrollTo", { value: vi.fn(), writable: true });
