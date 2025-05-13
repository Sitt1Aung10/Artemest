import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
return (
    <div>
        <header className='app-header'>
            <img className='app-logo' src='/images/logo.png '/>

            <div>
                <button>
                    <Link to='/Wishlist'><span>Your Wish List</span></Link>
                </button>
                <button>
                    <Link to='/addtocart'><span>Your Cart</span></Link>
                </button>
            </div>

            <div>
                <Link to='/signin'>Sign In</Link>
            </div>
            <div>
                <form  method="POST" action="http://localhost/artemestbackend/user/logout.php">
                    <button type='submit'>Log Out</button>
                </form>
            </div>
        </header>
        <nav>
            <ul>
                <Link to='/Furniture' style={{ zIndex: '10', textTransform: 'uppercase', textDecoration: 'none', color: '#000', padding: '10px' }}>furniture</Link>
                <Link to='/' style={{zIndex : '10',textTransform : 'uppercase', textDecoration :'none', color : '#000', padding: '10px'}}>Home</Link>
                <Link to='/' style={{zIndex : '10',textTransform : 'uppercase', textDecoration :'none', color : '#000', padding: '10px'}}>Home</Link>
                <Link to='/' style={{zIndex : '10',textTransform : 'uppercase', textDecoration :'none', color : '#000', padding: '10px'}}>Home</Link>
                <Link to='/' style={{zIndex : '10',textTransform : 'uppercase', textDecoration :'none', color : '#000', padding: '10px'}}>Home</Link>
                <Link to='/' style={{zIndex : '10',textTransform : 'uppercase', textDecoration :'none', color : '#000', padding: '10px'}}>Home</Link>
                <Link to='/' style={{zIndex : '10',textTransform : 'uppercase', textDecoration :'none', color : '#000', padding: '10px'}}>Home</Link>
            </ul>
        </nav>
    </div>
)
}

export default Header