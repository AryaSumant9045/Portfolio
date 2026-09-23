"use client";

const STORAGE_KEY = "theme";

/**
 * Dark is the default and lives on `:root`; light is opt-in by setting
 * `data-theme="light"` on <html>. Which icon shows is decided purely in CSS,
 * so the markup is identical on the server and there is nothing to mismatch
 * during hydration.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";

    if (next === "light") root.dataset.theme = "light";
    else root.removeAttribute("data-theme");

    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — the choice just will not persist */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong bg-fill text-ink transition-colors duration-300 hover:border-aqua/60 hover:text-aqua ${
        className ?? ""
      }`}
    >
      <span className="relative block h-[18px] w-[18px]">
        {/* sun */}
        <svg viewBox="0 0 24 24" fill="none" className="theme-icon-sun" aria-hidden>
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
        {/* moon */}
        <svg viewBox="0 0 24 24" fill="none" className="theme-icon-moon" aria-hidden>
          <path
            d="M20 14.4A8.4 8.4 0 0 1 9.6 4a8.4 8.4 0 1 0 10.4 10.4Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
