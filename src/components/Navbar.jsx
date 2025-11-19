import { Link } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export function Navbar({ open, setOpen }) {
  const token = localStorage.getItem("token");
  const { theme } = useContext(ThemeContext);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  return (
    <>
      <nav className={`backdrop-blur-xl p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40 shadow-lg ${theme === 'dark' ? 'bg-gray-900/80 text-white' : 'bg-gray-100 text-black'}`}>
        {token && (
          <button
            onClick={() => setOpen(!open)}
            className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:text-blue-400 transition`}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <h1 className="text-2xl font-bold tracking-wide">Expense Manager</h1>
        <ThemeToggleButton />
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-72 p-6 z-50 shadow-xl border-r transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} ${theme === 'dark' ? 'bg-gray-900/95 text-white border-gray-700' : 'bg-white text-black border-gray-200'}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Menu</h2>
          <button onClick={() => setOpen(false)} className="hover:text-red-400 transition">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4 text-lg">
          <Link className="hover:text-blue-400 transition" to="/">Dashboard</Link>
          <Link className="hover:text-blue-400 transition" to="/categories">Categories</Link>
          <Link className="hover:text-blue-400 transition" to="/expenses">Expenses</Link>

          <button
            onClick={logout}
            className="text-red-400 mt-6 border-t border-gray-700 pt-4 hover:text-red-300 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
