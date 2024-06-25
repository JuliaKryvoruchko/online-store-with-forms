import React from 'react';
import { useNavigate } from 'react-router-dom';
import DataDisplay from './addJSON.jsx';

const Home = ({ addToCart, cart }) => {
  const navigate = useNavigate();

  const startProcess = () => {
    navigate('/step1', { state: { step: 1 } });
  };

  return (
    <div>
      <DataDisplay addToCart={addToCart} cart={cart} />
      <button onClick={startProcess} className='start-btn'>
        Start Process
      </button>
    </div>
  );
};

export default Home;
