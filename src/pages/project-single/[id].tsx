// pages/project-single/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { toast } from 'react-toastify';
import CmnBanner from '@/components/layout/banner/CmnBanner';
import ProjectDetailsMain from '@/components/containers/project/ProjectDetailsMain';

export default function ProjectDetailsPage() {
  const { id } = useRouter().query;
  const [project, setProject] = useState(null);

  const fetchProject = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/projects/${id}`);
      const data = await res.json();
      setProject(data);
    } catch (err) {
      toast.error("Failed to fetch project details");
    }
  };

  useEffect(() => {
    if (id) fetchProject();
  }, [id]);

  if (!project) return <p className="text-white text-center">Loading...</p>;

  return (
    <Layout header={2} footer={5} video={0}>
      <CmnBanner
        title={project.title}
        navigation="Project Details"
        parentLink="projects"
      />
      <ProjectDetailsMain project={project} />
    </Layout>
  );
}
