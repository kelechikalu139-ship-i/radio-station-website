// // src/pages/AdminLogin.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import api, { setAuthToken } from "../../api/axios"; 
// import { Eye, EyeOff } from "lucide-react";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [pw, setPw] = useState("");
//   const [showPw, setShowPw] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // POST to the login endpoint. Use consistent path with your server mounts.
//       // If your axios.baseURL is the server root (e.g. http://localhost:4000),
//       // this will call http://localhost:4000/api/admin/login
//       const res = await api.post("/api/admin/login", { email, password: pw });

//       // Expect shape: { token, admin: { id, email, role, name } }
//       const token = res.data?.token;
//       const admin = res.data?.admin ?? null;

//       if (!token) {
//         throw new Error("Missing token in response");
//       }

//       // store token and set default Authorization header for future requests
//       try {
//         setAuthToken(token);
//       } catch (err) {
//         // fallback if setAuthToken is not exported
//         localStorage.setItem("admin_token", token);
//         api.defaults.headers.common.Authorization = `Bearer ${token}`;
//       }

//       // optionally fetch /me to ensure token works and get fresh profile
//       try {
//         const me = await api.get("/api/admin/me");
//         const adminInfo = me.data?.admin ?? admin;
//         localStorage.setItem("admin_info", JSON.stringify(adminInfo));
//       } catch (meErr) {
//         // don't block login on /me failure; just log
//         console.warn("Failed to fetch /me after login", meErr?.response?.data || meErr.message);
//         if (admin) localStorage.setItem("admin_info", JSON.stringify(admin));
//       }

//       // navigate to admin dashboard
//       nav("/admin");
//     } catch (err) {
//       console.error("login error", err);
//       const msg =
//         err?.response?.data?.error ||
//         err?.response?.data?.message ||
//         err?.message ||
//         "Login failed";
//       alert(msg);
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


// admin/src/pages/AdminLogin.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function AdminLogin() {
//   const { login } = useAuth();
//   const nav = useNavigate();
//   const [email, setEmail] = useState("");
//   const [pw, setPw] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");

//   async function submit(e) {
//     e.preventDefault();
//     setErr("");
//     setLoading(true);
//     const res = await login({ email, password: pw });
//     setLoading(false);
//     if (!res.ok) {
//       setErr(res.error || "Login failed");
//     } else {
//       nav("/admin");
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//       <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-purple-900">Admin Login</h2>
//         {err && <div className="text-sm text-red-600 mb-3">{err}</div>}
//         <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded mb-3" />
//         <input value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded mb-4" />
//         <button disabled={loading} className={`w-full py-2 rounded text-white ${loading ? "bg-gray-300" : "bg-purple-900"}`}>{loading ? "Signing in..." : "Sign in"}</button>
//       </form>
//     </div>
//   );
// }






// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api, { setAuthToken } from "../api/api";
// import { Eye, EyeOff } from "lucide-react";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [pw, setPw] = useState("");
//   const [showPw, setShowPw] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const nav = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // POST to the login endpoint. Use consistent path with your server mounts.
//       // If your axios.baseURL is the server root (e.g. http://localhost:4000),
//       // this will call http://localhost:4000/api/admin/login
//       const res = await api.post("/api/admin/login", { email, password: pw });

//       // Expect shape: { token, admin: { id, email, role, name } }
//       const token = res.data?.token;
//       const admin = res.data?.admin ?? null;

//       if (!token) {
//         throw new Error("Missing token in response");
//       }

//       // store token and set default Authorization header for future requests
//       try {
//         setAuthToken(token);
//       } catch (err) {
//         // fallback if setAuthToken is not exported
//         localStorage.setItem("admin_token", token);
//         api.defaults.headers.common.Authorization = `Bearer ${token}`;
//       }

//       // optionally fetch /me to ensure token works and get fresh profile
//       try {
//         const me = await api.get("/api/admin/me");
//         const adminInfo = me.data?.admin ?? admin;
//         localStorage.setItem("admin_info", JSON.stringify(adminInfo));
//       } catch (meErr) {
//         // don't block login on /me failure; just log
//         console.warn("Failed to fetch /me after login", meErr?.response?.data || meErr.message);
//         if (admin) localStorage.setItem("admin_info", JSON.stringify(admin));
//       }

//       // navigate to admin dashboard
//       nav("/admin");
//     } catch (err) {
//       console.error("login error", err);
//       const msg =
//         err?.response?.data?.error ||
//         err?.response?.data?.message ||
//         err?.message ||
//         "Login failed";
//       alert(msg);
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // adjust path if needed

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login({ email, password: pw });
      if (!result.ok) throw new Error(result.error || "Login failed");

      // result.admin should contain role
      const role = result.admin?.role || JSON.parse(localStorage.getItem("admin_info"))?.role;

      // redirect according to role
      if (role === "superadmin") nav("/superadmin", { replace: true });
      else if (role === "admin") nav("/admin", { replace: true });
      else nav("/admin", { replace: true }); // default fallback
    } catch (err) {
      alert(err?.message || "Login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-purple-900">Admin Login</h2>
        <label className="text-xs text-gray-600">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          type="email"
          required
          className="w-full mb-3 mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-200"
        />
        <label className="text-xs text-gray-600">Password</label>
        <div className="relative">
          <input
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Enter your password"
            type={showPw ? "text" : "password"}
            required
            className="w-full mb-3 mt-1 p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-purple-200"
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="absolute right-2 top-2 text-gray-600"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full inline-flex items-center justify-center gap-2 py-2 rounded font-semibold ${
            loading ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-purple-900 text-white hover:scale-[1.02]"
          }`}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="text-sm text-gray-500 mt-3">
          Forgot password? Ask the superadmin to reset it or add a password reset flow.
        </div>
      </form>
    </div>
  );
}
