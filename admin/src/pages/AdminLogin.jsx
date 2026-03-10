// // src/pages/admin/AdminLogin.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";
// import { useAuth } from "../context/AuthContext"; // adjust path if needed

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [pw, setPw] = useState("");
//   const [showPw, setShowPw] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const nav = useNavigate();
//   const { login } = useAuth();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const result = await login({ email, password: pw });
//       if (!result.ok) throw new Error(result.error || "Login failed");

//       // result.admin should contain role
//       const role = result.admin?.role || JSON.parse(localStorage.getItem("admin_info"))?.role;

//       // redirect according to role
//       if (role === "superadmin") nav("/superadmin", { replace: true });
//       else if (role === "admin") nav("/admin", { replace: true });
//       else nav("/admin", { replace: true }); // default fallback
//     } catch (err) {
//       alert(err?.message || "Login failed");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//       <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-purple-900">Admin Login</h2>
//         <label className="text-xs text-gray-600">Email</label>
//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="you@domain.com"
//           type="email"
//           required
//           className="w-full mb-3 mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-200"
//         />
//         <label className="text-xs text-gray-600">Password</label>
//         <div className="relative">
//           <input
//             value={pw}
//             onChange={(e) => setPw(e.target.value)}
//             placeholder="Enter your password"
//             type={showPw ? "text" : "password"}
//             required
//             className="w-full mb-3 mt-1 p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-purple-200"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPw((s) => !s)}
//             className="absolute right-2 top-2 text-gray-600"
//             aria-label={showPw ? "Hide password" : "Show password"}
//           >
//             {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
//           </button>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full inline-flex items-center justify-center gap-2 py-2 rounded font-semibold ${
//             loading ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-purple-900 text-white hover:scale-[1.02]"
//           }`}
//         >
//           {loading ? "Signing in..." : "Sign in"}
//         </button>

//         <div className="text-sm text-gray-500 mt-3">
//           Forgot password? Ask the superadmin to reset it or add a password reset flow.
//         </div>
//       </form>
//     </div>
//   );
// }


// src/pages/admin/AdminLogin.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";
// import { useAuth } from "../context/AuthContext";   
// // import { useAuth } from "../context/AuthContext";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg("");

//     const result = await login({ email, password });

//     if (!result.ok) {
//       setErrorMsg(result.error || "Login failed");
//       setLoading(false);
//       return;
//     }

//     // Success → redirect based on role
//     const role = result.admin?.role;

//     if (role === "superadmin") {
//       navigate("/superadmin", { replace: true });
//     } else if (role === "admin") {
//       navigate("/admin", { replace: true });
//     } else {
//       navigate("/admin", { replace: true });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-purple-900 mb-6">
//           Admin Login
//         </h2>

//         {errorMsg && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//             {errorMsg}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="admin@example.com"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           <div className="mb-6 relative">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-10 text-gray-500"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 px-4 rounded font-semibold text-white transition
//               ${loading 
//                 ? "bg-purple-400 cursor-not-allowed" 
//                 : "bg-purple-900 hover:bg-purple-800 active:scale-[0.98]"}`}
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm text-gray-500">
//           Forgot password? Contact superadmin.
//         </p>
//       </div>
//     </div>
//   );
// }


// src/pages/admin/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";     // adjust path if needed

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const result = await login({ email, password });

    if (!result.ok) {
      console.log("Login failed →", result.error); // helpful for debugging
      setErrorMsg(result.error || "Invalid credentials or server issue");
      setLoading(false);
      return;
    }

    // Success → redirect based on role
    const role = result.admin?.role;

    if (role === "superadmin") {
      navigate("/superadmin", { replace: true });
    } else if (role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/admin", { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-900 mb-6">
          Admin Login
        </h2>

        {errorMsg && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoComplete="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md font-semibold text-white transition-all
              ${loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-900 hover:bg-purple-800 active:scale-[0.98]"}`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Forgot password? Contact the superadmin.
        </p>
      </div>
    </div>
  );
}