import AdminCreateProject from "@/components/containers/admin/AdminCreateProject";
import AdminProjects from "@/components/containers/admin/AdminProjects";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// 👇 define Project type
interface Project {
  _id: string;
  title: string;
  owner: string;
  sector: string;
  description: string;
  result: string;
  startDate: string;
  endDate: string;
  thumbnail?: {
    url: string;
    alt?: string;
  };
}

export default function Projects() {
  useAdminAuth();

  // ✅ now projects is properly typed
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(
        "https://pleasing-consideration-production.up.railway.app/api/projects/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setProjects(data.projects || []);
      } else {
        toast.error(data.message || "Failed to load projects");
      }
    } catch (err) {
      toast.error("Server error while fetching projects");
    }
  };

  const handleDeleteProject = async (id: string) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(
        `https://pleasing-consideration-production.up.railway.app/api/admin/delete-project/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Project deleted!");
        setProjects((prev) => prev.filter((p) => p._id !== id)); // ✅ works now
      } else {
        toast.error(data.message || "Failed to delete project");
      }
    } catch (err) {
      toast.error("Something went wrong while deleting project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Head>
        <title>Admin Projects</title>
        <meta
          name="description"
          content="The official Next.js Admin Dashboard"
        />
      </Head>
      <AdminLayout>
        <AdminCreateProject onProjectAdded={fetchProjects} />
        <AdminProjects projects={projects} onDelete={handleDeleteProject} />
      </AdminLayout>
    </>
  );
}
