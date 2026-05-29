import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

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
  const [dark, setDark] = useDarkMode();

  return (
    <div className="min-h-screen bg-white dark:bg-transparent text-gray-900 dark:text-white">
      {/* Dark mode toggle — pill switch */}
      <div className="hidden md:block max-w-[1180px] mx-auto px-8 pt-5">
        <div className="flex justify-end">
        <div
          onClick={() => setDark(!dark)}
          role="switch"
          aria-checked={dark}
          aria-label="Toggle dark mode"
          className="flex items-center gap-0.5 p-0.5 rounded-xl bg-gray-200 dark:bg-gray-700 border border-gray-300/40 dark:border-gray-500/40 cursor-pointer transition-colors duration-150"
        >

        {/* Sun */}
        <div className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-300 ${!dark ? "bg-white shadow text-gray-900" : "text-gray-600 dark:text-gray-300"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <div className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-300 ${dark ? "bg-gray-200 shadow text-gray-900" : "text-gray-600 dark:text-gray-300"}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
        </div>
        </div>
      </div>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

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
