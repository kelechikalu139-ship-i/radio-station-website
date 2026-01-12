// src/pages/admin/CreateAdminPage.jsx
import React, { useState } from "react";
import CreateAdminModal from "../../components/admin/CreateAdminModal";

export default function CreateAdminPage() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Admin</h1>
      {show && (
        <CreateAdminModal
          onClose={() => setShow(false)}
          onCreate={(data) => {
            console.log("create admin", data);
            setShow(false);
            alert("Created (demo) " + data.name);
          }}
        />
      )}
      {!show && <div className="text-sm text-gray-500">Admin creation closed (placeholder).</div>}
    </div>
  );
}
