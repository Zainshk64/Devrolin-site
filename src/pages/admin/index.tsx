import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/layout/AdminLayout';

const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) router.push('/admin/login');
  }, []);

  return (
    <AdminLayout>
      <h3 className="text-3xl font-bold">Welcome to the Dashboard</h3>
      {/* Add quick stats or summary here */}
    </AdminLayout>
  );
};

export default AdminDashboard;
