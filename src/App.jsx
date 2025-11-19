import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";
import Auth from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { Categories } from "./pages/Categories";
import { AddCategory } from "./pages/AddCategory";
import { Expenses } from "./pages/Expenses";
import { AddExpense } from "./pages/AddExpense";
import ProtectedRoute from "./ProtectedRoute";
import { Navbar } from "./components/Navbar";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";

function AppContent() {
  const [open, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
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

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
