import { Link } from "react-router-dom";

export function Navbar({ open, setOpen }) {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  return (
    <>
      <nav className="backdrop-blur-xl bg-gray-900/80 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-40 shadow-lg">
        {token && (
          <button
            onClick={() => setOpen(!open)}
            className="text-white hover:text-blue-400 transition"
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
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900/95 text-white p-6 z-50 shadow-xl border-r border-gray-700 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
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
          <Link className="hover:text-blue-400 transition" to="/add-category">Add Category</Link>
          <Link className="hover:text-blue-400 transition" to="/expenses">Expenses</Link>
          <Link className="hover:text-blue-400 transition" to="/add-expense">Add Expense</Link>

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
