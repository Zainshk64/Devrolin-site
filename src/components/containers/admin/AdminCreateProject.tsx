import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function AdminCreateProject({ onProjectAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    owner: "",
    sector: "",
    description: "",
    result: "",
    startDate: "",
    endDate: "",
    testimonial: [{ client: "", quote: "" }],
  });

  const [mainImage, setMainImage] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [snapshotsPreview, setSnapshotsPreview] = useState([]);

  const token = localStorage.getItem("adminToken");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestimonialChange = (index, field, value) => {
    const updated = [...formData.testimonial];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, testimonial: updated }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const handleSnapshotsChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3); // limit to 3
    setSnapshots(files);
    setSnapshotsPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "testimonial") {
        fd.append(key, value);
      }
    });

    // Testimonial fields
    formData.testimonial.forEach((t, i) => {
      fd.append(`testimonial[${i}][client]`, t.client);
      fd.append(`testimonial[${i}][quote]`, t.quote);
    });

    if (mainImage) fd.append("mainImage", mainImage);
    snapshots.forEach((snap, i) => {
      fd.append("snapshots", snap);
    });

    try {
      const res = await fetch("https://pleasing-consideration-production.up.railway.app/api/admin/new-project", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Project added successfully");
        setFormData({
          title: "",
          owner: "",
          sector: "",
          description: "",
          result: "",
          startDate: "",
          endDate: "",
          testimonial: [{ client: "", quote: "" }],
        });
        setMainImage(null);
        setSnapshots([]);
        setMainImagePreview("");
        setSnapshotsPreview([]);
        onProjectAdded(); // refresh the grid
      } else {
        toast.error(data.message || "Failed to add project");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container mb-5">
      <h4 className="text-white mb-4">Add New Project</h4>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          {["title", "owner", "sector", "description", "result"].map((field) => (
            <div className="mb-3 col-md-6" key={field}>
              <label className="form-label text-capitalize text-white">{field}</label>
              <input
                type="text"
                className="form-control p-3"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                required
              />
            </div>
          ))}

          <div className="mb-3 col-md-6">
            <label className="form-label text-white">Start Date</label>
            <input
              type="date"
              className="form-control p-3"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3 col-md-6">
            <label className="form-label text-white">End Date</label>
            <input
              type="date"
              className="form-control p-3"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Testimonial */}
          <div className="mb-3 col-12">
            <label className="form-label text-white">Testimonial Client</label>
            <input
              type="text"
              className="form-control p-3"
              value={formData.testimonial[0].client}
              onChange={(e) => handleTestimonialChange(0, "client", e.target.value)}
            />
          </div>

          <div className="mb-3 col-12">
            <label className="form-label text-white">Testimonial Quote</label>
            <textarea
              className="form-control"
              value={formData.testimonial[0].quote}
              onChange={(e) => handleTestimonialChange(0, "quote", e.target.value)}
            />
          </div>

          {/* Main Image Upload */}
          <div className="mb-3 col-12">
            <label className="form-label text-white">Main Image</label>
            <input
              type="file"
              className="form-control p-3"
              onChange={handleMainImageChange}
              accept="image/*"
            />
            {mainImagePreview && (
              <img
                src={mainImagePreview}
                alt="Preview"
                className="mt-2 rounded"
                style={{ maxWidth: "200px", height: "auto" }}
              />
            )}
          </div>

          {/* Snapshots Upload */}
          <div className="mb-3 col-12">
            <label className="form-label text-white">Snapshots  (450x350)</label>
            <input
              type="file"
              className="form-control p-3"
              multiple
              onChange={handleSnapshotsChange}
              accept="image/*"
            />
            <div className="d-flex gap-2 mt-2">
              {snapshotsPreview.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Snapshot ${i}`}
                  className="rounded"
                  style={{ maxWidth: "120px", height: "auto" }}
                />
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-">
          Submit Project
        </button>
      </form>
    </div>
  );
}
