import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteFavoriteThunk, getFavoriteThunk } from "../../redux/favorite"
import './GetFavorite.css'
import { useNavigate } from "react-router-dom"
import { addToCartThunk, getCartItemsThunk } from "../../redux/shoppingCart"
import { FaTimes } from "react-icons/fa"




const GetFavorite = () => { 
const dispatch = useDispatch()
const navigate = useNavigate()

const user = useSelector(state => state.session.user)
const favs = useSelector(state => Object.values(state.favorites))
console.log(user,favs)


const addToCartButton = async (productId) => {
    //do not forget to add await otherwise it is buggy
    await dispatch(addToCartThunk(productId));
    dispatch(getCartItemsThunk());

};

    useEffect(() => { 
        dispatch(getFavoriteThunk())
    },[dispatch])

    const handleSingleImage = (productId) => { 
        navigate(`/product/${productId}`)
    }

    const handleDeleteFav = async (productId) => { 

        await dispatch(deleteFavoriteThunk(productId))
    }

return (

<>
        <h1 className="favorites-title">Favorited Cars</h1>
    <div className="favorite-cars-container">
        
        {favs.map(product => (
            <div key={product.id} className="favorite-car-card">
                <img src={product.image} onClick={() => handleSingleImage(product.id)}/>
                <FaTimes  className="x-icon" onClick={(() => handleDeleteFav(product.id))}/>
                <div className="make-model-year">
                    <h3>{product.year}</h3>
                    <h3>{product.make}</h3>
                    <h3>{product.model}</h3>
                </div>

                <div className="type">
                    <span>{product.type} &nbsp; &#183; &nbsp; {product.mileage} miles </span>
                </div>
                <h2 className="price">$ {product.price}</h2>
                { user.id != product.user_id && user.id && (
                            <button onClick={() => addToCartButton(product.id)} className="button-add-to-cart">Add to Cart</button>
                        )
                        }
            </div>
            
        ))}
    </div>
</>

)
    
}



export default GetFavorite