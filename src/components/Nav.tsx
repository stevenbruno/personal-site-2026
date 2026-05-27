import { NavLink } from "react-router-dom";

export default function Nav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "underline underline-offset-4" : "text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:underline hover:underline-offset-4 transition-colors duration-150";

  return (
    <nav className="flex items-center justify-between px-6 py-5 md:px-12">
      <NavLink to="/" className="font-semibold tracking-tight">
        Steven Bruno
      </NavLink>
      <div className="flex gap-8 text-sm">
        <NavLink to="/work" className={linkClass}>Work</NavLink>
        <NavLink to="/about" className={linkClass}>About</NavLink>
      </div>
    </nav>
  );
}
