import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ShipmentInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const contactData = location.state || {};
    const cart = contactData.cart || []
    const [formData, setFormData] = useState({
        address: '',
        apartment: '',
        city: '',
        country: '',
        state: '',
        ZIP: ''
    });

    const [errors, setErrors] = useState({});
    const [isTouched, setIsTouched] = useState({
        address: false,
        address: false,
        city: false,
        country: false,
        state: false,
        ZIP: false
    });

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        const savedFormData = JSON.parse(localStorage.getItem('contactFormData')) || {};
        setFormData(savedFormData);
    }, []);

    useEffect(() => {
        validateForm();
        localStorage.setItem('contactFormData', JSON.stringify(formData));
    }, [formData]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.address) {
            newErrors.address = 'Address is required';
        }

        if (!formData.apartment) {
            newErrors.apartment = 'Apartment is required';
        }

        if (!formData.city) {
            newErrors.city = 'City is required';
        }

        if (!formData.country) {
            newErrors.country = 'Country is required';
        }

        if (!formData.state) {
            newErrors.state = 'State is required';
        }

        if (!formData.ZIP) {
            newErrors.ZIP = 'ZIP code is required';
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
            navigate('/orderIsMade', { state: { ...contactData, ...formData, cart } });
        }
    };



    const countries = [
        "Ukraine",
        "Poland",
        "United States",
        "Canada",
        "Germany",
        "France",
        "China",
        "Japan",
        "Mexico"
    ];

    const states = [
        "California",
        "Texas",
        "New York",
        "Another"
    ]

    return (
        <div id='shipmentInfo'>
            <nav>
                <a href="./cart">Cart</a>
                <img className='imgArrow' src=".\img\_.png" alt="" />
                <a href="./contactInfo">Contact information</a>
                <img className='imgArrow' src=".\img\_.png" alt="" />
                <a href="" className='activeA'>Shipment information</a>
            </nav>
            <h2 className='headerShipmentInfo'>Shipment information</h2>
            <div className="infoBlockShipment">
                <div className="addressBlock">
                    <label htmlFor="address">Address (No P. O. Boxes)*</label>
                    <input
                        type="text"
                        name="address"
                        placeholder='Enter your address'
                        className='address'
                        value={formData.address}
                        onChange={handleChange}
                        onBlur={() => handleBlur('address')}
                    />
                    {isTouched.address && errors.address && <span className="error">{errors.address}</span>}
                </div>
                <div className="apartmentBlock">
                    <label htmlFor="apartment">Apartment, suite ect.(optional)*</label>
                    <input
                        type="text"
                        name="apartment"
                        placeholder='Enter your apartment information'
                        className='apartment'
                        value={formData.apartment}
                        onChange={handleChange}
                        onBlur={() => handleBlur('apartment')}
                    />
                    {isTouched.apartment && errors.apartment && <span className="error">{errors.apartment}</span>}
                </div>
                <div className="cityBlock">
                    <label htmlFor="city">City*</label>
                    <input
                        type="text"
                        name="city"
                        placeholder='Enter your city'
                        className='city'
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={() => handleBlur('city')}
                    />
                    {isTouched.city && errors.city && <span className="error">{errors.city}</span>}
                </div>
                <div className="infoCountry">
                    <div className="countryBlock">
                        <label htmlFor="country">Country/Region*</label>
                        <select
                            name="country"
                            id="country"
                            value={formData.country}
                            onChange={handleChange}
                            onBlur={() => handleBlur('country')}>
                            <option value="">Select your country/region</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                        {isTouched.country && errors.country && <span className="error">{errors.country}</span>}
                    </div>
                    <div className="stateBlock">
                        <label htmlFor="state">State*</label>
                        <select
                            name="state"
                            id="state"
                            value={formData.state}
                            onChange={handleChange}
                            onBlur={() => handleBlur('state')}>
                            <option value="">Select your state</option>
                            {states.map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>
                        {isTouched.state && errors.state && <span className="error">{errors.state}</span>}
                    </div>
                    <div className="ZIPBlock">
                        <label htmlFor="ZIP">ZIP code*</label>
                        <input
                            type="text"
                            name="ZIP"
                            placeholder='Enter your ZIP code'
                            className='ZIP'
                            value={formData.ZIP}
                            onChange={handleChange}
                            onBlur={() => handleBlur('ZIP')}
                        />
                         {isTouched.ZIP && errors.ZIP && <span className="error">{errors.ZIP}</span>}
                    </div>
                </div>
            </div>
            <button onClick={handleNextStep} className='nextStep' disabled={!isButtonEnabled}>Submit order</button>
        </div>
    );
};

export default ShipmentInfo;
