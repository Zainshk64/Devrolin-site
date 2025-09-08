import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Head from "next/head";
import { toast } from "react-toastify";
import moment from "moment";

const AdminBlogs = () => {
  const isAuthorized = useAdminAuth();
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);

  const fetchBlogs = async () => {
    try {
      const recent = await fetch("http://localhost:4000/api/blogs/recent").then(
        (res) => res.json()
      );
      setRecentBlogs(recent);
      console.log(recent);
      
    } catch (err) {
      toast.error("Error fetching blogs");
    }
  };

  useEffect(() => {
    if (isAuthorized) fetchBlogs();
  }, [isAuthorized]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    details: "",
    author: "",
    category: "Web Development",
    mainImage: null as File | null,
    smallImages: [null, null] as (File | null)[],
  });

  const [previews, setPreviews] = useState({
    mainImage: "",
    smallImages: ["", ""],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, mainImage: file }));
      setPreviews((prev) => ({
        ...prev,
        mainImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleSmallImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const updatedFiles = [...form.smallImages];
      const updatedPreviews = [...previews.smallImages];
      updatedFiles[index] = file;
      updatedPreviews[index] = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, smallImages: updatedFiles }));
      setPreviews((prev) => ({ ...prev, smallImages: updatedPreviews }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");
3
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("details", form.details);
    formData.append("author", form.author);
    formData.append("category", form.category);

    if (form.mainImage) {
      formData.append("mainImage", form.mainImage); // must match multer field name
    }

    form.smallImages.forEach((img, i) => {
      if (img) formData.append("smallImages", img); // multiple files with same name
    });3

    try {
      const res = await fetch("http://localhost:4000/api/admin/new-blog", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      
      if (res.ok) {
        toast.success("Blog created successfully");
        setForm({
          title: "",
          description: "",
          details: "",
          author: "",
          category: "",
          mainImage: null,
          smallImages: [null, null],
        });
        setPreviews({ mainImage: "", smallImages: ["", ""] });
        fetchBlogs();
      } else {
        toast.error(data.error || "Failed to create blog");
        console.log(data.error);
        
      }
    } catch (error) {
      toast.error("Server error");
    }
  };
  const handleBlogDelte = async (Id: string) => {
    const token = localStorage.getItem("adminToken");

    console.log(Id);

    try {
      const res = await fetch(
        `http://localhost:4000/api/admin/delete-blog/${Id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Blog deleted successfully");
        setRecentBlogs((prev) => prev.filter((blog) => blog._id !== Id));
      } else {
        toast.error(data.message || "Failed to delete blog");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Head>
        <title>Admin Blogs</title>
        <meta name="description" content="Admin blog dashboard" />
      </Head>

      <AdminLayout>
        <div className="container py-4">
          <h4 className="text-white mb-4">Create New Blog</h4>

          <form className="row g-3" onSubmit={handleSubmit}>
            {/* Title & Author */}
            <div className="col-md-6 group-input">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control p-3"
                placeholder="Title"
                required
              />
            </div>
            <div className="col-md-6">
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                className="form-control p-3"
                placeholder="Author"
                required
              />
            </div>

            {/* Description & Details */}
            <div className="col-12">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Short Description"
                required
              />
            </div>
            <div className="col-12">
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                className="form-control"
                placeholder="Full Blog Details"
                rows={2}
                required
              />
            </div>

            {/* Category */}
            <div className="col-md-12">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-select p-3"
              >
                <option className="text-white" >Select Category</option>

                <option className="text-white">Web Development</option>
                <option className="text-white">Artificial Intelligence</option>
                <option className="text-white">Modern UI/UX Design</option>
              </select>
            </div>

            {/* Main Image Upload + Preview */}
            <div className="col-md-6">
              <label className="form-label text-white">Main Image - (690x550)</label>
              <input
                type="file"
                accept="image/*"
                className="form-control p-3"
                onChange={handleMainImageUpload}
                required
              />
              {previews.mainImage && (
                <img
                  src={previews.mainImage}
                  alt="Main Preview"
                  className="img-thumbnail mt-2"
                  style={{ maxHeight: "150px" }}
                />
              )}

              {/* Small Images Upload */}
              {[0, 1].map((i) => (
                <div className="" key={i}>
                  <label className="form-label mt-3 text-white">{`SmallImage ${
                    i + 1 
                  }  - (456x362) `}</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control p-3"
                    onChange={(e) => handleSmallImageUpload(e, i)}
                  />
                  {previews.smallImages[i] && (
                    <img
                      src={previews.smallImages[i]}
                      alt={`Small ${i + 1}`}
                      className="img-thumbnail"
                      style={{ maxHeight: "100px" }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="col-12">
              <button type="submit" className="btn">
                Create Blog
              </button>
            </div>
          </form>

          <hr className="border-top border-secondary my-5" />

          <h4 className="text-white mb-3">Recent Blogs</h4>

          <div className="row">
            {recentBlogs.map((blog: any) => (
              <div key={blog._id} className="col-12 col-lg-6 mb-4">
                <div className="card bg-dark text-white h-100 border border-warning">
                  {blog.mainImage?.url && (
                    <img
                      src={blog.mainImage.url}
                      alt={blog.mainImage.alt || blog.title}
                      className="card-img-top img-fluid"
                      style={{ height: 250, objectFit: "cover" }}
                    />
                  )}

                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{blog.title}</h5>
                      <button
                        className="bg-danger p-2 rounded"
                        onClick={() => handleBlogDelte(blog._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <p className="card-text">{blog.description}</p>
                  </div>

                  <div className="card-body bg-transparent border-top border-warning  small">
                    <h6>
                      By {blog.author} | Category: {blog.category}
                    </h6>
                    <p>
                      Published: {moment(blog.createdAt).format("MMMM D, YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminBlogs;
