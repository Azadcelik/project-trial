import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFavoriteThunk } from "../../redux/favorite"






const GetFavorite = () => { 
const dispatch = useDispatch()

const user = useSelector(state => state.session.user)
const favs = useSelector(state => Object.values(state.favorites))
console.log(user,favs)


    useEffect(() => { 
        dispatch(getFavoriteThunk())
    },[dispatch])

return (


    <>
    
        {favs.map(product => (
         <div key={product.id}>
            <img src={product.image} />
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
        </div>
            ))}
    <h1>hey how are you doing</h1>

    </>
)
    
}



export default GetFavorite