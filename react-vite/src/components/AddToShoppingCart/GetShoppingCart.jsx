import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteItemThunk, getCartItemsThunk } from "../../redux/shoppingCart"
import './GetShoppingCart.css'
import { useNavigate } from "react-router-dom"

const GetShoppingCart = () => { 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products = useSelector(state => Object.values(state.shoppingCart) || {})

    console.log('products in shopping cart foir debugging',products)

    useEffect(() => { 
        dispatch(getCartItemsThunk())
    },[dispatch])


    const handleDeleteItemButton = (productId) => { 

      dispatch(deleteItemThunk(productId))
    }
    


 const totalPrice = products.reduce((acc,product) => { 
    return acc + (product.quantity * product.price)
     
 },0)


 const handleCheckoutButton = async () => { 

  navigate('/adress')
 }

 const handleSingleProduct = (productId) => { 
  navigate(`/product/${productId}`)
  // {<OneProduct productId={productId}/>}

}


return (

  <div className='toppest-main'>
  
<div className="main-get-cart">
<h1 className="shop">Shopping Cart</h1>
  
  {products.map(product => (
     
     
    <div key={product.id} className="get-cart">
      {console.log('product id which shoulkd be 25',product.id)}
      <div className="get-image">
        <img src={product.image} className="cart-img" onClick={() => handleSingleProduct(product.product_id)}/>
      </div>
        <div>
        <div className="get-name">
        <p> <span className="span-text">Year: </span>{product.year}</p>
        <p><span className="span-text">Make: </span> {product.name}</p>
        <p><span className="span-text">Model: </span>{product.model}</p>
        </div>
        <p><span className="span-text">Price: </span> ${product.price}</p>
        <p><span className="span-text">Quantity: </span>{product.quantity}</p>
        <button className="delete-buttonn" onClick={(() => handleDeleteItemButton(product.id))}>Delete</button>
        </div>
      
   </div>
   
   
  ))}
</div>

           {products.length > 0 && (
<div className="checkout-section">

            <h3 className="h33">SubTotal: ${totalPrice.toFixed(2)}</h3>
            <button onClick={handleCheckoutButton}>Proceed to Checkout</button>
</div>
           )}
</div>
    )
} 



export default GetShoppingCart