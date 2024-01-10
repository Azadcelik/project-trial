import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductThunk } from "../../redux/product"
import { useNavigate } from "react-router-dom"




const MyProduct = () => { 

const navigate = useNavigate()
const dispatch = useDispatch()
const productAll = useSelector(state => state.products)
const products = Object.values(productAll)
const user = useSelector(state => state.session.user)

useEffect(() => {

    dispatch(getProductThunk)

},[dispatch])


const handleSingleImage = (productId) => {

    navigate(`/product/${productId}`)
}

    return (

    <>

    <h1 className="favorites-title">My Cars Page</h1>
    <div className="favorite-cars-container">

    {products.filter(product => (
        user.id == product.user_id
    )).map(product => (
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




export default MyProduct