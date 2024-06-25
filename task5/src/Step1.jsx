import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Step1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { step } = location.state || { step: 1 };

  const goToStep2 = () => {
    navigate('/step2', { state: { step: step + 1 } });
  };

  return (
    <div>
      <h1>Step 1</h1>
      <p>Current Step: {step}</p>
      <button onClick={goToStep2} className='next-btn'>
        Next Step
      </button>
    </div>
  );
};

export default Step1;
