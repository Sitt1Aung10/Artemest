import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function SignupForm() {
  const [formData, setformData] = useState({
        email: '',
        password: '',
});
const navigate = useNavigate();
const handleChange = (e) => {
    setformData ({
        ...formData,
        [e.target.name]: e.target.value,
    })
}
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your signup logic here
try {
    const response = await fetch('http://localhost/artemestbackend/user/signup.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message);
    navigate('/signin'); // Redirect to login page after successful signup
  } catch (error) {
    console.error('Error during signup:', error);
    alert('An error occurred during signup. Please try again.');
  }
};
  return (
    <div style={{
      color: '#fff',
       
        padding: '20px',
        borderRadius: '5px',
        width: '100px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    }} className='signupForm'>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder='Enter your email' value={formData.email} onChange={handleChange} required/>
            <input type="password" name="password" placeholder='Enter your password' value={formData.password} onChange={handleChange} required/>
            <button type='submit'>Sign Up</button>
        </form>
    </div>
  )
};

