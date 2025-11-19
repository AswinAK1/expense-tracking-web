import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Budget App</h1>

      {token && (
        <div className="flex gap-6">
          <Link to="/">Dashboard</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/add-category">Add Category</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/add-expense">Add Expense</Link>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/auth";
            }}
            className="text-red-400"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
