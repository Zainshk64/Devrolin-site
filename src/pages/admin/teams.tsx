import AdminLayout from "@/components/layout/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function Teams() {
  useAdminAuth();

  const [members, setMembers] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    jobTitle: "",
    aboutMe: "",
    description: "",
    socials: [
      { social: "", url: "" },
    ],
    skills: [{ name: "", proficiency: "" }],
    education: [{ degree: "", year: "", description: "" }],
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const token = localStorage.getItem("adminToken");

  // Fetch Members
  const fetchMembers = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/members/");
      const data = await res.json();
      setMembers(data.members || []);
      // console.log(data.members);
    } catch (err) {
      toast.error("Error fetching members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Submit Form
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //     if (!form.name || !form.jobTitle || !form.aboutMe || !form.description) {
    //   return toast.warning("Please fill all required fields");
    // }

    // if (form.skills.length === 0 || !form.skills[0].name || !form.skills[0].proficiency) {
    //   return toast.warning("At least one skill is required");
    // }

    // if (form.education.length === 0 || !form.education[0].degree || !form.education[0].year) {
    //   return toast.warning("At least one education entry is required");
    // }
    if (!image) return toast.warning("Image is required");

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("jobTitle", form.jobTitle);
    fd.append("aboutMe", form.aboutMe);
    fd.append("description", form.description);
    fd.append("image", image);

    // form.socials.forEach((s, i) => {
    //   fd.append(`socials[${i}][social]`, s.social);
    //   fd.append(`socials[${i}][url]`, s.url || "");
    // });

    // form.skills.forEach((s, i) => {
    //   fd.append(`skills[${i}][name]`, s.name);
    //   fd.append(`skills[${i}][proficiency]`, s.proficiency.toString());
    // });

    // form.education.forEach((e, i) => {
    //   fd.append(`education[${i}][degree]`, e.degree);
    //   fd.append(`education[${i}][year]`, e.year.toString());
    //   fd.append(`education[${i}][description]`, e.description);
    // });

    fd.append("socials", JSON.stringify(form.socials));
    fd.append("skills", JSON.stringify(form.skills));
    fd.append("education", JSON.stringify(form.education));

    try {
      const res = await fetch("http://localhost:4000/api/admin/new-member", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (res.ok) {
        toast.success("Team member added");
        setForm({
          name: "",
          jobTitle: "",
          aboutMe: "",
          description: "",
          socials: [
            { social: "", url: "" },
          ],
          skills: [{ name: "", proficiency: "" }],
          education: [{ degree: "", year: "", description: "" }],
        });
        setImage(null);
        setImagePreview(null);
        fetchMembers();
      } else {
        const data = await res.json();
        console.error("❌ API Error Response:", data); //
        toast.error(data.message || "Failed to add member");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <>
      <Head>
        <title>Admin Teams</title>
        <meta
          name="description"
          content="The official Next.js Admin Dashboard"
        />
      </Head>

      <AdminLayout>
        <div className="container py-4">
          <h4 className="text-white mb-4">Add Team Member</h4>
          <form
            className="row g-3 bg-dark  rounded shadow-sm mb-5"
            onSubmit={handleSubmit}
          >
            <div className="col-md-6">
              <label className="form-label text-white">Name</label>
              <input
                type="text"
                className="form-control p-3"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white">Job Title</label>
              <input
                type="text"
                className="form-control p-3"
                required
                value={form.jobTitle}
                onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label className="form-label text-white">About Me</label>
              <textarea
                className="form-control"
                required
                value={form.aboutMe}
                onChange={(e) => setForm({ ...form, aboutMe: e.target.value })}
              ></textarea>
            </div>
            <div className="col-12">
              <label className="form-label text-white">Description</label>
              <textarea
                className="form-control"
                rows={3}
                required
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              ></textarea>
            </div>
            {/* Fixed Social Platforms */}
            {form.socials.map((social, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-6 mb-3">
                  <label className="form-label text-white">
                    Social Platform 
                  </label>
                  <input
                    type="text"
                    className="form-control p-3"
                    placeholder="Facebook , LinkedIn , Twitter"
                    value={social.social}
                    onChange={(e) => {
                      const socials = [...form.socials];
                      socials[index].social = e.target.value;
                      setForm({ ...form, socials });
                    }}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-white">Social URL</label>
                  <input
                    type="url"
                    className="form-control p-3"
                    value={social.url}
                    onChange={(e) => {
                      const socials = [...form.socials];
                      socials[index].url = e.target.value;
                      setForm({ ...form, socials });
                    }}
                  />
                </div>
                {form.socials.length > 1 && (
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn mt-3"
                      onClick={() => {
                        const updated = form.socials.filter(
                          (_, i) => i !== index
                        );
                        setForm({ ...form, socials: updated });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
            {form.socials.length < 3 && (
              <button
                type="button"
                className="btn mb-3"
                onClick={() =>
                  setForm({
                    ...form,
                    socials: [...form.socials, { social: "", url: "" }],
                  })
                }
              >
                + Add Skill
              </button>
            )}

            {/* Skills Input - max 4 */}
            {form.skills.map((skill, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-6">
                  <label className="form-label text-white">Skill Name</label>
                  <input
                    type="text"
                    className="form-control p-3"
                    value={skill.name}
                    onChange={(e) => {
                      const skills = [...form.skills];
                      skills[index].name = e.target.value;
                      setForm({ ...form, skills });
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-white">
                    Proficiency (%)
                  </label>
                  <input
                    type="number"
                    className="form-control p-3"
                    value={skill.proficiency}
                    onChange={(e) => {
                      const skills = [...form.skills];
                      skills[index].proficiency = e.target.value;
                      setForm({ ...form, skills });
                    }}
                  />
                </div>
                {form.skills.length > 1 && (
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn mt-3"
                      onClick={() => {
                        const updated = form.skills.filter(
                          (_, i) => i !== index
                        );
                        setForm({ ...form, skills: updated });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}

            {form.skills.length < 4 && (
              <button
                type="button"
                className="btn mb-3"
                onClick={() =>
                  setForm({
                    ...form,
                    skills: [...form.skills, { name: "", proficiency: "" }],
                  })
                }
              >
                + Add Skill
              </button>
            )}

            {/* Education Input - max 2 */}
            {form.education.map((edu, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-4">
                  <label className="form-label text-white">Degree</label>
                  <input
                    type="text"
                    className="form-control p-3"
                    value={edu.degree}
                    onChange={(e) => {
                      const education = [...form.education];
                      education[index].degree = e.target.value;
                      setForm({ ...form, education });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-white">Year</label>
                  <input
                    type="text"
                    className="form-control p-3"
                    value={edu.year}
                    onChange={(e) => {
                      const education = [...form.education];
                      education[index].year = e.target.value;
                      setForm({ ...form, education });
                    }}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label text-white">Description</label>
                  <input
                    type="text"
                    className="form-control p-3"
                    value={edu.description}
                    onChange={(e) => {
                      const education = [...form.education];
                      education[index].description = e.target.value;
                      setForm({ ...form, education });
                    }}
                  />
                </div>
                {form.education.length > 1 && (
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn mt-3"
                      onClick={() => {
                        const updated = form.education.filter(
                          (_, i) => i !== index
                        );
                        setForm({ ...form, education: updated });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}
            {form.education.length < 2 && (
              <button
                type="button"
                className="btn mb-3"
                onClick={() =>
                  setForm({
                    ...form,
                    education: [
                      ...form.education,
                      { degree: "", year: "", description: "" },
                    ],
                  })
                }
              >
                + Add Education
              </button>
            )}

            <div className="col-12">
              <label className="form-label text-white">Profile Image</label>
              <input
                type="file"
                name="image"
                className="form-control p-3"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setImage(file || null);
                  setImagePreview(file ? URL.createObjectURL(file) : null);
                }}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  className="img-thumbnail mt-2"
                  style={{ maxHeight: 100 }}
                  alt="preview"
                />
              )}
            </div>

            <div className="col-12">
              <button className="btn">
                <i className="fa fa-plus-circle me-2"></i> Add Member
              </button>
            </div>
          </form>

          <h4 className="text-white mb-3">Team Members</h4>
          <div className="row">
            {members.map((member) => (
              <div key={member._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card bg-dark text-white border border-secondary h-100 shadow-sm">
                  <div className="text-center pt-4">
                    <img
                      src={member.image?.url}
                      alt={member.image?.alt || "Profile"}
                      className="rounded-circle"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">{member.name}</h5>
                    <p className="mb-1">{member.jobTitle}</p>
                    <p className="small text-secondary">{member.aboutMe}</p>
                    <div className="d-flex justify-content-center gap-2 mt-2">
                      {member.socials.map((social: any, i: number) => (
                        <a
                          key={i}
                          href={social.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white admin-social "
                        >
                          {/* <i className="fa fa-link"></i> */}
                          <p className="text-capitalize  " >{social.social}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {!members.length && (
              <p className="text-white text-center mt-4">
                No team members found.
              </p>
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
