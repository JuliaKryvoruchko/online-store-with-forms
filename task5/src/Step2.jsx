import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Step2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { step } = location.state || { step: 1 };

  const finishProcess = () => {
    navigate('/', { state: { step: step + 1 } });
  };

  return (
    <div>
      <h1>Step 2</h1>
      <p>Current Step: {step}</p>
      <button onClick={finishProcess} className='finish-btn'>
        Finish
      </button>
    </div>
  );
};

export default Step2;
