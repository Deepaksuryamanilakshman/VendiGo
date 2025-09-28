import React, { useState } from "react";
import AdminLayout from "../components/AdminLayout";

function ContentManagement() {
  const [contents, setContents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: 1,
    visible: true,
    link: "",
    category: "",
    tags: "",
    images: [],
    status: "Draft",
  });
  const [previewContent, setPreviewContent] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, images: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContents([...contents, { ...formData, id: Date.now(), views: 0, clicks: 0 }]);
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      priority: 1,
      visible: true,
      link: "",
      category: "",
      tags: "",
      images: [],
      status: "Draft",
    });
  };

  const handleDelete = (id) => {
    setContents(contents.filter((c) => c.id !== id));
  };

  return (
    <AdminLayout>
      <div style={{ padding: "30px", fontFamily: "Arial, sans-serif", color: "#1f2937" }}>
        <h1 style={{ fontSize: "26px", marginBottom: "8px", fontWeight: "600" }}>
          Content Management
        </h1>
        <p style={{ marginBottom: "25px", color: "#6b7280" }}>
          Manage banners, offers, discounts, promotional images, schedules, and more.
        </p>

        {/* Add Content Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            border: "1px solid #e5e7eb",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "35px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ marginBottom: "18px", fontSize: "20px", fontWeight: "500" }}>
            Add New Content
          </h3>
          <div style={{ display: "grid", gap: "12px" }}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
              }}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              style={{
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                minHeight: "60px",
              }}
            />
            <div style={{ display: "flex", gap: "12px" }}>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                style={{ flex: 1, padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }}
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                style={{ flex: 1, padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }}
              />
            </div>
            <input
              type="number"
              name="priority"
              min="1"
              max="10"
              value={formData.priority}
              onChange={handleChange}
              placeholder="Priority (1-10)"
              style={{ padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }}
            />
            <label style={{ fontSize: "14px", color: "#374151" }}>
              <input
                type="checkbox"
                name="visible"
                checked={formData.visible}
                onChange={handleChange}
                style={{ marginRight: "6px" }}
              />{" "}
              Visible
            </label>
            <input
              type="url"
              name="link"
              placeholder="Redirect URL"
              value={formData.link}
              onChange={handleChange}
              style={{ padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }}
            />
            <input
              type="text"
              name="category"
              placeholder="Category (e.g., Festival, Sale)"
              value={formData.category}
              onChange={handleChange}
              style={{ padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }}
            />
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={handleChange}
              style={{ padding: "10px", border: "1px solid #d1d5db", borderRadius: "6px" }}
            />
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
              style={{ padding: "6px" }}
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{
                padding: "10px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                background: "#fff",
              }}
            >
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <button
            type="submit"
            style={{
              marginTop: "18px",
              padding: "10px 14px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Add Content
          </button>
        </form>

        {/* Content List */}
        <h3 style={{ marginBottom: "15px", fontSize: "20px", fontWeight: "500" }}>Content List</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "30px" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th style={{ border: "1px solid #e5e7eb", padding: "10px" }}>Title</th>
              <th style={{ border: "1px solid #e5e7eb", padding: "10px" }}>Category</th>
              <th style={{ border: "1px solid #e5e7eb", padding: "10px" }}>Priority</th>
              <th style={{ border: "1px solid #e5e7eb", padding: "10px" }}>Status</th>
              <th style={{ border: "1px solid #e5e7eb", padding: "10px" }}>Visible</th>
              <th style={{ border: "1px solid #e5e7eb", padding: "10px" }}>Analytics</th>
              <th style={{ border: "1px solid #e5e7eb", padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contents.map((c) => (
              <tr key={c.id}>
                <td style={{ border: "1px solid #e5e7eb", padding: "10px" }}>{c.title}</td>
                <td style={{ border: "1px solid #e5e7eb", padding: "10px" }}>{c.category}</td>
                <td style={{ border: "1px solid #e5e7eb", padding: "10px" }}>{c.priority}</td>
                <td style={{ border: "1px solid #e5e7eb", padding: "10px" }}>{c.status}</td>
                <td style={{ border: "1px solid #e5e7eb", padding: "10px" }}>
                  {c.visible ? "Yes" : "No"}
                </td>
                <td style={{ border: "1px solid #e5e7eb", padding: "10px" }}>
                  Views: {c.views} | Clicks: {c.clicks}
                </td>
                <td style={{ border: "1px solid #e5e7eb", padding: "10px" }}>
                  <button
                    style={{
                      padding: "6px 10px",
                      marginRight: "8px",
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      padding: "6px 10px",
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                    onClick={() => setPreviewContent(c)}
                  >
                    Preview
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Preview Modal */}
        {previewContent && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                width: "500px",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <h2 style={{ marginBottom: "10px" }}>{previewContent.title}</h2>
              <p style={{ marginBottom: "10px", color: "#4b5563" }}>
                {previewContent.description}
              </p>
              {previewContent.images.length > 0 && (
                <div style={{ marginBottom: "15px" }}>
                  {previewContent.images.map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      style={{
                        maxWidth: "100%",
                        marginBottom: "10px",
                        borderRadius: "6px",
                      }}
                    />
                  ))}
                </div>
              )}
              <p><strong>Category:</strong> {previewContent.category}</p>
              <p><strong>Priority:</strong> {previewContent.priority}</p>
              <p><strong>Status:</strong> {previewContent.status}</p>
              <p><strong>Visible:</strong> {previewContent.visible ? "Yes" : "No"}</p>
              <button
                style={{
                  marginTop: "15px",
                  padding: "8px 12px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => setPreviewContent(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default ContentManagement;
