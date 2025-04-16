import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To store error messages
  const navigate = useNavigate();

  // Redirect to admin if the token exists (user is already logged in)
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const res = await axios.post('http://localhost:5000/admin/login', {
        email,
        password,
      });

      if (res.data.success) {
        // Save token and redirect to /admin
        localStorage.setItem('adminToken', res.data.token);
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password.'); // Show error message
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="border px-3 py-2 mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {/* Display error message if there is one */}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
