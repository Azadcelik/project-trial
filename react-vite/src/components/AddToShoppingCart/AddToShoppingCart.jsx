  import { useEffect } from "react"
  import { useDispatch, useSelector } from "react-redux"
  import { deleteItemThunk, getCartItemsThunk } from "../../redux/shoppingCart"
  import { useState } from "react"
  import './AddToShoppingCart.css'

  const AddToShoppingCart = () => { 
      const dispatch = useDispatch()
      const [display,setDisplay] = useState(false)

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

   const totalPrice = products.reduce((acc,product) => { 
      return acc + (product.quantity * product.price)
       
   },0)



      return user.id && (

  <div >
    <div className={display? 'sidebar open' : 'sidebar'}>  

     <h3 className="h33">SubTotal ${totalPrice.toFixed(2)}</h3>
    
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
                  {display ? 'Cart' : 'Cart'}
    </span>
  </div>
      )
  } 



  export default AddToShoppingCart