import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductThunk } from "../../redux/product"
import "./AllProduct.css"
import { useLocation, useNavigate } from "react-router-dom"
import { addToFavoriteThunk, deleteFavoriteThunk, getFavoriteThunk } from "../../redux/favorite"
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addToCartThunk, getCartItemsThunk } from "../../redux/shoppingCart"


const AllProduct = () =>  { 

const dispatch = useDispatch()
const navigate = useNavigate()
const location = useLocation()
const [likedProducts, setLikedProducts] = useState({})
const products = useSelector(state => Object.values(state.products))
const favoriteProducts = useSelector(state => Object.values(state.favorites)) // Get favorite products from Redux store
// const product = useSelector(state => state.shoppingCart || {})
const user = useSelector(state => state.session.user || {})
const [display,setDisplay] = useState(false)
const [model,setModel] = useState('')


//  console.log('product in shoppingcart ', product)
console.log('usersssssssss in compionent ', user)

useEffect(() => { 
    if (location.pathname === '/product') setModel('') 
},[location])


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
const addToCartButton = async (productId) => {
        //do not forget to add await otherwise it is buggy
        await dispatch(addToCartThunk(productId));
        dispatch(getCartItemsThunk());
   
};


useEffect(() => { 
    const handleWindowClick = () => { 
        if (display) { 
            setDisplay(!display)
        }
    }    
    document.addEventListener('click',handleWindowClick)
    return () => document.removeEventListener('click',handleWindowClick)
},[display])


const toggleHamburgerBar = (event) => { 
    event.stopPropagation()

    setDisplay(!display)

}

const handleCarModel = (selectedCar) => { 
 
    setModel(selectedCar)
}
    return (

        <div className="main-all">
    
    <div>
    <i className="fa-solid fa-bars hamburger-icon" onClick={toggleHamburgerBar}><span className="search-cars">Brands</span></i>
    { display &&   
     
    <div className="hamburger-menu">
         <div onClick={() => handleCarModel('Toyota')}>Toyota</div>
         <div onClick={() => handleCarModel('Honda')}>Honda</div>
         <div onClick={() => handleCarModel('Ford')}>Ford</div>
         <div onClick={() => handleCarModel('Mercedes')}>Mercedes</div>
    </div>
    }
    </div>
     
        <div className="main-container">
            {products.filter(product => model === '' || product.make == model)
            .map(product => (
                <div key={product.id} className="product-container">
                    <div className="image-container">
                        <img className="product-image" src={product.image} alt="" onClick={() => handleSingleProduct(product.id)} />
                        {user.id && (
                            
                            likedProducts[product.id] ?
                                <FaHeart className="heart-icon" onClick={() => toggleFavorite(product.id)} /> :
                                <FaRegHeart className="heart-icon" onClick={() => toggleFavorite(product.id)} />
                            
                        )}
                    </div>
                    <div className="make-model-year">
                        <h3>{product.year}</h3>
                        <h3>{product.make}</h3>
                        <h3>{product.model}</h3>
                    </div>
                    <div className="type">
                        <span>{product.type} &nbsp; &#183; &nbsp; {product.mileage} miles </span>
                    </div>
                    <h2 className="price"> ${product.price}</h2>
                    
                    <div>
                        { user.id != product.user_id && user.id && (
                            <button onClick={() => addToCartButton(product.id)} className="button-add-to-cart">Add to Cart</button>
                        )
                        }
                        <p><span className="bold-text">free Shipping</span> &middot; get it by Monday</p>


                    </div>
                </div>
            ))}
        </div>

    </div>
    );
};


export default AllProduct