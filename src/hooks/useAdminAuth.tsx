// hooks/useAdminAuth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useAdminAuth = (): boolean => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.replace('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  return isAuthorized;
};
