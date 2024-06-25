import React, { useEffect, useState } from 'react';

const DataDisplay = ({ addToCart, cart }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = 'https://dummyjson.com/products';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                setData(data.products);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleAddToCart = (product) => {
        if (!cart.some(cartItem => cartItem.id === product.id)) {
            addToCart(product);
        }
    };



    return (
        <div className='products'>
            {data.map((item) => (
                <div key={item.id} className="item">
                    <img src={item.thumbnail} alt={item.title} className="item-image" />
                    <h2 className='item-header'>{item.title}</h2>
                    <p className='item-price'>${item.price}</p>
                    <button
                        className='item-btn'
                        onClick={() => handleAddToCart(item)}
                        disabled={cart.some(cartItem => cartItem.id === item.id)}
                    >
                        {cart.some(cartItem => cartItem.id === item.id) ? (
                            <>
                                <img
                                    src="./img/Icon (1).png"
                                    alt="Added"
                                    className="btn-icon"
                                />
                                Added
                            </>
                        ) : (
                            <>
                                <img
                                    src="./img/+.png"
                                    alt="Add to cart"
                                    className="btn-icon"
                                />
                                Add to cart
                            </>
                        )}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default DataDisplay;
