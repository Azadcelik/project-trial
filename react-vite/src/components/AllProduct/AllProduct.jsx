import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductThunk } from "../../redux/product"
import "./AllProduct.css"
import { useNavigate } from "react-router-dom"
import { addToFavoriteThunk, deleteFavoriteThunk, getFavoriteThunk } from "../../redux/favorite"
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addToCartThunk } from "../../redux/shoppingCart"



const AllProduct = () =>  { 

const dispatch = useDispatch()
const navigate = useNavigate()
const [likedProducts, setLikedProducts] = useState({})
const products = useSelector(state => Object.values(state.products))
const favoriteProducts = useSelector(state => Object.values(state.favorites)) // Get favorite products from Redux store
const product = useSelector(state => state.shoppingCart || {})
    console.log('product in shoppingcart ', product)
console.log('products in compionent ', products)

useEffect(() => { 
    console.log("Dispatching getProductThunk and getFavoriteThunk");
    dispatch(getProductThunk())
    dispatch(getFavoriteThunk()) // Dispatch action to fetch favorite products

},[dispatch])


useEffect(() => {
    console.log("Updating likedProducts state", favoriteProducts);
    
    const newLiked = favoriteProducts.reduce((acc, product) => {
        acc[product.id] = true;
        return acc;
    }, {});

    if (Object.keys(newLiked).length !== Object.keys(likedProducts).length) {
        setLikedProducts(newLiked);
    }
}, [favoriteProducts,likedProducts]);



const handleSingleProduct = (productId) => { 
    navigate(`/product/${productId}`)
    // {<OneProduct productId={productId}/>}

}


const toggleFavorite = (productId) => { 
    if (likedProducts[productId]) {
        dispatch(deleteFavoriteThunk(productId))
    } else {
        dispatch(addToFavoriteThunk(productId))
    }
    setLikedProducts(prev => ({ ...prev, [productId]: !prev[productId] }))
}

const addToCartButton = (productId)  => { 

      dispatch(addToCartThunk(productId))
}


    return (

    <div className="main-container">
        {products.map(product => (
        <div key={product.id}> 
             {console.log(product)}
            <img src={product.image} alt="" onClick={() => handleSingleProduct(product.id)}/>
            <div className="make-model-year">
                <h3>{product.year}</h3>
                <h3>{product.make}</h3>
                <h3>{product.model}</h3>
            </div>

            <div className="type">
                <span>{product.type} &nbsp; &#183; &nbsp; {product.mileage} </span>
                <span></span>
            </div>
            <h2 className="price">$ {product.price}</h2>
            {likedProducts[product.id] ? 
                        <FaHeart onClick={() => toggleFavorite(product.id)} /> : 
                        <FaRegHeart onClick={() => toggleFavorite(product.id)} />
                    }
        <div>
         <button onClick={(() => addToCartButton(product.id))}>Add to Cart</button>
         </div>
        </div>
         ))}
    </div>
    
    )
}



export default AllProduct