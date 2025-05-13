import React from 'react';


const SocialMedia = () => {
  return (
    <section id='socialMedia'>
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
    </section>
  )
}

export default SocialMedia;