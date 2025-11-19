import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";


export default function Auth() {
  const [step, setStep] = useState("signup");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------- SIGNUP ----------------
  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", form);
      if (res.data.otpToken) {
        localStorage.setItem("otpToken", res.data.otpToken);
        setStep("otp");
      } else alert(res.data.message);
    } catch (err) {
      alert("Signup failed");
    }
    setLoading(false);
  };

  // ---------------- VERIFY OTP ----------------
  const handleVerifyOtp = async () => {
    const otpToken = localStorage.getItem("otpToken");
    if (!otpToken) return alert("Missing OTP Token");

    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { otp, otpToken });
      if (res.data.success) {
        localStorage.removeItem("otpToken");
              navigate("/");

        setStep("login");
      } else alert(res.data.message);
    } catch {
      alert("Invalid OTP");
    }
    setLoading(false);
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async () => {
  setLoading(true);
  try {
    const res = await api.post("/auth/login", {
      email: form.email,
      password: form.password,
    });
    localStorage.setItem("userId", res.data.user._id);

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);

      navigate("/");
      return;
    }

    alert(res.data.message);
  } catch (err) {
    console.log(err);
    alert("Login failed");
  }
  setLoading(false);
};


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-[90%] lg:w-[70%] bg-black/40 rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        <div className="hidden lg:flex flex-col items-center justify-center bg-yellow-50 p-10">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            Calculate Smarter,  
            <br />Spend Wiser …
          </h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png"
            className="w-72 h-72 object-contain"
            alt=""
          />
        </div>

        {/* ---------------- RIGHT SECTION (Form) ---------------- */}
        <div className="p-10 text-white flex flex-col justify-center">

          <h2 className="text-4xl font-semibold mb-10 text-center">
            Monthly <span className="text-green-400">Budget</span>
          </h2>

          {/* SIGNUP */}
          {step === "signup" && (
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Insert Your Name"
                className="w-full p-3 bg-transparent border-b border-gray-600 mb-6 focus:outline-none"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Insert Your Email"
                className="w-full p-3 bg-transparent border-b border-gray-600 mb-6 focus:outline-none"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Insert Password"
                className="w-full p-3 bg-transparent border-b border-gray-600 mb-6 focus:outline-none"
                onChange={handleChange}
              />

              <button
                onClick={handleSignup}
                className="w-full bg-yellow-400 text-black py-3 font-semibold rounded-md mt-4 hover:bg-yellow-300"
              >
                {loading ? "Sending OTP..." : "Start Your Calculation"}
              </button>

              <p className="text-center mt-4 text-sm">
                Already have an account?{" "}
                <span
                  className="text-blue-400 cursor-pointer"
                  onClick={() => setStep("login")}
                >
                  Login
                </span>
              </p>
            </>
          )}

          {/* OTP */}
          {step === "otp" && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full p-3 bg-transparent border-b border-gray-600 mb-6 focus:outline-none"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-yellow-400 text-black py-3 font-semibold rounded-md mt-4 hover:bg-yellow-300"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {/* LOGIN */}
          {step === "login" && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Insert Your Email"
                className="w-full p-3 bg-transparent border-b border-gray-600 mb-6 focus:outline-none"
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Insert Password"
                className="w-full p-3 bg-transparent border-b border-gray-600 mb-6 focus:outline-none"
                onChange={handleChange}
              />

              <button
                onClick={handleLogin}
                className="w-full bg-yellow-400 text-black py-3 font-semibold rounded-md mt-4 hover:bg-yellow-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center mt-4 text-sm">
                Don’t have an account?{" "}
                <span
                  className="text-blue-400 cursor-pointer"
                  onClick={() => setStep("signup")}
                >
                  Signup
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
