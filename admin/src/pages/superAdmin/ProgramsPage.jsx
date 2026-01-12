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
      console.log(err);
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
        title: program.title,
        description: program.description,
      });
      setPreview(program.image_url);
    } else {
      setEditId(null);
      setForm({ title: "", description: "" });
      setPreview(null);
      setImage(null);
    }
    setModalOpen(true);
  }

  function handleSave() {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    if (image) fd.append("avatar", image);

    if (editId) {
      api
        .put(`/api/program/programs/${editId}`, fd)
        .then(() => {
          loadPrograms();
          setModalOpen(false);
        })
        .catch(() => alert("Update failed"));
    } else {
      api
        .post(`/api/program/programs`, fd)
        .then(() => {
          loadPrograms();
          setModalOpen(false);
        })
        .catch(() => alert("Create failed"));
    }
  }

  function handleDelete(id) {
    if (!window.confirm("Delete program?")) return;
    api
      .delete(`/admin/programs/${id}`)
      .then(() => loadPrograms())
      .catch(() => alert("Failed"));
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Programs</h1>
        <button
          className="px-4 py-2 bg-purple-700 text-white rounded"
          onClick={() => openModal(null)}
        >
          Add Program
        </button>
      </div>

      {loading ? (
        <p>Loading programs...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div key={p.id} className="bg-white rounded shadow p-4">
              {p.image_url && (
                <img
                  src={p.image_url}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="font-bold text-lg">{p.title}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                {p.description}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  className="px-3 py-1 bg-yellow-100 text-black rounded"
                  onClick={() => openModal(p)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-100 text-black rounded"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-xl p-6 rounded shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {editId ? "Edit Program" : "Add Program"}
            </h2>

            {/* Image preview */}
            {preview && (
              <img
                src={preview}
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}

            <input
              type="file"
              className="mb-4"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />

            <input
              type="text"
              placeholder="Program Title"
              value={form.title}
              className="w-full border p-2 rounded mb-3"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              placeholder="Description"
              value={form.description}
              className="w-full border p-2 rounded mb-4"
              rows={4}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-purple-700 text-white rounded"
                onClick={handleSave}
              >
                {editId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramsPage;
