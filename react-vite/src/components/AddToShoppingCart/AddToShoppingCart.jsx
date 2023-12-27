import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteItemThunk, getCartItemsThunk } from "../../redux/shoppingCart"



const AddToShoppingCart = () => { 
    const dispatch = useDispatch()

    const products = useSelector(state => Object.values(state.shoppingCart) || {})
    console.log('product in shoppingcart ', products)

    useEffect(() => { 
        dispatch(getCartItemsThunk())
    },[dispatch])


    const handleDeleteItemButton = (productId) => { 

      dispatch(deleteItemThunk(productId))
    }


    return (


  <>    
  {products.map(product => (
    <div key={product.id}>
        <h1>{product.image}</h1>
        <h1>{product.name}</h1>
        <h1>{product.price}</h1>
        <h1>{product.quantity}</h1>
        <button onClick={(() => handleDeleteItemButton(product.id))}>Delete</button>
    </div>
  ))}
  <h1>this is shoppingcart yeeee</h1>
  </>

    )
} 



export default AddToShoppingCart