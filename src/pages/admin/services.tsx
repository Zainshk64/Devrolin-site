import AdminLayout from "@/components/layout/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AdminServices = () => {
  useAdminAuth();

  const [form, setForm] = useState({
    title: "",
    whyUsed: "",
    approach: "",
    mainImage: null as File | null,
    smallImage: null as File | null,
  });

  const handleImageChange = (e: any, type: "main" | "small") => {
    const file = e.target.files[0];
    if (!file) return;
    if (type === "main") {
      setForm({ ...form, mainImage: file });
    } else {
      setForm({ ...form, smallImage: file });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("whyUsed", form.whyUsed);
    fd.append("approach", form.approach);
    if (form.mainImage) fd.append("mainImage", form.mainImage);
    if (form.smallImage) fd.append("smallImages", form.smallImage); // only one smallImage

    try {
      const res = await fetch("https://pleasing-consideration-production.up.railway.app/api/admin/new-service", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Service created successfully");
        setForm({
          title: "",
          whyUsed: "",
          approach: "",
          mainImage: null,
          smallImage: null,
        });
        fetchService();
      } else {
        toast.error(data.message || "Error creating service");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };
  const [ourService, setOurServices] = useState<any[]>([]);

  const fetchService = async () => {
    try {
      const recent = await fetch("https://pleasing-consideration-production.up.railway.app/api/services").then(
        (res) => res.json()
      );
      setOurServices(recent.services);
    } catch (err) {
      toast.error("Error fetching blogs");
    }
  };

    const handleTestDelete = async (Id: string) => {
      const token = localStorage.getItem("adminToken");
  
      // console.log(Id);
  
      try {
        const res = await fetch(
          `https://pleasing-consideration-production.up.railway.app/api/admin/delete-service/${Id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const data = await res.json();
  
        if (res.ok) {
          toast.success("Services deleted!");
          fetchService()
        } else {
          toast.error(data.message || "Failed to delete services");
        }
      } catch (err) {
        toast.error("Something went wrong");
      }
    };
  
  useEffect(() => {
    fetchService();
  }, []);
  return (
    <>
      <Head>
        <title>Admin Services</title>
        <meta
          name="description"
          content="The official Next.js Admin Dashboard"
        />
      </Head>
      <AdminLayout>
        <div className="container mt-4">
          <h4 className="text-white mb-4">Add New Service</h4>

          <form
            className="row g-4 rounded shadow-sm"
            onSubmit={handleSubmit}
          >
            <div className="col-md-6">
              <label className="form-label text-white">Service Title</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="e.g. Cloud Infrastructure"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label text-white">Why it’s useful</label>
              <input
                type="text"
                className="form-control p-3"
                placeholder="e.g. To scale applications efficiently"
                required
                value={form.whyUsed}
                onChange={(e) => setForm({ ...form, whyUsed: e.target.value })}
              />
            </div>

            <div className="col-12">
              <label className="form-label text-white">
                Approach / Methodology
              </label>
              <textarea
                rows={3}
                className="form-control"
                placeholder="Describe your approach..."
                required
                value={form.approach}
                onChange={(e) => setForm({ ...form, approach: e.target.value })}
              />
            </div>

            {/* Main Image Upload */}
            <div className="d-flex gap-4 align-items-center" >

            <div className="">
              <label className="form-label text-white d-block">
                Main Image
              </label>
              <div
                className="rounded-circle bg-secondary mb-2 position-relative shadow-sm"
                style={{
                  width: 120,
                  height: 120,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "2px dashed #ccc",
                }}
                onClick={() =>
                  document.getElementById("mainImageInput")?.click()
                }
              >
                {form.mainImage ? (
                  <img
                    src={URL.createObjectURL(form.mainImage)}
                    className="img-fluid w-100 h-100 object-fit-cover"
                    alt="Main Preview"
                  />
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-100 text-white fs-1">
                    <i class="fa fa-camera" aria-hidden="true"></i>
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                id="mainImageInput"
                hidden
                onChange={(e) => handleImageChange(e, "main")}
              />
            </div>
            {/* Small Image Upload */}
            <div className="">
              <label className="form-label text-white d-block">
                Small Image
              </label>
              <div
                className="rounded-circle bg-secondary  mb-2 position-relative shadow-sm"
                style={{
                  width: 100,
                  height: 100,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "2px dashed #ccc",
                }}
                onClick={() =>
                  document.getElementById("smallImageInput")?.click()
                }
              >
                {form.smallImage ? (
                  <img
                    src={URL.createObjectURL(form.smallImage)}
                    className="img-fluid w-100 h-100 object-fit-cover"
                    alt="Small Preview"
                  />
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-100 text-white fs-4">
                    <i class="fa fa-camera" aria-hidden="true"></i>
                    
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                id="smallImageInput"
                hidden
                onChange={(e) => handleImageChange(e, "small")}
              />
            </div>
            </div>


            <div className="col-12">
              <button
                type="submit"
                className="btn  py-3 fw-bold"
              >
                Create Service
              </button>
            </div>
          </form>

          <h4 className="text-white my-4"> Our Service</h4>
          <div className="row">
            {ourService.map((service) => (
              <div key={service._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card bg-dark text-white border border-secondary h-100">
                  <img
                    src={service.mainImage?.url}
                    className="card-img-top img-fluid"
                    alt={service.mainImage?.alt || "Main Image"}
                    style={{ height: 180, objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{service.title}</h5>
                    <p className="mb-1">
                      <strong>Why Used:</strong> {service.whyUsed.slice(0,202)}...
                    </p>
                    <hr className="" />
                    <p className="mb-2">
                      <strong>Approach:</strong> {service.approach.slice(0,200)}...
                    </p>
                    <button className='p-2 mt-2  rounded bg-danger' onClick={()=> handleTestDelete(service._id)} >Delete</button>
                  </div>

                </div>
              </div>
            ))}

            {ourService.length === 0 && (
              <p className="text-white text-center mt-4">No services found.</p>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminServices;
