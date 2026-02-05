// import React, { useState, useEffect } from "react";
// import api from "../../api/api"; 

// const ProgramsPage = () => {
//   const [programs, setPrograms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//   });

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [editId, setEditId] = useState(null);

//   async function loadPrograms() {
//     try {
//       const { data } = await api.get("/api/program/programs");
//       setPrograms(data.programs || []);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadPrograms();
//   }, []);

//   function openModal(program = null) {
//     if (program) {
//       setEditId(program.id);
//       setForm({
//         title: program.title,
//         description: program.description,
//       });
//       setPreview(program.image_url);
//     } else {
//       setEditId(null);
//       setForm({ title: "", description: "" });
//       setPreview(null);
//       setImage(null);
//     }
//     setModalOpen(true);
//   }

//   function handleSave() {
//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("description", form.description);
//     if (image) fd.append("avatar", image);

//     if (editId) {
//       api
//         .put(`/api/program/programs/${editId}`, fd)
//         .then(() => {
//           loadPrograms();
//           setModalOpen(false);
//         })
//         .catch(() => alert("Update failed"));
//     } else {
//       api
//         .post(`/api/program/programs`, fd)
//         .then(() => {
//           loadPrograms();
//           setModalOpen(false);
//         })
//         .catch(() => alert("Create failed"));
//     }
//   }

