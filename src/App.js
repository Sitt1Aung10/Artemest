import logo from './logo.svg';
import './App.css';
import SigninForm from './components/signinForm';
import {Furniture }from './components/furniture';
import { AdminPanel } from './components/adminPanel';
import { Routes, Route } from 'react-router-dom';
import HomePagelayout from './components/homePagelayout';
import  Wishlist from './components/wishlist';
import AddToCart from './components/addtocart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePagelayout />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/Furniture" element={<Furniture />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/addtocart" element={<AddToCart />} />
      </Routes>
    </div>

  );
}

export default App;
