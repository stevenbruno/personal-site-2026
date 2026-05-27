import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";

function useDarkMode() {
  const [dark, setDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return [dark, setDark] as const;
}

function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [dark, setDark] = useDarkMode();

  return (
    <div className="min-h-screen bg-white dark:bg-transparent text-gray-900 dark:text-white">
      {!isHome && <Nav />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* Dark mode toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed bottom-5 right-6 z-50 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
      >
        {dark ? "☀ Light" : "🌙 Dark"}
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
