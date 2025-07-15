// src/components/layout/AdminLayout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const tabs = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Blogs', href: '/admin/blogs' },
  { name: 'Portfolio', href: '/admin/portfolio' },
  { name: 'Projects', href: '/admin/projects' },
  { name: 'Testimonials', href: '/admin/testimonials' },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin/login');
  };

  return (
    <div className="container-fluid bg text-white min-vh-100">
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div className="col-auto border-end border-secondary-subtle col-md-3 col-xl-2 px-sm-2 px-0">
          <div className="d-flex flex-column align-items-start px-3 pt-4 min-vh-100">
            <h4 className="text-white fw-bold mb-4">Admin Panel</h4>

            <ul className="nav nav-pills flex-column mb-auto w-100">
              {tabs.map((tab) => (
                <li key={tab.name} className=" w-100 mb-2">
                  <Link href={tab.href} className="nav-link btn  w-100 px-3 py-2 rounded">
                    {tab.name}
                  </Link>
                </li>
              ))}
            </ul>

            <button onClick={handleLogout} className="btn btn--secondary mt-auto mb-3 w-100">
              Logout
            </button>
          </div>
        </div>

        {/* Main content area */}
        <div className="col py-4 px-5">
          <div className="container">{children}</div>
        </div>
      </div>
    </div>
  );
}
