import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';

const AdminLogin = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin');
    } else {
      alert('Unauthorized');
    }
  };

  return (
                    // style={{ border: '2px solid #FF7425' }}
    <Layout header={1} footer={5} video={0}> 
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
        <div className="card bg-black shadow p-4" style={{ maxWidth: '400px', width: '100%', border:'2px solid #FF7425' }}>
          <div className="card-body">
            <h3 className="card-title title title-anim text-center mb-4">Admin Login</h3>
            <div className="mb-3">
              <label htmlFor="adminPassword" className="form-label">Username:</label>
              <input
                type="Username"
                className="form-control"
                id="adminusername"
                placeholder="Enter Username"
                // value={password}a
                // onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="adminPassword" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="adminPassword"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* <div className="d-grid">
              <button  className="btn btn--secondary text-black fw-bold">
                Login
              </button>
            </div> */}
             <div className="section__content-cta">
                <button onClick={handleLogin} className="btn btn--primary">
                  Login
                </button>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;
