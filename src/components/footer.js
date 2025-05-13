import React from 'react';
import  SignupForm  from './signupForm';

const Footer = () => {
  return (
    <footer style={{backgroundColor:'#222222', color:'white', padding:'20px 0',position:'relative'}}>
        <section style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
        <SignupForm />
        <div>
            <h1>Follow Us on Social Media</h1>
            <div className="social-media-icons">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <i className='fa-brands fa-facebook'></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                   <i className='fa-brands fa-instagram'></i>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                   <i className='fa-brands fa-twitter'></i>
                </a>
            </div>
        </div>
        <div>
            <h2>Contact Us</h2>
            <p>Email:artemest@gmail.com</p>
            <p>Hotline:+959779669077</p>
        </div>
        </section>
        <section style={{textAlign:'center', marginTop:'20px'}}>
            <p>&copy; 2024 Artemest. All rights reserved.</p>
            <p>Terms of Service | Privacy Policy</p>
        </section>
    </footer>
  )
}

export default Footer