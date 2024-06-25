import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Cart from './Cart';
import ContactInfo from './ContactInfo.jsx';
import ShipmentInfo from './ShipmentInfo';
import OrderIsMade from './OrderIsMade.jsx';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const existingItem = updatedCart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }
      return updatedCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.id !== productId);
      return updatedCart;
    });
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      return updatedCart;
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      return updatedCart;
    });
  };

  return (
    <Router>
      <div>
        <div className="header">
          <img src="./img/Logo.png" alt="#" className='imgLogoHeader' />
          <Link to="/cart" className='buttonHeader'>
            <img src="./img/Icon.png" alt="" />
            Cart {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} cart={cart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />} />
          <Route path="/contactInfo" element={<ContactInfo />} />
          <Route path="/shipmentInfo" element={<ShipmentInfo />} />
          <Route path="/orderIsMade" element={<OrderIsMade />} />
          <Route path="*" element={<ContactInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
