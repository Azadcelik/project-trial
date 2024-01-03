
//todo: when i click to checkout i should trigger my thunk whcih fetch my backend
//todo: then i should navigate to the order history page where my orders is under order table

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getOrderThunk } from "../../redux/order"


const Order = () => { 
    const dispatch = useDispatch()

    const orders = useSelector(state => Object.values(state.order))

    useEffect(() => { 
        dispatch(getOrderThunk())
    },[dispatch])

    return (
        <>
            {orders.map(order => (
                <div key={order.order_id}> {/* Ensure each order is wrapped in a div or similar container */}
                    <h1>{order.order_date}</h1>
                    <h1>{order.total_price}</h1>
                    {order.items.map(item => (
                        <div key={item.id}> {/* Ensure each item is also wrapped in a div or similar container */}
                            <img src={item.image}/>
                            <h3>{item.name}</h3>
                            <h3>{item.price}</h3>
                            <h3>{item.quantity}</h3>
                        </div>
                    ))}
                </div>
            ))}
            <h1>Hey, this is my order history</h1>
        </>
    );
}






export default Order