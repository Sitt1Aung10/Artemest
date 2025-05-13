import React, { useEffect, useState } from 'react';

export function AdminPanel() {
    const [products, setProduct] = useState({
        productName: '',
        productKind: '',
        productPrice: '',
        shippingTime: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [purchaseData, setPurchaseData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch purchase product data on mount
    useEffect(() => {
        const fetchPurchaseData = async () => {
            try {
                const response = await fetch('http://localhost/artemestbackend/adminPanel.php', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();
                if (result.success) {
                    setPurchaseData(result.data);
                } else {
                    console.error('Failed to fetch:', result.message);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPurchaseData();
    }, []);

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        setProduct({
            ...products,
            [e.target.name]: e.target.value
        });
        console.log(products);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        const formData = new FormData();
        Object.entries(products).forEach(([key, value]) => {
            formData.append(key, value);
        });
        if (imageFile) formData.append('productImage', imageFile);

        try {
            const response = await fetch('http://localhost/artemestbackend/product/addProduct.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            alert(result.message);
        } catch (error) {
            console.error('Error during upload:', error);
            alert('An error occurred during uploading. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Admin Panel</h1>

            <form onSubmit={handleSubmit} id='adminPanel' encType='multipart/form-data'>
                <input onChange={handleChange} name='productName' value={products.productName} type='text' placeholder='Product Name' />
                <input onChange={handleChange} name='productKind' value={products.productKind} type='text' placeholder='Product Kind' />
                <input onChange={handleChange} name='productPrice' value={products.productPrice} type='text' placeholder='Product Price' />
                <input onChange={handleChange} name='shippingTime' value={products.shippingTime} type='text' placeholder='Shipping Time' />
                <input onChange={handleFileChange} name='productImage' type='file' accept='image/*' />
                <button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>

            <hr />

            <h2>Purchase Product List</h2>
            {isLoading ? (
                <p>Loading purchases...</p>
            ) : purchaseData.length === 0 ? (
                <p>No purchase records found.</p>
            ) : (
                <table border="1" cellPadding="5" style={{ marginTop: '10px' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Kind</th>
                            <th>Price</th>
                            <th>Buyer</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseData.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.productID}</td>
                                <td>{product.productName}</td>
                                <td>{product.productKind}</td>
                                <td>{product.productPrice}</td>
                                <td>{product.buyerName}</td>
                                <td>{product.phoneNumber}</td>
                                <td>{product.address}</td>
                                <td>{product.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
