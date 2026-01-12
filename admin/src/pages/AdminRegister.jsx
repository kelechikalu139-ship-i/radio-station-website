import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import api from "../api/api";
import { Eye, EyeOff, X } from "lucide-react";
// import { useAuth } from '../context/AuthContext';

/* helper: get cropped image as blob using canvas */
async function getCroppedImg(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, "image/jpeg", 0.9);
  });
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = url;
  });
}

const MAX_BYTES = 2 * 1024 * 1024;

export default function AdminRegister() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);

  // drop/crop state
  const [rawImage, setRawImage] = useState(null); // objectURL
  const [fileMeta, setFileMeta] = useState(null); // { size, type }
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [avatarUploadedUrl, setAvatarUploadedUrl] = useState(null);

  // upload progress/state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // UI state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Dropzone
  const onDrop = useCallback((acceptedFiles) => {
    setError("");
    if (!acceptedFiles || !acceptedFiles.length) return;
    const f = acceptedFiles[0];
    if (f.size > MAX_BYTES) {
      setError("Image too large (max 2MB).");
      return;
    }
    setFileMeta({ size: f.size, type: f.type, name: f.name });
    const url = URL.createObjectURL(f);
    setRawImage(url);
    // revoke later handled in effect
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    maxSize: MAX_BYTES,
  });

  // revoke objectURL when rawImage changes/unmount
  useEffect(() => {
    return () => {
      if (rawImage) URL.revokeObjectURL(rawImage);
    };
  }, [rawImage]);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  // remove selected image
  const removeImage = () => {
    setRawImage(null);
    setFileMeta(null);
    setCroppedAreaPixels(null);
    setAvatarUploadedUrl(null);
  };

  // upload cropped image to backend Cloudinary endpoint
  const uploadCropped = async () => {
    try {
      if (!rawImage || !croppedAreaPixels) {
        setError("No image to crop/upload");
        return null;
      }
      setUploading(true);
      setUploadProgress(0);

      const blob = await getCroppedImg(rawImage, croppedAreaPixels);
      if (!blob) {
        setError("Crop failed");
        setUploading(false);
        return null;
      }

      const fd = new FormData();
      fd.append("file", blob, `avatar-${Date.now()}.jpg`);

      const res = await api.post("/api/admin/upload-avatar", fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (evt.total) {
            const pct = Math.round((evt.loaded / evt.total) * 100);
            setUploadProgress(pct);
          }
        },
      });

      if (res.data?.ok && res.data.avatarUrl) {
        setAvatarUploadedUrl(res.data.avatarUrl);
        return res.data.avatarUrl;
      }
      setError("Upload failed");
      return null;
    } catch (err) {
      console.error("uploadCropped err", err);
      setError(err?.response?.data?.error || "Upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  // register user: ensure avatar uploaded (if selected) then call register
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !pw) return setError("Email and password required");
    if (pw.length < 8) return setError("Password must be at least 8 characters");

    setLoading(true);
    try {
      let avatarUrl = avatarUploadedUrl;
      // upload if rawImage present but not yet uploaded
      if (!avatarUrl && rawImage && croppedAreaPixels) {
        avatarUrl = await uploadCropped();
      }

      // Register payload: prefer avatar_url field instead of file
      const fd = new FormData();
      fd.append("email", email);
      fd.append("password", pw);
      fd.append("name", name || "");
      if (avatarUrl) fd.append("avatar_url", avatarUrl);

      const res = await api.post("/api/admin/register", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.ok) {
        setShowConfirm(true);
      } else {
        setError(res.data?.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // password UI helpers
  const strength = useMemo(() => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  }, [pw]);

  // confirmation modal action: navigate to login or to admin onboarding
  const handleConfirmContinue = () => {
    setShowConfirm(false);
    nav("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={submit} className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: branding + dropzone + cropper */}
        <div className="md:col-span-1 flex flex-col gap-4 items-center">
          <div className="w-28 h-28 rounded-xl bg-linear-to-br from-yellow-300 to-yellow-400 flex items-center justify-center text-purple-900 text-2xl font-extrabold">NEX</div>
          <div className="text-center">
            <h2 className="text-lg font-semibold">Create Admin</h2>
            <p className="text-xs text-gray-500">Superadmin registration</p>
          </div>

          <div className="w-full">
            {!rawImage ? (
              <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${isDragActive ? 'border-purple-600' : 'border-gray-200'}`}>
                <input {...getInputProps()} />
                <div className="text-sm text-gray-600">Drag & drop avatar here, or click to choose</div>
                <div className="text-xs text-gray-400 mt-2">PNG/JPG/WEBP • max 2MB</div>
              </div>
            ) : (
              <div className="w-full">
                {/* Crop area */}
                <div className="relative w-full h-60 bg-gray-100 rounded overflow-hidden">
                  <Cropper
                    image={rawImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <label className="text-xs text-gray-600">Zoom</label>
                  <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="flex-1" />
                  <button type="button" onClick={removeImage} className="inline-flex items-center gap-2 px-2 py-1 bg-white border rounded text-sm">
                    <X size={14} /> Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* preview after upload */}
          {avatarUploadedUrl && (
            <div className="w-full">
              <div className="text-xs text-gray-600 mb-1">Uploaded avatar</div>
              <img src={avatarUploadedUrl} alt="uploaded avatar" className="w-full h-32 object-cover rounded" />
            </div>
          )}

          {/* upload progress */}
          {uploading && (
            <div className="w-full mt-2">
              <div className="text-xs text-gray-600 mb-1">Uploading... {uploadProgress}%</div>
              <div className="w-full bg-gray-100 rounded h-2">
                <div style={{ width: `${uploadProgress}%` }} className="h-2 bg-yellow-400 rounded"></div>
              </div>
            </div>
          )}
        </div>

        {/* Right column: form */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-600">Full name</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name (optional)" className="w-full mt-1 p-2 rounded border focus:ring-2 focus:ring-purple-200" />
            </div>
            <div>
              <label className="text-xs text-gray-600">Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@domain.com" type="email" required className="w-full mt-1 p-2 rounded border focus:ring-2 focus:ring-purple-200" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-600">Password</label>
            <div className="relative mt-1">
              <input value={pw} onChange={e=>setPw(e.target.value)} placeholder="Enter password" type={showPw ? 'text' : 'password'} required className="w-full p-2 rounded border pr-10 focus:ring-2 focus:ring-purple-200" />
              <button type="button" onClick={()=>setShowPw(s=>!s)} className="absolute right-2 top-2 text-gray-600">{showPw ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex-1 mr-4">
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div style={{ width: `${(strength/4)*100}%` }} className={`h-2 rounded-full ${strength>=4 ? 'bg-green-500' : strength>=2 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{["","Weak","Okay","Good","Strong"][strength] || ""}</div>
              </div>
              <div className="text-xs text-gray-500">Min 8 chars</div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-1">
            <button type="submit" disabled={loading} className={`ml-auto inline-flex items-center gap-2 px-4 py-2 rounded font-semibold transition ${loading ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-purple-900 text-white hover:scale-[1.02]'}`}>
              {loading ? 'Creating...' : 'Register'}
            </button>
            <p className="px-3 py-2 rounded bg-purple-400 text-white"><NavLink to="/login">Go to Login</NavLink></p>
          </div>

          <div className="text-xs text-gray-400 mt-2">By creating this account you accept the admin policy. The first registered admin becomes Superadmin.</div>
        </div>
      </form>

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-2">Account Created</h3>
            <p className="text-gray-700 mb-4">Your admin account has been created. Next steps:</p>
            <ol className="list-decimal pl-6 text-sm text-gray-600 mb-4">
              <li>Sign in at the admin login page.</li>
              <li>If this is the first account, you are the <strong>Superadmin</strong>. Keep your credentials safe.</li>
              <li>Optional: complete your profile and upload additional images in the admin panel.</li>
            </ol>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowConfirm(false)} className="px-3 py-2 rounded border">Close</button>
              <button onClick={handleConfirmContinue} className="px-3 py-2 rounded bg-purple-900 text-white">Go to Login</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




// admin/src/pages/AdminRegister.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function AdminRegister() {
//   const { register } = useAuth();
//   const nav = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [pw, setPw] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   async function submit(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const payload = { name, email, password: pw };
//       const res = await register(payload);
//       if (!res.ok) {
//         setError(res.error || "Registration failed");
//       } else {
//         // registration successful -> redirect to dashboard
//         nav("/admin");
//       }
//     } catch (err) {
//       setError(err.message || "Error");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
//       <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4 text-purple-900">Create Super Admin</h2>
//         {error && <div className="mb-3 text-sm text-red-600">{String(error)}</div>}
//         <label className="text-xs">Full name</label>
//         <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded mb-3" placeholder="Your name" />
//         <label className="text-xs">Email</label>
//         <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-3" type="email" placeholder="you@domain.com" />
//         <label className="text-xs">Password</label>
//         <input value={pw} onChange={(e) => setPw(e.target.value)} className="w-full p-2 border rounded mb-4" type="password" placeholder="Min 8 chars" />
//         <button disabled={loading} className={`w-full py-2 rounded text-white ${loading ? "bg-gray-300" : "bg-purple-900"}`}>
//           {loading ? "Creating..." : "Create Super Admin"}
//         </button>

//         <div className="text-xs text-gray-500 mt-3">
//           This is a one-time creation for the Super Admin. After creating you'll be redirected to the admin dashboard.
//         </div>
//       </form>
//     </div>
//   );
// }
