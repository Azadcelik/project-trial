
//todo: when i click to checkout i should trigger my thunk whcih fetch my backend
//todo: then i should navigate to the order history page where my orders is under order table
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderThunk } from "../../redux/order";
import './Order.css';
import { useNavigate } from "react-router-dom";

const Order = () => { 
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const orders = useSelector(state => Object.values(state.order));

    useEffect(() => { 
        dispatch(getOrderThunk());
    }, [dispatch]);


    const handleImageClick = (productId) => { 
        navigate(`/product/${productId}`)
    }

    return (
        <div className="order-page-container">
            <div className="order-summary">My Order History</div>
            {orders.map(order => (
                <div key={order.order_id} className="order-container">
                    <div className="order-header">
                        <h1>Order Date: <span className="order-details">{order.order_date}</span></h1>
                        <h1>Total Price: <span className="order-details">{order.total_price}</span></h1>
                        <h1>Shipped to: <span className="order-details" >{order.full_name}, {order.street_address}, {order.city}, {order.zip_code}</span></h1>
                    </div>
                    <div className="item-container">
                        {order.items.map(item => (
                            <div key={item.id} className="item">
                                <img src={item.image} alt={item.name} onClick={(() => handleImageClick(item.product_id))}/>
                                <h3 className="year-model-name">{item.year} {item.name}{item.model}</h3>
                                <h3>Price: ${item.price}</h3>
                                <h3>Qty: {item.quantity}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Order;
