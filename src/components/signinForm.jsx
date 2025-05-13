import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function SigninForm() {
  const [formData, setformData] = useState({
    email: '',
    password: '',
    rememberMe: false, // Add rememberMe to formData
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setformData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox state
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    try {
      const response = await axios.post(
        'http://localhost/artemestbackend/user/signin.php',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      alert(response.data.message);
      navigate('/', { replace: true });
      window.location.reload();
  
    } catch (error) {
      console.error('Sign in error:', error); // 👈 show actual error
      alert('Error signing in.');
    }
  };

  return (
    <div className='signinForm'>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder='Enter your email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder='Enter your password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
        />
        <label htmlFor="rememberMe">Remember Me</label>
        <button type='submit'>Sign In</button>
      </form>
      <Link to='/signup'>Don't have an account? Sign Up</Link>
      <Link to='/'>Go To Home Page</Link>
    </div>
  );
}