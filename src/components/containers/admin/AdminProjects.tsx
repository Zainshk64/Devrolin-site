import React from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface Project {
  _id: string;
  title: string;
  owner: string;
  sector: string;
  description: string;
  result: string;
  startDate: string;
  endDate: string;
  mainImage?: {
    url: string;
    alt?: string;
  };
}

interface AdminProjectsProps {
  projects: Project[];
}

export default function AdminProjects({ projects }: AdminProjectsProps) {
  useAdminAuth();

  return (
    <div className="container mt-4">
      <h4 className="text-white mb-4">All Projects</h4>

      {projects.length > 0 ? (
        <div className="row">
          {projects.map((project) => (
            <div key={project._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card bg-black text-white border border-secondary h-100">
                <img
                  src={project.mainImage?.url}
                  className="card-img-top img-fluid"
                  alt={project.mainImage?.alt || 'project'}
                  style={{ height: 180, objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="mb-1">
                    <strong>Owner:</strong> {project.owner}
                  </p>
                  <p className="mb-1">
                    <strong>Sector:</strong> {project.sector}
                  </p>
                  <p className="small text-secondary">{project.description}</p>
                  <p className="mb-1">
                    <strong>Duration:</strong>{' '}
                    {new Date(project.startDate).toLocaleDateString()} -{' '}
                    {new Date(project.endDate).toLocaleDateString()}
                  </p>
                  <p className="mb-0">
                    <strong>Result:</strong> {project.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-center mt-4">No projects found.</p>
      )}
    </div>
  );
}
