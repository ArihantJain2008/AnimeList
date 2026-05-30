import { useEffect, useState } from "react";
import {
  Link,
  NavLink,
} from "react-router-dom";
import PageContainer from "./PageContainer";
import Button from "../ui/Button";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Seasonal", to: "/seasonal" },
  { label: "Calendar", to: "/calendar" },
  { label: "Upcoming", to: "/upcoming" },
  { label: "Search", to: "/search" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);
  const [isScrolled, setIsScrolled] =
    useState(
      () =>
        typeof window !== "undefined" &&
        window.scrollY > 8
    );

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    return (
      localStorage.getItem("theme") ||
      "dark"
    );
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const linkClass = ({ isActive }) =>
    `relative rounded-lg px-3 py-2 text-sm font-medium transition duration-200 after:absolute after:bottom-1 after:left-3 after:h-0.5 after:rounded-full after:transition-all after:duration-300 ${
      isActive
        ? "text-indigo-600 after:w-[calc(100%-1.5rem)] after:bg-indigo-500 dark:text-indigo-300"
        : "text-slate-700 after:w-0 after:bg-slate-300 hover:-translate-y-0.5 hover:bg-slate-100/80 hover:text-slate-900 hover:after:w-[calc(100%-1.5rem)] dark:text-slate-300 dark:after:bg-slate-500 dark:hover:bg-slate-800/80 dark:hover:text-slate-100"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "border-b border-slate-200/70 bg-white/72 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72 dark:shadow-black/25"
          : "border-b border-transparent bg-transparent backdrop-blur-0"
      }`}
    >
      <PageContainer>
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-sm font-black text-white">
              AT
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
              AniTrack
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={() =>
                  setIsMenuOpen(false)
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                setTheme((current) =>
                  current === "dark"
                    ? "light"
                    : "dark"
                )
              }
              className="px-3"
              aria-label="Toggle color theme"
            >
              {theme === "dark"
                ? "Light"
                : "Dark"}
            </Button>

            <Button
              variant="ghost"
              onClick={() =>
                setIsMenuOpen((open) => !open)
              }
              className="px-3 md:hidden"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? "Close" : "Menu"}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-slate-200/70 py-3 md:hidden dark:border-slate-800/80">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={linkClass}
                  onClick={() =>
                    setIsMenuOpen(false)
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </PageContainer>
    </header>
  );
}

export default Navbar;
