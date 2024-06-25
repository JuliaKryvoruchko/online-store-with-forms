import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, removeFromCart, increaseQuantity, decreaseQuantity }) => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/contactInfo', { state: { cart } });
    };

    const handleRemove = (productId) => {
        removeFromCart(productId);
    };

    const handleIncreaseQuantity = (productId) => {
        increaseQuantity(productId);
    };

    const handleDecreaseQuantity = (productId) => {
        decreaseQuantity(productId);
    };

    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const calculateTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <div id='cart'>
            <nav>
                <a href="" className='activeA'>Cart</a>
                <img className='imgArrow' src=".\img\_.png" alt="" />
                <a href="/contactInfo">Contact information</a>
                <img className='imgArrow' src=".\img\_.png" alt="" />
                <a href="">Shipment information</a>
            </nav>
            <h2 className='headerCart'>Cart</h2>
            {(!cart.length) ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div className='itemInCart' key={item.id}>
                            <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                            <div className="item-details">
                                <h3 className='headerItemInCart'>{item.title}</h3>
                                <div className="quantity-controls">
                                    <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                </div>
                            </div>
                            <div className="price-and-remove">
                                <span>Price: ${(item.price * item.quantity).toFixed(2)}</span>
                                <button onClick={() => handleRemove(item.id)} className="remove-btn">
                                    <img src=".\img\delete.png" alt="" />Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="total">
                        <p className='totalItems'>Together: <h3 className='numberOfTotalItems'>{calculateTotalItems()} products</h3></p>
                        <p className='totalSum'>Sum: <h3 className='numberOfTotalSum'>${calculateTotalAmount()}</h3></p>
                    </div>
                    <button onClick={handleCheckout} className='nextStep'>Next step</button>
                </div>
            )}
        </div>
    );
};

export default Cart;
