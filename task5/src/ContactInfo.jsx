import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ContactInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const cart = location.state?.cart || [];
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});
    const [isTouched, setIsTouched] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false
    });

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        validateForm();
    }, [formData]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }

        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number is invalid';
        }

        setErrors(newErrors);
        setIsButtonEnabled(Object.keys(newErrors).length === 0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleBlur = (field) => {
        setIsTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
    };

    const handleNextStep = () => {
        if (isButtonEnabled) {
            navigate('/shipmentInfo', { state: { ...formData, cart } });
        }
    };

    return (
        <div id='contactInfo'>
            <nav>
                <a href="./cart">Cart</a>
                <img className='imgArrow' src=".\img\_.png" alt="" />
                <a href="" className='activeA'>Contact information</a>
                <img className='imgArrow' src=".\img\_.png" alt="" />
                <a href="">Shipment information</a>
            </nav>
            <h2 className='headerContactInfo'>Contact information</h2>
            <div className='infoBlock'>
                <div className='firstNameBlock'>
                    <label htmlFor="firstName">First name*</label>
                    <input type="text" name="firstName" placeholder='Enter your first name' onChange={handleChange} className='firstName' onBlur={() => handleBlur('firstName')} />
                    {isTouched.firstName && errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>
                <div className='lastNameBlock'>
                    <label htmlFor="lastName">Last name*</label>
                    <input type="text" name="lastName" placeholder='Enter your last name' onChange={handleChange} className='lastName' onBlur={() => handleBlur('lastName')} />
                    {isTouched.lastName && errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>
                <div className='EmailBlock'>
                    <label htmlFor="Email">Email*</label>
                    <input type="email" name="email" placeholder='Enter your email' onChange={handleChange} className='Email' onBlur={() => handleBlur('email')} />
                    {isTouched.email && errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className='phoneBlock'>
                    <label htmlFor="phone">Phone*</label>
                    <input type="text" name="phone" placeholder='Enter your phone' onChange={handleChange} className='phone' onBlur={() => handleBlur('phone')} />
                    {isTouched.phone && errors.phone && <span className="error">{errors.phone}</span>}
                </div>
            </div>
            <button onClick={handleNextStep} className='nextStep' disabled={!isButtonEnabled}>Next step</button>
        </div>
    );
}

export default ContactInfo;
