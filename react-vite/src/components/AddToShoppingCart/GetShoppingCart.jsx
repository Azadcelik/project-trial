import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteItemThunk, getCartItemsThunk } from "../../redux/shoppingCart"
import './GetShoppingCart.css'
const GetShoppingCart = () => { 
    const dispatch = useDispatch()

    const products = useSelector(state => Object.values(state.shoppingCart) || {})

    useEffect(() => { 
        dispatch(getCartItemsThunk())
    },[dispatch])


    const handleDeleteItemButton = (productId) => { 

      dispatch(deleteItemThunk(productId))
    }
    


 const totalPrice = products.reduce((acc,product) => { 
    return acc + (product.quantity * product.price)
     
 },0)



    return (
  
<div className="main-get-cart">
<h1 className="shop">Shopping Cart</h1>
  
  {products.map(product => (
     

    <div key={product.id} className="get-cart">
      <div className="get-image">
        <img src={product.image} className="cart-img" />
      </div>
        <div>
        <div className="get-name">
        <p>{product.year}</p>
        <p>{product.name}</p>
        <p>{product.model}</p>
        </div>
        <p>Price:  ${product.price}</p>
        <p>Quantit: {product.quantity}</p>
        <button className="delete-but" onClick={(() => handleDeleteItemButton(product.id))}>Delete</button>
        </div>
      
   </div>
   
   
  ))}

   <h3 className="h33">SubTotal ${totalPrice.toFixed(2)}</h3>
   <button>checkout</button>
</div>
    )
} 



export default GetShoppingCart