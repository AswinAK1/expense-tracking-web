import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Auth from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { Categories } from "./pages/Categories";
import { AddCategory } from "./pages/AddCategory";
import { Expenses } from "./pages/Expenses";
import { AddExpense } from "./pages/AddExpense";
import ProtectedRoute from "./ProtectedRoute";
import { Navbar } from "./components/Navbar";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex bg-gray-900 min-h-screen text-white">
        <Navbar open={open} setOpen={setOpen} />

        <div className={`flex-1 transition-all duration-300 p-10 ${open ? "ml-72" : "ml-0"}`}>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path="/add-category" element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
            <Route path="/add-expense" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
