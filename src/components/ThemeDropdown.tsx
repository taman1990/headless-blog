"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const options = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export default function ThemeDropdown() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const current =
    theme === "system" ? systemTheme ?? "dark" : theme;

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="
          inline-flex items-center justify-center
          h-7 w-7
          rounded-md
          border border-border
          bg-surface
          text-xs
          text-text-secondary
          cursor-pointer
          transition-colors
          hover:text-accent
          hover:border-accent
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-accent
        "
      >
        {current === "dark" ? "🌙" : "☀️"}
        <span className="sr-only">Theme</span>
      </button>

      {/* Drop-up menu */}
      {open && (
        <div
          role="menu"
          className="
            absolute right-0 bottom-full mb-2
            w-32
            rounded-md
            border border-border
            bg-surface
            shadow-lg
            z-50
          "
        >
          <ul className="py-1 text-sm">
            {options.map((opt) => {
              const isActive = theme === opt.value;

              return (
                <li key={opt.value}>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setTheme(opt.value);
                      setOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-2
                      px-3 py-1.5
                      cursor-pointer
                      transition-colors
                      ${
                        isActive
                          ? "text-accent"
                          : "text-text-secondary hover:text-accent"
                      }
                    `}
                  >
                    {/* Checkmark column */}
                    <span
                      className="
                        w-4 text-center
                        text-xs
                        opacity-100
                      "
                      aria-hidden
                    >
                      {isActive ? "✓" : ""}
                    </span>

                    {/* Label */}
                    <span>{opt.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
