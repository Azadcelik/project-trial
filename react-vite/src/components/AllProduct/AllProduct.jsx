import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductThunk } from "../../redux/product"
import "./AllProduct.css"
import { useNavigate } from "react-router-dom"



const AllProduct = () =>  { 

const dispatch = useDispatch()
const navigate = useNavigate()

const products = useSelector(state => Object.values(state.products))

console.log('products in compionent ', products)

useEffect(() => { 
    dispatch(getProductThunk())
},[dispatch])



const handleSingleProduct = (productId) => { 
    navigate(`/product/${productId}`)
    // {<OneProduct productId={productId}/>}

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
        </div>
         ))}
    </div>
    )
}



export default AllProduct