//   function handleDelete(id) {
//     if (!window.confirm("Delete program?")) return;
//     api
//       .delete(`/admin/programs/${id}`)
//       .then(() => loadPrograms())
//       .catch(() => alert("Failed"));
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Programs</h1>
//         <button
//           className="px-4 py-2 bg-purple-700 text-white rounded"
//           onClick={() => openModal(null)}
//         >
//           Add Program
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading programs...</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {programs.map((p) => (
//             <div key={p.id} className="bg-white rounded shadow p-4">
//               {p.image_url && (
//                 <img
//                   src={p.image_url}
//                   className="w-full h-40 object-cover rounded mb-3"
//                 />
//               )}
//               <h3 className="font-bold text-lg">{p.title}</h3>
//               <p className="text-gray-600 text-sm mt-1 line-clamp-3">
//                 {p.description}
//               </p>

//               <div className="flex gap-3 mt-4">
//                 <button
//                   className="px-3 py-1 bg-yellow-100 text-black rounded"
//                   onClick={() => openModal(p)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="px-3 py-1 bg-red-100 text-black rounded"
//                   onClick={() => handleDelete(p.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <div className="bg-white w-full max-w-xl p-6 rounded shadow-xl">
//             <h2 className="text-xl font-bold mb-4">
//               {editId ? "Edit Program" : "Add Program"}
//             </h2>

//             {/* Image preview */}
//             {preview && (
//               <img
//                 src={preview}
//                 className="w-full h-40 object-cover rounded mb-4"
//               />
//             )}

//             <input
//               type="file"
//               className="mb-4"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   setImage(file);
//                   setPreview(URL.createObjectURL(file));
//                 }
//               }}
//             />

//             <input
//               type="text"
//               placeholder="Program Title"
//               value={form.title}
//               className="w-full border p-2 rounded mb-3"
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//             />

//             <textarea
//               placeholder="Description"
//               value={form.description}
//               className="w-full border p-2 rounded mb-4"
//               rows={4}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//             ></textarea>

//             <div className="flex justify-end gap-3">
//               <button
//                 className="px-4 py-2 border rounded"
//                 onClick={() => setModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-purple-700 text-white rounded"
//                 onClick={handleSave}
//               >
//                 {editId ? "Update" : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProgramsPage;


// // import React, { useState, useEffect } from "react";
// // import api from "../../api/api";

// // const ProgramsPage = () => {
// //   const [programs, setPrograms] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [modalOpen, setModalOpen] = useState(false);

// //   const [form, setForm] = useState({
// //     title: "",
// //     description: "",
// //   });

// //   const [image, setImage] = useState(null);
// //   const [preview, setPreview] = useState(null);
// //   const [editId, setEditId] = useState(null);

// //   async function loadPrograms() {
// //     try {
// //       const { data } = await api.get("/api/program/programs");
// //       setPrograms(data.programs || []);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   useEffect(() => {
// //     loadPrograms();
// //   }, []);

// //   function openModal(program = null) {
// //     if (program) {
// //       setEditId(program.id);
// //       setForm({
// //         title: program.title,
// //         description: program.description,
// //       });
// //       setPreview(program.image_url);
// //       setImage(null);
// //     } else {
// //       setEditId(null);
// //       setForm({ title: "", description: "" });
// //       setPreview(null);
// //       setImage(null);
// //     }
// //     setModalOpen(true);
// //   }

// //   async function handleSave() {
// //     try {
// //       const fd = new FormData();
// //       fd.append("title", form.title);
// //       fd.append("description", form.description);

// //       // IMPORTANT: match backend field name (change if needed)
// //       if (image) fd.append("image", image);

// //       const config = {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //         },
// //       };

// //       if (editId) {
// //         await api.put(`/api/program/programs/${editId}`, fd, config);
// //       } else {
// //         await api.post(`/api/program/programs`, fd, config);
// //       }

// //       loadPrograms();
// //       setModalOpen(false);
// //     } catch (err) {
// //       console.error("Upload failed", err.response?.data || err);
// //       alert("Upload failed. Check console.");
// //     }
// //   }

// //   async function handleDelete(id) {
// //     if (!window.confirm("Delete program?")) return;
// //     try {
// //       await api.delete(`/api/program/programs/${id}`);
// //       loadPrograms();
// //     } catch (err) {
// //       console.error(err);
// //       alert("Delete failed");
// //     }
// //   }

// //   return (
// //     <div className="p-6">
// //       <div className="flex justify-between mb-6">
// //         <h1 className="text-2xl font-bold">Programs</h1>
// //         <button
// //           className="px-4 py-2 bg-purple-700 text-white rounded"
// //           onClick={() => openModal()}
// //         >
// //           Add Program
// //         </button>
// //       </div>

// //       {loading ? (
// //         <p>Loading programs...</p>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //           {programs.map((p) => (
// //             <div key={p.id} className="bg-white rounded shadow p-4">
// //               {p.image_url && (
// //                 <img
// //                   src={p.image_url}
// //                   className="w-full h-40 object-cover rounded mb-3"
// //                   alt={p.title}
// //                 />
// //               )}
// //               <h3 className="font-bold text-lg">{p.title}</h3>
// //               <p className="text-gray-600 text-sm mt-1 line-clamp-3">
// //                 {p.description}
// //               </p>

// //               <div className="flex gap-3 mt-4">
// //                 <button
// //                   className="px-3 py-1 bg-yellow-100 rounded"
// //                   onClick={() => openModal(p)}
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   className="px-3 py-1 bg-red-100 rounded"
// //                   onClick={() => handleDelete(p.id)}
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* MODAL */}
// //       {modalOpen && (
// //         <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
// //           <div className="bg-white w-full max-w-xl p-6 rounded shadow-xl">
// //             <h2 className="text-xl font-bold mb-4">
// //               {editId ? "Edit Program" : "Add Program"}
// //             </h2>

// //             {preview && (
// //               <img src={preview} className="w-full h-40 object-cover rounded mb-4" />
// //             )}

// //             <input
// //               type="file"
// //               accept="image/*"
// //               className="mb-4"
// //               onChange={(e) => {
// //                 const file = e.target.files[0];
// //                 if (file) {
// //                   setImage(file);
// //                   setPreview(URL.createObjectURL(file));
// //                 }
// //               }}
// //             />

// //             <input
// //               type="text"
// //               placeholder="Program Title"
// //               value={form.title}
// //               className="w-full border p-2 rounded mb-3"
// //               onChange={(e) => setForm({ ...form, title: e.target.value })}
// //             />

// //             <textarea
// //               placeholder="Description"
// //               value={form.description}
// //               className="w-full border p-2 rounded mb-4"
// //               rows={4}
// //               onChange={(e) =>
// //                 setForm({ ...form, description: e.target.value })
// //               }
// //             />

// //             <div className="flex justify-end gap-3">
// //               <button
// //                 className="px-4 py-2 border rounded"
// //                 onClick={() => setModalOpen(false)}
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 className="px-4 py-2 bg-purple-700 text-white rounded"
// //                 onClick={handleSave}
// //               >
// //                 {editId ? "Update" : "Save"}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProgramsPage;



import React, { useState, useEffect } from "react";
import api from "../../api/api";

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);

  async function loadPrograms() {
    try {
      const { data } = await api.get("/api/program/programs");
      setPrograms(data.programs || []);
    } catch (err) {
      console.error("Failed to load programs:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPrograms();
  }, []);

  function openModal(program = null) {
    if (program) {
      setEditId(program.id);
      setForm({
        title: program.title || "",
        description: program.description || "",
      });
      setPreview(program.image_url || null);
      setImage(null); // reset file input — important when editing
    } else {
      setEditId(null);
      setForm({ title: "", description: "" });
      setPreview(null);
      setImage(null);
    }
    setModalOpen(true);
  }

  async function handleSave() {
    try {
      const fd = new FormData();
      fd.append("title", form.title.trim());
      fd.append("description", form.description.trim());
      if (image) {
        fd.append("image", image); // ← must match backend multer field name
      }

      if (editId) {
        await api.put(`/api/program/programs/${editId}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/api/program/programs", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await loadPrograms();
      setModalOpen(false);
      setImage(null); // clear file after success
    } catch (err) {
      console.error("Save failed:", err.response?.data || err.message);
      alert("Failed to save program. Check console for details.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this program?")) return;

    try {
      await api.delete(`/api/program/programs/${id}`);
      await loadPrograms();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Failed to delete program.");
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Programs</h1>
        <button
          className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
          onClick={() => openModal()}
        >
          Add Program
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading programs...</p>
      ) : programs.length === 0 ? (
        <p className="text-gray-500">No programs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {p.image_url ? (
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg"; // fallback
                    e.target.alt = "Image failed to load";
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {p.description || "No description"}
                </p>

                <div className="flex gap-3">
                  <button
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                    onClick={() => openModal(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl p-6">
            <h2 className="text-2xl font-bold mb-5">
              {editId ? "Edit Program" : "Add New Program"}
            </h2>

            {preview && (
              <div className="mb-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Program Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                placeholder="Program Title"
                value={form.title}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                placeholder="Program description..."
                value={form.description}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={4}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-5 py-2 border border-gray-300 rounded hover:bg-gray-50"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 disabled:opacity-50"
                onClick={handleSave}
                disabled={!form.title.trim()}
              >
                {editId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramsPage;