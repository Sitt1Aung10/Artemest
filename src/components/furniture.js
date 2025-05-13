import React, { use } from 'react'
import Header from './header'
import { useState, useEffect } from 'react'
import '../App.css'


export function Furniture() {

    const [products, setProduct] = useState([]);

    const [selectedproduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch('http://localhost/artemestbackend/product/fetchProduct.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setProduct(data))
            .catch(error => console.error('Fetch error:', error));
    }, []);

    useEffect(() => {
         const productCards = document.querySelectorAll('.productCard');
        const filterDropdowns = document.querySelectorAll('#filter .dropdown p');
       document.querySelectorAll('#filter .dropdown p').forEach(filterOption => {
    filterOption.addEventListener('click', () => {
        const selectedFilter = filterOption.innerText.toLowerCase();

        document.querySelectorAll('.productCard').forEach(card => {
            const cardText = card.innerText.toLowerCase();

            if (cardText.includes(selectedFilter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
})
const resetFilters = () => {
    // Show all product cards again
    document.querySelectorAll('.productCard').forEach(card => {
        card.style.display = 'block';
    });
};

    useEffect(() => {
        const buyNowButtons = document.querySelectorAll('.buyNow');
        const productCards = document.querySelectorAll('.productCard');
        const handlers = [];

        buyNowButtons.forEach(button => {
            const handler = () => {
                const productCard = button.closest('.productCard');
                const contentInsideProductCard = productCard.querySelectorAll('p');
                const contentInside = productCard.querySelector('.contentInside');
                const form = productCard.querySelector('form');
                const productImage = productCard.querySelector('.productImage');
                const closeButtons = productCard.querySelectorAll('.closeCard');
                const buttons = productCard.querySelectorAll('button');
                const productDetails = productCard.querySelector('.productDetails');

                if (productCard) {
                    productCard.style.position = 'fixed';
                    productCard.style.top = '0';
                    productCard.style.left = '0';
                    productCard.style.width = '100vw';
                    productCard.style.height = '100vh';
                    productCard.style.zIndex = '99';
                    productCard.style.overflowY = 'auto';

                    // Hide clicked buttons except all
                    buyNowButtons.forEach(btn => {
                        if (btn == button) {
                            btn.style.display = 'none';
                        }
                    });

                    productCards.forEach(card => {
                        if (card !== productCard) {
                            card.style.display = 'none';
                        }
                    })

                    closeButtons.forEach(closeButton => {
                        closeButton.style.display = 'block';
                    });

                    if (productImage) {
                        Object.assign(productImage.style, {
                            position: 'fixed',
                            left: '5%',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 'calc(100% - 70%)',
                            backgroundColor: 'white'
                        });
                    }

                    contentInsideProductCard.forEach(p => {
                        Object.assign(p.style, {
                            position: 'relative',
                            right: '5%',
                            textAlign: 'right',
                            fontSize: '1em'
                        });
                    });

                    buttons.forEach(btn => {
                        Object.assign(btn.style, {
                            position: 'relative',
                            top: '80%',
                            left: '60%',
                            padding: '0 40px',
                            marginLeft: '10px'
                        });
                    });

                    if (contentInside) {
                        Object.assign(contentInside.style, {
                            position: 'absolute',
                            right: '5%',
                            top: '10%',
                            width: '50%',
                        });
                    }

                    if (form) {
                        Object.assign(form.style, {
                            display: 'block',
                            position: 'absolute',
                            right: '5%',
                            top: '50%',
                            width: '50%',
                        });
                    }

                    if (productDetails) {
                        productDetails.style.display = 'block';
                    }
                }
            };

            button.addEventListener('click', handler);
            handlers.push({ button, handler });
        });

        // Cleanup all listeners
        return () => {
            handlers.forEach(({ button, handler }) => {
                button.removeEventListener('click', handler);
            });
        };
    }, [products]);


    // Close button functionality
    const closeBtn = document.querySelectorAll('.closeCard');
    const productCards = document.querySelectorAll('.productCard');
    closeBtn.forEach(button => {
        button.addEventListener('click', () => {
            const buyNowButtons = document.querySelectorAll('.buyNow');
            const productCard = button.closest('.productCard');
            const productDetails = button.closest('.productCard').querySelector('.productDetails');
            const buyNowForm = button.closest('.productCard').querySelector('form');
            const productImage = button.closest('.productCard').querySelector('.productImage');
            const contentInsideProductCard = button.closest('.productCard').querySelectorAll('p');
            const contentInside = button.closest('.productCard').querySelector('.contentInside');
            const buttons = button.closest('.productCard').querySelectorAll('button');
            // Reset styles
            if (productCard) {
                productCard.style.position = 'relative';
                productCard.style.top = '0';
                productCard.style.left = '0';
                productCard.style.width = '250px';
                productCard.style.height = 'auto';
                productCard.style.zIndex = '1';
                productCard.style.overflowY = 'hidden';

                closeBtn.forEach(closeButton => {
                    closeButton.style.display = 'none';
                });

                productDetails.style.display = 'none';
                buyNowForm.style.display = 'none';

                // Hide all product cards
                Object.assign(productImage.style, {
                    position: 'relative',
                    left: '0',
                    top: '0',
                    transform: 'translateY(0)',
                    width: '150px',
                    backgroundColor: 'transparent'
                });

                contentInsideProductCard.forEach(p => {
                    Object.assign(p.style, {
                        position: 'relative',
                        right: '0%',
                        textAlign: 'left',
                        fontSize: '1em'
                    });
                })

                Object.assign(contentInside.style, {
                    position: 'relative',
                    right: '0%',
                    top: '0%',
                    width: 'auto',
                });
                productCards.forEach(card => {
                    if (card !== productCard) {
                        card.style.display = 'block';
                    }
                });
                buttons.forEach(btn => {
                    Object.assign(btn.style, {
                        position: 'relative',
                        top: '0%',
                        left: '0%',
                        padding: '0 10px',
                        marginLeft: '0px'
                    });
                });
                // reshown clicked buttons except all
                const buyNowButton = productCard.querySelector('.buyNow');
                if (buyNowButton) {
                    buyNowButton.style.display = 'block';
                }

            }
        });
    });
    //item count state
    const [itemCount, setItemCount] = useState(1);

    const increaseCount = () => {
        if (itemCount < 10) { // Replace 10 with a dynamic stock value if needed
            setItemCount(prev => prev + 1);
        }
    };

    const decreaseCount = () => {
        if (itemCount > 1) {
            setItemCount(prev => prev - 1);
        }
    };

    // Add event listeners to filter items
    useEffect(() => {
        const filterItems = document.querySelectorAll('#filter > div');
        filterItems.forEach(item => {
            const mouseEnterHandler = () => {
                const dropdown = item.querySelector('.dropdown');
                if (dropdown) dropdown.style.display = 'block';
            };

            const mouseLeaveHandler = () => {
                const dropdown = item.querySelector('.dropdown');
                if (dropdown) dropdown.style.display = 'none';
            };

            item.addEventListener('mouseenter', mouseEnterHandler);
            item.addEventListener('mouseleave', mouseLeaveHandler);

            // Cleanup event listeners
            return () => {
                item.removeEventListener('mouseenter', mouseEnterHandler);
                item.removeEventListener('mouseleave', mouseLeaveHandler);
            };
        });
    }, []);

    useEffect(() => {
        const searchInput = document.querySelector('.searchBar input[type="search"]');
        const inputHandler = function () {
            const searchTerm = this.value.trim().toLowerCase();
            const productCards = document.querySelectorAll('.productCard');
            productCards.forEach(card => {
                const productName = card.querySelector('.productName').innerText.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        };

        if (searchInput) {
            searchInput.addEventListener('input', inputHandler);
        }

        // Cleanup event listener
        return () => {
            if (searchInput) {
                searchInput.removeEventListener('input', inputHandler);
            }
        };
    }, []);

    useEffect(() => {
    const furnitureKindFilter = document.querySelectorAll('#furnitureKind button');
    furnitureKindFilter.forEach(button => {
        button.addEventListener('click', () => {
            const selectedKind = button.innerText.toLowerCase();
            const productCards = document.querySelectorAll('.productCard');

            productCards.forEach(card => {
                const productKindText = card.querySelector('.productKind')?.innerText?.toLowerCase();
                if (productKindText && productKindText.includes(selectedKind)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}, []);

    const handleWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const exists = wishlist.some(item => item.productID === product.productID);
    if (exists) {
      alert("Product is already in wishlist!");
      return;
    }

    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert("Added to wishlist!");
  };

  const handleAddtocart = (product) => {
    let addtocart = JSON.parse(localStorage.getItem('addToCart')) || [];
    const exists = addtocart.some(item => item.productID === product.productID);
    if (exists) {
      alert("Product is already in cart!");
      return;
    }

    addtocart.push(product);
    localStorage.setItem('addToCart', JSON.stringify(addtocart));
    alert("Added to cart!");
  }

    return (
        <>
            <Header />
             <div className='searchBar'>
            <input style={{zIndex: '10',
                position: 'fixed',
                top : '30%',
                right:'50px',
                borderRadius:'5px',
                padding:'5px',
                width:'400px',
                height:'30px',
             }} type='search'  placeholder='Search' />
            </div>
            <div id='filter'>

                <div className='filter-items'>
                    <button>material<i class="fa-solid fa-angle-down"></i></button>
                    <div className='dropdown'>
                        <p>Wood</p>
                        <p>Steel</p>
                    </div>
                </div>
                <div className='filter-items'>
                    <button>color<i class="fa-solid fa-angle-down"></i></button>
                    <div className='dropdown'>
                        <p>red</p>
                        <p>blue</p>
                        <p>green</p>
                        <p>yellow</p>
                        <p>black</p>
                        <p>white</p>
                    </div>
                </div>
                <div className='filter-items'>
                    <button>price<i class="fa-solid fa-angle-down"></i></button>
                    <div className='dropdown'>
                        <p>0-100</p>
                        <p>100-200</p>
                        <p>200-300</p>
                        <p>300-400</p>
                        <p>400-500</p>
                    </div>
                </div>
                <div className='filter-items'>
                    <button>shipping time<i class="fa-solid fa-angle-down"></i></button>
                    <div className='dropdown'>
                        <p>1 week - 2 week</p>
                        <p>1 week - 3 week</p>
                    </div>
                </div>
                <button onClick={() => {
                    resetFilters();
                }}>Reset Filter</button>

            </div>
            <div id='furnitureKind'>
                <button>seating</button><br></br>
                <button>table</button><br></br>
                <button>storage</button><br></br>
                <button>outdoor furniture</button>
            </div>
            <section>
                {products.map((product, index) => (
                    <div className='productCard'>
                        <i className='fa-solid fa-xmark closeCard'></i>
                        <img className='productImage' src={`http://localhost/artemestbackend/product/uploads/${product.productImage}`} />
                        <div className='contentInside'>
                            <p className='productName'>{product.productName}</p><br></br>
                            <p className='productKind'>Product Kind - {product.productKind}</p><br></br>
                            <p className='productPrice'>Price - {product.productPrice}USD</p><br></br>
                            <p className='shippingTime'>Shipping Time - {product.shippingTime}</p><br></br>
                            <p className='instock'>Instock - {product.instock}</p><br></br>
                            <p className='productDetails'>{product.productDetails}</p><br></br>
                            <p className='material' style={{ display: 'none' }}>Material - {product.material}</p>
                        </div>
                        <button className='wishList'  onClick={() => handleWishlist(product)}><i class="fa-solid fa-heart"></i></button>
                        <button className='addToCart' onClick={() =>handleAddtocart(product)}><i class="fa-solid fa-cart-shopping"></i></button>
                        <button className='buyNow'>Check The Product</button>
                        <form id={`buyNowForm-${index}`}
                            action='http://localhost/artemestbackend/product/purchaseProduct.php'
                            method='POST'>
                            <input type='hidden' name='productId' value={product.productID} />
                            <input type='hidden' name='productName' value={product.productName} />
                            <input type='hidden' name='productPrice' value={product.productPrice} />
                            <input type='hidden' name='productImage' value={product.productImage} />
                            <input type='hidden' name='shippingTime' value={product.shippingTime} />
                            <input type='hidden' name='productDetails' value={product.productDetails} />
                            <input type='hidden' name='productKind' value={product.productKind} />
                            <input type='text' name='buyerName' placeholder='Enter your name' required />
                            <input type='number' name='phoneNumber' placeholder='Enter Your Phoneumber' required />
                            <input type='text' name='address' placeholder='Address' />
                            <div className='countItems'>
                                <i className='fa-solid fa-plus' onClick={increaseCount}></i>
                                <p className='itemCount'>{itemCount}</p>
                                <i className='fa-solid fa-minus' onClick={decreaseCount}></i>
                            </div>
                            <div id='paymentBox'>
                                <p>COD</p>
                                <p>COD</p>
                                <p>COD</p>
                                <p>COD</p>
                            </div>
                            <button className='buyTheProduct'>Buy The Product</button>
                        </form>
                        
                    </div>
                ))}
            </section>
        </>
    )

}


    window.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        const status = params.get('status');

        if (status === 'success') {
            alert('Purchase successful!');
        } else if (status === 'fail') {
            alert('Purchase failed. Please try again.');
        }
        if (status) {
    // Remove query string from URL
    window.history.replaceState({}, document.title, window.location.pathname);
}

    });


function ProductCard({ product }) {
    const [itemCount, setItemCount] = useState(1);

    const increaseCount = () => {
        if (itemCount < product.instock) {
            setItemCount(prev => prev + 1);
        }
    };

    const decreaseCount = () => {
        if (itemCount > 1) {
            setItemCount(prev => prev - 1);
        }
    };
}


