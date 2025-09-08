import AdminLayout from '@/components/layout/AdminLayout';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function TestimonialsPage() {
  useAdminAuth();

  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '',
    feedback: '',
    job: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const token = localStorage.getItem('adminToken');

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/testimonials/');
      const data = await res.json();
      setTestimonials(data);
      // console.log(data);
      
    } catch (err) {
      toast.error('Failed to fetch testimonials');
    }
  };
    const handleTestDelete = async (Id: string) => {
    const token = localStorage.getItem("adminToken");

    // console.log(Id);

    try {
      const res = await fetch(
        `http://localhost:4000/api/admin/delete-testimonial/${Id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Testimonials deleted!");
        setTestimonials((prev) => prev.filter((testimonials) => testimonials._id !== Id));
      } else {
        toast.error(data.message || "Failed to delete testimonial");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(()=>{
    fetchTestimonials();
  },[])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.feedback || !form.job || !image) {
      toast.warning("fill all fields and upload an image");
      return;
    }

    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('feedback', form.feedback);
    fd.append('job', form.job.trim());
    fd.append('image', image);

    try {
      const res = await fetch('http://localhost:4000/api/admin/new-testimonial', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Testimonial added');
        setForm({ name: '', feedback: '', job: '' });
        setImage(null);
        setImagePreview(null);
        fetchTestimonials();
      } else {
        toast.error(data.message || 'Failed to add testimonial');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <Head>
        <title>Admin Testimonials</title>
        <meta name="description" content="The official Next.js Admin Dashboard" />
      </Head>

      <AdminLayout>
        <div className="container my-4">
          <h4 className="text-white mb-4">Add New Testimonial</h4>
          <form onSubmit={handleSubmit} className="row g-3 mb-5">
            <div className="col-md-6">
              <label className="form-label text-white">Name</label>
              <input
                type="text"
                className="form-control p-3"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white">Job</label>
              <input
                type="text"
                className="form-control p-3"
                name="job"
                value={form.job}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label text-white">Feedback</label>
              <textarea
                className="form-control"
                name="feedback"
                rows={3}
                value={form.feedback}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12">
              <label className="form-label text-white">Image</label>
              <input type="file" className="form-control p-3" onChange={handleImageChange} />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 rounded"
                  style={{ maxHeight: 100 }}
                />
              )}
            </div>
            <div className="col-12">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>

          <h4 className="text-white mb-4">All Testimonials</h4>
          <div className="row">
            {testimonials.length > 0 ? (
              testimonials.map((item) => (
                <div key={item._id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card position-relative bg-dark text-white h-100 border border-secondary">
                    <div className="text-center pt-4">
                      <img
                        src={item.image?.url}
                        alt={item.image?.alt || 'testimonial'}
                        className="rounded-circle"
                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                      />
                    </div>

                    <button className='position-absolute end-0 p-2 mt-2  rounded bg-danger' onClick={()=> handleTestDelete(item._id)} >Delete</button>
                    <div className="card-body text-center">
                      <h5 className="card-title">{item.name}</h5>
                      {item.job && <p className="">{item.job}</p>}
                      <p className="card-text text-secondary">"{item.feedback}"</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white text-center mt-4">No testimonials found.</p>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
