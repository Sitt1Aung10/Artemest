import Header from './header';
import Homepage from './homepage';
import RegisterContent from './registerContent';
import BenifitContent from './benifitContent';
import BlogSection from './blogSection';
import Footer from './footer';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function HomePagelayout() {
    const [username, setUsername] = useState('');
    useEffect(() => {
        const checkSession = async () => {
          try {
            const response = await axios.get('http://localhost/artemestbackend/user/checkSession.php', {
              withCredentials: true
            });
    
            if (response.data.sessionActive) {
              const email = response.data.userEmail;
              const name = email.split('@')[0];
              setUsername(name); // React way
            } else {
              console.log('No session');
            }
          } catch (error) {
            console.error('Error checking session:', error);
          }
        };
    
        checkSession();
      }, []);
    
    

    return (
        <div>
            <Header />
            {username && <p style={{zIndex:'9',position:'relative',top:'200px',color:'#000'}}>Welcome, {username}!</p>}
            <Homepage />
            <RegisterContent />
            <BenifitContent />
            <BlogSection
                imgSrc="/images/customandbespoke.avif"
                title='custom & bespoke'
                content='lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                discoverLink='#'
                imageLeft={true}
            />
            <br></br>
            <br></br>
            <BlogSection
                imgSrc="/images/customandbespoke.avif"
                title='custom & bespoke'
                content='lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                discoverLink='#'
                imageLeft={false}
            />
            <br></br>
            <br></br>

            <BlogSection
                imgSrc="/images/customandbespoke.avif"
                title='custom & bespoke'
                content='lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                discoverLink='#'
                imageLeft={true}
            />
            <br></br>
            <br></br>
            <BlogSection
                imgSrc="/images/customandbespoke.avif"
                title='custom & bespoke'
                content='lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                discoverLink='#'
                imageLeft={true}
            />
            <br></br>
            <br></br>
            <BlogSection
                imgSrc="/images/customandbespoke.avif"
                title='custom & bespoke'
                content='lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                discoverLink='#'
                imageLeft={true}
            />
            <br></br>
            <br></br>



            <Footer />
        </div>
    )
}

export default HomePagelayout