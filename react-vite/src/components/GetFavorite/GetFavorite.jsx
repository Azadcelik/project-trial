import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFavoriteThunk } from "../../redux/favorite"
import './GetFavorite.css'
import { useNavigate } from "react-router-dom"





const GetFavorite = () => { 
const dispatch = useDispatch()
const navigate = useNavigate()

const user = useSelector(state => state.session.user)
const favs = useSelector(state => Object.values(state.favorites))
console.log(user,favs)


    useEffect(() => { 
        dispatch(getFavoriteThunk())
    },[dispatch])

    const handleSingleImage = (productId) => { 
        navigate(`/product/${productId}`)
    }

return (

<>
        <h1 className="favorites-title">Favorited Cars</h1>
    <div className="favorite-cars-container">
        
        {favs.map(product => (
            <div key={product.id} className="favorite-car-card">
                <img src={product.image} onClick={() => handleSingleImage(product.id)}/>
                <div className="make-model-year">
                    <h3>{product.year}</h3>
                    <h3>{product.make}</h3>
                    <h3>{product.model}</h3>
                </div>

                <div className="type">
                    <span>{product.type} &nbsp; &#183; &nbsp; {product.mileage} miles </span>
                </div>
                <h2 className="price">$ {product.price}</h2>
            </div>
        ))}
    </div>
</>

)
    
}



export default GetFavorite