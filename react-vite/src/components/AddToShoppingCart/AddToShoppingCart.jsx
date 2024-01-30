  import { useEffect } from "react"
  import { useDispatch, useSelector } from "react-redux"
  import { deleteItemThunk, getCartItemsThunk } from "../../redux/shoppingCart"
  import { useState } from "react"
  import './AddToShoppingCart.css'
import { useNavigate } from "react-router-dom"

  const AddToShoppingCart = () => { 
      const dispatch = useDispatch()
      const [display,setDisplay] = useState(false)
      const navigate = useNavigate()

      const products = useSelector(state => Object.values(state.shoppingCart) || {})
      const user = useSelector(state => state.session.user || {})

      useEffect(() => { 
          dispatch(getCartItemsThunk())
      },[dispatch])


      const handleDeleteItemButton = (productId) => { 

        dispatch(deleteItemThunk(productId))
      }
      
  const sideBarButton = () => { 
      setDisplay(!display)
  }

  const totalPrice = products.reduce((acc, product) => {
    if (typeof product.price === 'number' && typeof product.quantity === 'number') {
      return acc + (product.quantity * product.price);
    }
    return acc;
  }, 0) 
  

   

   const handleCheckoutButton = async () => { 

    navigate('/adress')
   }

      return user.id && (

  <div >
    <div className={display || products.length > 0 ? 'sidebar open' : 'sidebar'}>  

<div className="proceed-checkout">
   

   
  {<h3 className="h33">SubTotal: ${totalPrice.toFixed(2)}</h3>}
 
<button onClick={handleCheckoutButton} className="proced-button">Proceed to Checkout</button>
</div>
    {products.map(product => (
       

      <div key={product.id} className="top" >
          <div className="img-wrapper">
            <img src={product.image} alt="Product" className="img-shop" />
        </div>

          <div className="car-item">
          <p>{product.year}</p>
          <p>{product.name}</p>
          <p>{product.model}</p>
          </div>
          <div className="price-quantity">
          <p>${product.price}</p>
          <p>Quantit: {product.quantity}</p>
          </div>
          <button className="delete-but" onClick={(() => handleDeleteItemButton(product.id))}>Delete</button>
      </div>
    ))}
  
    </div>
    <span className="toggle-arrow" onClick={sideBarButton}>
                  {display ? '' : ''}
    </span>
  </div>
      )
  } 



  export default AddToShoppingCart