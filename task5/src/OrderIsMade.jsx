import React from 'react';
import { useLocation } from 'react-router-dom';

const OrderIsMade = () => {
    const location = useLocation();
    const orderData = location.state || {};
    const cart = orderData.cart || [];

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div id='orderIsMade'>
            <img src=".\img\Group 425.png" alt="" className='img-tick-OrderIsMade' />
            <h2 className='headerOrderIsMade'>Thank you for your order!</h2>
            <p className='infoOrderIsMade'>The order confirmation email with details of your order and a link to track its progress has been sent to your email address.</p>
            <h3 className='orderNumber'>Your order # is 000000003 - PENDING</h3>
            <div className="orderDetails">
                <div className="personalInfo">
                    <div className="contactInfo">
                        <h3 className='headerPersonalInfo'> <img src=".\img\Group.png" alt="" />Contact Information</h3>
                        <p className='personalName'>{orderData.firstName} {orderData.lastName}</p>
                        <p className='personalEmail'>{orderData.email}</p>
                        <p className='personalPhone'>{orderData.phone}</p>
                    </div>
                    <div className="shipmentInfo">
                        <h3 className='headerPersonalInfo'> <img src=".\img\truck.png" alt="" />Shipment Information</h3>
                        <p className='address'>{orderData.address}, {orderData.apartment}</p>
                        <p className='address'>{orderData.city}, {orderData.country}, {orderData.ZIP}</p>
                        <p className='address'>{orderData.state}</p>

                    </div>
                </div>
                <div className="productsBlock">
                    <h3 className='headerProductsBlock'><img src=".\img\Group2.png" alt="" />Order summary</h3>
                    {cart.map((item) => (
                        <div key={item.id} className="order-item">
                            <img src={item.image} alt={item.name} className="order-item-image" />
                            <div className="order-item-details">
                                <img src={item.thumbnail} alt={item.title} className='imgProduct' />
                                <div className="itemInfo">
                                    <p>{item.title}</p>
                                    <p><strong>${item.price}, {item.quantity} products</strong></p>
                                </div>
                            </div>
                            <hr width="95%" />
                        </div>
                    ))}
                    <div className="price">
                        <div className='priceName'>
                            <p className='nameOfPrice'>Subtotal:</p>
                            <p className='nameOfPrice'>Shipping & Handling:</p>
                            <p className='nameOfPrice'>Tax:</p>
                            <h3 className='nameOfPrice'>Grand Total:</h3>
                        </div>
                        <div className='priceAmount'>
                            <p className='amountOfPrice'> ${getTotalPrice()}</p>
                            <p className='amountOfPrice'>$0.00</p>
                            <p className='amountOfPrice'>$0.00</p>
                            <h3 className='amountOfPrice'> ${getTotalPrice()}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <button className='nextStep continue'>Continue shopping</button>
        </div>
    );
};

export default OrderIsMade;
