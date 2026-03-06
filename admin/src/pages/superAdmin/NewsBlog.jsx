// import React, { useState, useEffect } from "react";
// import { EditorContent, useEditor } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";
// import Image from "@tiptap/extension-image";
// import { motion, AnimatePresence } from "framer-motion";
// import { Trash2, Pencil, Plus, X, Star } from "lucide-react";
// import api from "../../api/api";

// export default function NewsBlog() {
//   const [posts, setPosts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingPost, setEditingPost] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);

//   // Filters
//   const [typeFilter, setTypeFilter] = useState("all");
//   const [featuredFilter, setFeaturedFilter] = useState("all");

//   // Form states
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("Admin");
//   const [status, setStatus] = useState("published");
//   const [type, setType] = useState("news");
//   const [isFeatured, setIsFeatured] = useState(0);

//   const [imageFile, setImageFile] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const editor = useEditor({
//     extensions: [StarterKit, Link, Image],
//     content: "",
//   });

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const res = await api.get("/news");
//       setPosts(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const resetForm = () => {
//     setTitle("");
//     setAuthor("Admin");
//     setStatus("published");
//     setType("news");
//     setIsFeatured(0);
//     setPreview(null);
//     setImageFile(null);
//     editor?.commands.setContent("");
//   };

//   const openCreate = () => {
//     setEditingPost(null);
//     resetForm();
//     setShowModal(true);
//   };

//   const openEdit = (post) => {
//     setEditingPost(post);
//     setTitle(post.title);
//     setAuthor(post.author);
//     setStatus(post.status);
//     setType(post.type);
//     setIsFeatured(post.is_featured);
//     setPreview(post.image_url);
//     editor?.commands.setContent(post.content);
//     setShowModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", editor.getHTML());
//     formData.append("author", author);
//     formData.append("status", status);
//     formData.append("type", type);
//     formData.append("is_featured", isFeatured);
//     if (imageFile) formData.append("image", imageFile);

//     try {
//       if (editingPost) {
//         await api.put(`/news/${editingPost.id}`, formData);
//       } else {
//         await api.post("/news", formData);
//       }

//       setShowModal(false);
//       fetchPosts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const confirmDelete = async () => {
//     try {
//       await api.delete(`/news/${deleteId}`);
//       setDeleteId(null);
//       fetchPosts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Filtering Logic
//   const filteredPosts = posts.filter((post) => {
//     const matchesType =
//       typeFilter === "all" || post.type === typeFilter;

//     const matchesFeatured =
//       featuredFilter === "all" ||
//       (featuredFilter === "featured" && post.is_featured === 1) ||
//       (featuredFilter === "not_featured" && post.is_featured === 0);

//     return matchesType && matchesFeatured;
//   });

//   return (
//     <div className="p-8 min-h-screen bg-linear-to-br from-indigo-50 to-purple-50">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-purple-900">
//           News & Events Management
//         </h1>

//         <button
//           onClick={openCreate}
//           className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition"
//         >
//           <Plus size={18} /> Create Post
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 mb-8">
//         {/* Type Filter */}
//         <div className="flex gap-2">
//           {["all", "news", "event"].map((item) => (
//             <button
//               key={item}
//               onClick={() => setTypeFilter(item)}
//               className={`px-4 py-2 rounded-full text-sm transition ${
//                 typeFilter === item
//                   ? "bg-purple-700 text-white"
//                   : "bg-white shadow text-gray-600"
//               }`}
//             >
//               {item.charAt(0).toUpperCase() + item.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Featured Filter */}
//         <div className="flex gap-2">
//           {[
//             { label: "All", value: "all" },
//             { label: "Featured", value: "featured" },
//             { label: "Not Featured", value: "not_featured" },
//           ].map((item) => (
//             <button
//               key={item.value}
//               onClick={() => setFeaturedFilter(item.value)}
//               className={`px-4 py-2 rounded-full text-sm transition ${
//                 featuredFilter === item.value
//                   ? "bg-yellow-500 text-white"
//                   : "bg-white shadow text-gray-600"
//               }`}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Posts Grid */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredPosts.map((post) => (
//           <motion.div
//             key={post.id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
//           >
//             {post.image_url && (
//               <img
//                 src={post.image_url}
//                 alt={post.title}
//                 className="h-44 w-full object-cover"
//               />
//             )}

