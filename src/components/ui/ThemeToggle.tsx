import type { ThemeMode } from "../../data/siteContent";

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={`Activate ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
      <span className="theme-toggle__thumb" aria-hidden="true" />
    </button>
  );
}
