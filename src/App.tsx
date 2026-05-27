import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";

const DARK_MODE_KEY = "darkModePreference";
const DARK_MODE_TTL = 4 * 60 * 60 * 1000; // 4 hours in ms

function getSavedDarkMode(): boolean | null {
  try {
    const raw = localStorage.getItem(DARK_MODE_KEY);
    if (!raw) return null;
    const { value, savedAt } = JSON.parse(raw);
    if (Date.now() - savedAt > DARK_MODE_TTL) {
      localStorage.removeItem(DARK_MODE_KEY);
      return null;
    }
    return value as boolean;
  } catch {
    return null;
  }
}

function useDarkMode() {
  const [dark, setDarkState] = useState<boolean>(() => {
    const saved = getSavedDarkMode();
    return saved !== null
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const setDark = (value: boolean) => {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify({ value, savedAt: Date.now() }));
    setDarkState(value);
  };

  return [dark, setDark] as const;
}

function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [dark, setDark] = useDarkMode();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-transparent text-gray-900 dark:text-white">
      {!isHome && <Nav />}

      {/* Dark mode toggle — pill switch */}
      <div className="hidden md:block max-w-5xl mx-auto px-8 pt-5">
        <div className="flex justify-end">
        <div
          onClick={() => setDark(!dark)}
          role="switch"
          aria-checked={dark}
          aria-label="Toggle dark mode"
          className="flex items-center gap-0.5 p-0.5 rounded-xl bg-gray-200 dark:bg-gray-700 border border-gray-300/40 dark:border-gray-500/40 cursor-pointer transition-colors duration-150"
        >

        {/* Sun */}
        <div className={`w-6 h-6 flex items-center justify-center rounded-lg transition-all duration-300 ${!dark ? "bg-white shadow text-gray-900" : "text-gray-600 dark:text-gray-300"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </div>
        {/* Moon */}
        <div className={`w-6 h-6 flex items-center justify-center rounded-lg transition-all duration-300 ${dark ? "bg-gray-200 shadow text-gray-900" : "text-gray-600 dark:text-gray-300"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
        </div>
        </div>
      </div>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-8 z-50 flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-full bg-gray-500 dark:bg-gray-200 text-white dark:text-gray-900 border border-gray-500/60 dark:border-gray-200/60 hover:bg-gray-600 dark:hover:bg-gray-100 shadow-md transition-all duration-300 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
        Back to top
      </button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