//             <div className="p-5">
//               {/* Badges */}
//               <div className="flex gap-2 mb-2 flex-wrap">
//                 <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
//                   {post.type}
//                 </span>

//                 <span
//                   className={`px-2 py-1 text-xs rounded-full ${
//                     post.status === "published"
//                       ? "bg-green-100 text-green-600"
//                       : "bg-yellow-100 text-yellow-600"
//                   }`}
//                 >
//                   {post.status}
//                 </span>

//                 {post.is_featured === 1 && (
//                   <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600 flex items-center gap-1">
//                     <Star size={12} /> Featured
//                   </span>
//                 )}
//               </div>

//               <h3 className="font-semibold text-lg text-purple-900">
//                 {post.title}
//               </h3>

//               <div
//                 className="text-sm text-gray-600 mt-2 line-clamp-3"
//                 dangerouslySetInnerHTML={{ __html: post.content }}
//               />

//               <p className="text-xs text-gray-400 mt-3">
//                 By {post.author} •{" "}
//                 {new Date(post.created_at).toLocaleDateString()}
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="absolute top-3 right-3 flex gap-2">
//               <button
//                 onClick={() => openEdit(post)}
//                 className="bg-yellow-500 text-white p-2 rounded-full"
//               >
//                 <Pencil size={14} />
//               </button>
//               <button
//                 onClick={() => setDeleteId(post.id)}
//                 className="bg-red-500 text-white p-2 rounded-full"
//               >
//                 <Trash2 size={14} />
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Create/Edit Modal */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <motion.form
//               onSubmit={handleSubmit}
//               className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto"
//             >
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-semibold">
//                   {editingPost ? "Edit Post" : "Create Post"}
//                 </h2>
//                 <button type="button" onClick={() => setShowModal(false)}>
//                   <X />
//                 </button>
//               </div>

//               <input
//                 className="w-full border p-3 rounded-xl"
//                 placeholder="Post Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />

//               <input
//                 className="w-full border p-3 rounded-xl"
//                 placeholder="Author"
//                 value={author}
//                 onChange={(e) => setAuthor(e.target.value)}
//               />

//               <div className="grid grid-cols-2 gap-4">
//                 <select
//                   value={type}
//                   onChange={(e) => setType(e.target.value)}
//                   className="border p-3 rounded-xl"
//                 >
//                   <option value="news">News</option>
//                   <option value="event">Event</option>
//                 </select>

//                 <select
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                   className="border p-3 rounded-xl"
//                 >
//                   <option value="published">Published</option>
//                   <option value="draft">Draft</option>
//                 </select>
//               </div>

//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={isFeatured === 1}
//                   onChange={(e) =>
//                     setIsFeatured(e.target.checked ? 1 : 0)
//                   }
//                 />
//                 Mark as Featured
//               </label>

//               <input
//                 type="file"
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   setImageFile(file);
//                   setPreview(URL.createObjectURL(file));
//                 }}
//               />

//               {preview && (
//                 <img
//                   src={preview}
//                   alt="preview"
//                   className="h-40 w-full object-cover rounded-xl"
//                 />
//               )}

//               <div className="border rounded-xl p-3 min-h-[200px] bg-gray-50">
//                 <EditorContent editor={editor} />
//               </div>

//               <button className="w-full bg-purple-700 text-white py-3 rounded-xl">
//                 {editingPost ? "Update Post" : "Save Post"}
//               </button>
//             </motion.form>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Delete Modal */}
//       <AnimatePresence>
//         {deleteId && (
//           <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
//               <h3 className="text-lg font-semibold mb-4">
//                 Confirm Delete
//               </h3>
//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => setDeleteId(null)}
//                   className="px-4 py-2 border rounded-xl"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={confirmDelete}
//                   className="px-4 py-2 bg-red-600 text-white rounded-xl"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Pencil, Plus, X, Star } from "lucide-react";
import api from "../../api/api";

