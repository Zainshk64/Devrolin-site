"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface Testimonial {
  client: string;
  quote: string;
}

interface FormDataState {
  title: string;
  owner: string;
  sector: string;
  description: string;
  result: string;
  startDate: string;
  endDate: string;
  testimonial: Testimonial[];
}

interface Props {
  onProjectAdded: () => void;
}

export default function AdminCreateProject({ onProjectAdded }: Props) {
  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    owner: "",
    sector: "",
    description: "",
    result: "",
    startDate: "",
    endDate: "",
    testimonial: [{ client: "", quote: "" }],
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [snapshots, setSnapshots] = useState<File[]>([]);

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [snapshotsPreview, setSnapshotsPreview] = useState<string[]>([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  // --------- Handlers ----------
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestimonialChange = (
    index: number,
    field: keyof Testimonial,
    value: string
  ) => {
    const updated = [...formData.testimonial];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, testimonial: updated }));
  };

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const handleSnapshotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).slice(0, 3) : [];
    setSnapshots(files);
    setSnapshotsPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const resetForm = () => {
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
    setThumbnail(null);
    setMainImage(null);
    setSnapshots([]);
    setThumbnailPreview("");
    setMainImagePreview("");
    setSnapshotsPreview([]);
  };

  // --------- Submit ----------
  const [Loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    // console.log(fd);
    

    // Normal fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "testimonial") {
        fd.append(key, value as string);
      }
    });

    // Testimonial fields
    formData.testimonial.forEach((t, i) => {
      fd.append(`testimonial[${i}][client]`, t.client);
      fd.append(`testimonial[${i}][quote]`, t.quote);
    });

    // Images
    if (thumbnail) fd.append("thumbnail", thumbnail);
    if (mainImage) fd.append("mainImage", mainImage);
    snapshots.forEach((snap) => {
      fd.append("snapshots", snap);
    });

    try {
      setLoading(true)
      const res = await fetch(
        "https://pleasing-consideration-production.up.railway.app/api/admin/new-project",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
          
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Project added successfully");
        resetForm();
        onProjectAdded();
      } else {
        toast.error(data.message || "Failed to add project");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    finally{
      setLoading(false)
    }
  };

  // --------- JSX ----------
  return (
    <div className="container mb-5">
      <h4 className="text-white mb-4">Add New Project</h4>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          {/* Text Inputs */}
          {["title", "owner", "sector", "description", "result"].map(
            (field) => (
              <div className="mb-3 col-md-6" key={field}>
                <label className="form-label text-capitalize text-white">
                  {field}
                </label>
                <input
                  type="text"
                  className="form-control p-3"
                  name={field}
                  value={(formData as any)[field]}
                  onChange={handleInputChange}
                  required={field === "title"}
                />
              </div>
            )
          )}

          {/* Dates */}
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
              onChange={(e) =>
                handleTestimonialChange(0, "client", e.target.value)
              }
            />
          </div>

          <div className="mb-3 col-12">
            <label className="form-label text-white">Testimonial Quote</label>
            <textarea
              className="form-control"
              value={formData.testimonial[0].quote}
              onChange={(e) =>
                handleTestimonialChange(0, "quote", e.target.value)
              }
            />
          </div>

          {/* Thumbnail */}
          <div className="mb-3 col-12">
            <label className="form-label text-white">Thumbnail</label>
            <input
              type="file"
              className="form-control p-3"
              onChange={handleThumbnail}
              accept="image/*"
              required
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="mt-2 rounded"
                style={{ maxWidth: "200px", height: "auto" }}
              />
            )}
          </div>

          {/* Main Image */}
          <div className="mb-3 col-12">
            <label className="form-label text-white">Main Image</label>
            <input
              type="file"
              className="form-control p-3"
              onChange={handleMainImageChange}
              accept="image/*"
              required
            />
            {mainImagePreview && (
              <img
                src={mainImagePreview}
                alt="Main Preview"
                className="mt-2 rounded"
                style={{ maxWidth: "200px", height: "auto" }}
              />
            )}
          </div>

          {/* Snapshots */}
          <div className="mb-3 col-12">
            <label className="form-label text-white">Snapshots (up to 3)</label>
            <input
              type="file"
              className="form-control p-3"
              multiple
              onChange={handleSnapshotsChange}
              accept="image/*"
            />
            <div className="d-flex gap-2 mt-2 flex-wrap">
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
            
        <button type="submit" className="btn">
          {Loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}
