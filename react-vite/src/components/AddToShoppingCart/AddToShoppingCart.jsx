import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteItemThunk, getCartItemsThunk } from "../../redux/shoppingCart"
import { useState } from "react"
import './AddToShoppingCart.css'

const AddToShoppingCart = () => { 
    const dispatch = useDispatch()
    const [display,setDisplay] = useState(false)

    const products = useSelector(state => Object.values(state.shoppingCart) || {})

    useEffect(() => { 
        dispatch(getCartItemsThunk())
    },[dispatch])


    const handleDeleteItemButton = (productId) => { 

      dispatch(deleteItemThunk(productId))
    }
    
const sideBarButton = () => { 
    setDisplay(!display)
}


    return (

<>
  <div className={display? 'sidebar open' : 'sidebar'}>    
  {products.map(product => (
    <div key={product.id} >
        <img src={product.image} className="img-shop" />
        <h1>{product.name}</h1>
        <h1>{product.price}</h1>
        <h1>{product.quantity}</h1>
        <button onClick={(() => handleDeleteItemButton(product.id))}>Delete</button>
    </div>
  ))}
 
  </div>
  <span className="toggle-arrow" onClick={sideBarButton}>
                {display ? '<' : '>'}
  </span>
</>
    )
} 



export default AddToShoppingCart