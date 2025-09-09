import AdminCreateProject from "@/components/containers/admin/AdminCreateProject";
import AdminProjects from "@/components/containers/admin/AdminProjects";
import AdminLayout from "@/components/layout/AdminLayout";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function projects() {

  useAdminAuth();
    const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch('https://pleasing-consideration-production.up.railway.app/api/projects/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setProjects(data.projects || []);
      } else {
        toast.error(data.message || 'Failed to load projects');
      }
    } catch (err) {
      toast.error('Server error while fetching projects');
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
        <AdminCreateProject onProjectAdded={fetchProjects}/>
        <AdminProjects projects={projects} />
      </AdminLayout>
    </>
  );
}