export default function NewsBlog() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Filters
  const [typeFilter, setTypeFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");

  // Form states
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [status, setStatus] = useState("published");
  const [type, setType] = useState("news");
  const [isFeatured, setIsFeatured] = useState(0);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit, Link, Image],
    content: "",
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/api/news");
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch news posts:", err?.response?.data || err.message);
      alert("Could not load news & events. Please check your connection or try again later.");
      setPosts([]);
    }
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("Admin");
    setStatus("published");
    setType("news");
    setIsFeatured(0);
    setPreview(null);
    setImageFile(null);
    editor?.commands.setContent("");
  };

  const openCreate = () => {
    setEditingPost(null);
    resetForm();
    setShowModal(true);
  };

  const openEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title || "");
    setAuthor(post.author || "Admin");
    setStatus(post.status || "published");
    setType(post.type || "news");
    setIsFeatured(post.is_featured ?? 0);
    setPreview(post.image_url || null);
    editor?.commands.setContent(post.content || "");
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("content", editor.getHTML());
    formData.append("author", author.trim() || "Admin");
    formData.append("status", status);
    formData.append("type", type);
    formData.append("is_featured", isFeatured);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingPost) {
        await api.put(`/api/news/${editingPost.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/api/news", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setShowModal(false);
      fetchPosts();
    } catch (err) {
      console.error("Failed to save post:", err?.response?.data || err.message);
      alert("Failed to save post. Please check the form and try again.");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      await api.delete(`/api/news/${deleteId}`);
      setDeleteId(null);
      fetchPosts();
    } catch (err) {
      console.error("Failed to delete post:", err?.response?.data || err.message);
      alert("Could not delete the post. Please try again.");
    }
  };

  // Filtering Logic
  const filteredPosts = posts.filter((post) => {
    const matchesType = typeFilter === "all" || post.type === typeFilter;

    const matchesFeatured =
      featuredFilter === "all" ||
      (featuredFilter === "featured" && post.is_featured === 1) ||
      (featuredFilter === "not_featured" && post.is_featured === 0);

    return matchesType && matchesFeatured;
  });

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-900">
          News & Events Management
        </h1>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-purple-700 text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition"
        >
          <Plus size={18} /> Create Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Type Filter */}
        <div className="flex gap-2">
          {["all", "news", "event"].map((item) => (
            <button
              key={item}
              onClick={() => setTypeFilter(item)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                typeFilter === item
                  ? "bg-purple-700 text-white"
                  : "bg-white shadow text-gray-600"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>

        {/* Featured Filter */}
        <div className="flex gap-2">
          {[
            { label: "All", value: "all" },
            { label: "Featured", value: "featured" },
            { label: "Not Featured", value: "not_featured" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setFeaturedFilter(item.value)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                featuredFilter === item.value
                  ? "bg-yellow-500 text-white"
                  : "bg-white shadow text-gray-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
          >
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="h-44 w-full object-cover"
              />
            )}

            <div className="p-5">
              {/* Badges */}
              <div className="flex gap-2 mb-2 flex-wrap">
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                  {post.type}
                </span>

                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    post.status === "published"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {post.status}
                </span>

                {post.is_featured === 1 && (
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600 flex items-center gap-1">
                    <Star size={12} /> Featured
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-lg text-purple-900">
                {post.title}
              </h3>

              <div
                className="text-sm text-gray-600 mt-2 line-clamp-3 prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <p className="text-xs text-gray-400 mt-3">
                By {post.author} •{" "}
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Actions */}
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => openEdit(post)}
                className="bg-yellow-500 text-white p-2 rounded-full hover:opacity-90"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => setDeleteId(post.id)}
                className="bg-red-500 text-white p-2 rounded-full hover:opacity-90"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {editingPost ? "Edit Post" : "Create Post"}
                </h2>
                <button type="button" onClick={() => setShowModal(false)}>
                  <X size={24} />
                </button>
              </div>

              <input
                className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <input
                className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="news">News</option>
                  <option value="event">Event</option>
                </select>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured === 1}
                  onChange={(e) =>
                    setIsFeatured(e.target.checked ? 1 : 0)
                  }
                  className="w-5 h-5"
                />
                Mark as Featured
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setImageFile(file);
                  setPreview(file ? URL.createObjectURL(file) : null);
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />

              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="h-40 w-full object-cover rounded-xl border"
                />
              )}

              <div className="border rounded-xl p-3 min-h-[200px] bg-gray-50 prose max-w-none">
                <EditorContent editor={editor} />
              </div>

              <button className="w-full bg-purple-700 text-white py-3 rounded-xl hover:bg-purple-800 transition font-medium">
                {editingPost ? "Update Post" : "Save Post"}
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl w-96"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this post? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 border rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}