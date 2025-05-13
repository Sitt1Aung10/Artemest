import React, { useEffect, useState } from 'react';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistItems(stored);
  }, []);

  const removeFromWishlist = (productId) => {
    const updated = wishlistItems.filter(item => item.productID !== productId);
    setWishlistItems(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  return (
    <div className="wishlistContainer">
      <h2>My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        wishlistItems.map((item, index) => (
          <div key={index} className="wishlistCard">
            <img src={`http://localhost/artemestbackend/product/uploads/${item.productImage}`} />
            <p>{item.productName}</p>
            <p>Price: {item.productPrice} USD</p>
            <p>Shipping Time : {item.shippingTime} </p>
            <button onClick={() => removeFromWishlist(item.productID)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;
