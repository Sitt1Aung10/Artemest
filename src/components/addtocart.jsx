import React, { useEffect, useState } from 'react';

function AddToCart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('addToCart')) || [];
        setCartItems(stored);
    }, []);

    const removeFromAddTocart = (productId) => {
        const updated = cartItems.filter(item => item.productID !== productId);
        setCartItems(updated);
        localStorage.setItem('addToCart', JSON.stringify(updated));
    }


return (
    <div className="cartContainer">
        <h2>My Cart</h2>
        {cartItems.length === 0 ? (
            <p>No items in cart.</p>
        ) : (
            cartItems.map((item, index) => (
                <div key={index} className="cartCard">
                    <img src={`http://localhost/artemestbackend/product/uploads/${item.productImage}`} />
                    <p>{item.productName}</p>
                    <p>Price: {item.productPrice} USD</p>
                    <p>Shipping Time : {item.shippingTime} </p>
                    <button onClick={() => removeFromAddTocart(item.productID)}>Remove</button>
                </div>
            ))
        )}
    </div>
)
}

export default AddToCart;