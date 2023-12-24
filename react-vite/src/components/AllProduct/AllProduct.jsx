import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductThunk } from "../../redux/product"
import "./AllProduct.css"



const AllProduct = () =>  { 

const dispatch = useDispatch()

const products = useSelector(state => Object.values(state.products))

console.log('products in compionent ', products)

useEffect(() => { 
    dispatch(getProductThunk())
},[dispatch])

    return (

    <div className="main-container">
        {products.map(product => (
        <div key={product.id}> 
            <img src={product.image} alt="" />
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