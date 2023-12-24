import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductThunk } from "../../redux/product"




const ProductFrom = () =>  { 

const dispatch = useDispatch()

const products = useSelector(state => Object.values(state.products))

console.log('products in compionent ', products)

useEffect(() => { 
    dispatch(getProductThunk())
},[dispatch])

    return (

    <>
        {products.map(product => (
        <div key={product.id}> 
            <img src={product.image} alt="" />
            <h1>{product.make}</h1>
            <h1>{product.model}</h1>
            <h1>{product.year}</h1>
            <h1>{product.type}</h1>
            <h1>{product.price}</h1>
            <h1>{product.created_at}</h1>
        </div>
         ))}
    </>
    )
}



export default ProductFrom