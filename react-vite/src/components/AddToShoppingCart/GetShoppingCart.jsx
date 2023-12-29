import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteItemThunk, getCartItemsThunk } from "../../redux/shoppingCart"
import './AddToShoppingCart.css'

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

<>
   <h3 className="h33">SubTotal ${totalPrice.toFixed(2)}</h3>
  
  {products.map(product => (
     

    <div key={product.id}>
        <img src={product.image} className="img-shop" />
        <p>{product.year}</p>
        <p>{product.name}</p>
        <p>{product.model}</p>
        <p>${product.price}</p>
        <p>Quantit: {product.quantity}</p>
        <button className="delete-but" onClick={(() => handleDeleteItemButton(product.id))}>Delete</button>
    </div>
  ))}

</>
    )
} 



export default GetShoppingCart