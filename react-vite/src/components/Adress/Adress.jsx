import { useEffect, useState } from 'react';
import './Adress.css'
import { useDispatch,useSelector } from 'react-redux';
import { addOrderThunk } from '../../redux/order';
import { useNavigate } from 'react-router-dom';
import { getOrderThunk } from '../../redux/order';

const Address = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [country, setCountry] = useState('');
    const [fullName, setFullName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [validationErrors,setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    

    const products = useSelector(state => Object.values(state.shoppingCart) || {})

    const totalPrice = products.reduce((acc,product) => { 
        return acc + (product.quantity * product.price)
         
     },0)
    
    useEffect(() => {
        const errors = {};
        if (!country) errors.country = 'Please enter a country.';
        if (!fullName) errors.fullName = 'Please enter your full name.';
        if (!streetAddress) errors.streetAddress = 'Please enter a street address.';
        if (!apartment) errors.apartment = 'Please enter an apartment number.';

        
        if (!city) errors.city = 'Please enter a city.';
        if (!zipCode) errors.zipCode = 'Please enter a zip code.';

        setValidationErrors(errors);
    }, [country, fullName, streetAddress,city,apartment, zipCode]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (Object.values(validationErrors).length > 0) {
            setHasSubmitted(true)
            return
        }


        const data = {
            "country": country,
            "fullName": fullName,
            "streetAddress": streetAddress,
            "apartment": apartment,
            "city": city,
            "zipCode": zipCode
        }
    
        await dispatch(addOrderThunk(data))
        await dispatch(getOrderThunk())
        navigate('/orders')
        
    };

    return (
        <div className='checkout-address-form'>
            <form onSubmit={handleSubmit} className='formo'>
                <div>
                    <label>Country:
                        {hasSubmitted && validationErrors.country && ( 
                            <span className='error'>{validationErrors.country}</span>
                        )}
                    </label>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div>
                    <label>Full Name:
                    {hasSubmitted && validationErrors.fullName && ( 
                            <span className='error'>{validationErrors.fullName}</span>
                        )}
                    </label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                    <label>Street Address:
                    {hasSubmitted && validationErrors.streetAddress && ( 
                            <span className='error'>{validationErrors.streetAddress}</span>
                        )}
                    </label>
                    <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                </div>
                <div>
                    <label>Apartment:
                    {hasSubmitted && validationErrors.apartment && ( 
                            <span className='error'>{validationErrors.apartment}</span>
                        )}
                    </label>
                    <input type="text" value={apartment} onChange={(e) => setApartment(e.target.value)} />
                </div>
                <div>
                    <label>City:
                    {hasSubmitted && validationErrors.city && ( 
                            <span className='error'>{validationErrors.city}</span>
                        )}
                    </label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                    <label>Zip Code:
                    {hasSubmitted && validationErrors.zipCode && ( 
                            <span className='error'>{validationErrors.zipCode}</span>
                        )}
                    </label>
                    <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                </div>
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <p>Subtotal: ${totalPrice.toFixed(2)}</p>
                </div>
                <button type="submit" className="place-order-btn">Place Your Order</button>
            </form>
        </div>
    );
};

export default Address;
