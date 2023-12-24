import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { oneProductThunk } from "../../redux/product"


const OneProduct = () => { 
   const dispatch = useDispatch()
   const {id} = useParams()
   const product = useSelector(state => state.products[id])
   console.log('in componennttttt',product)
   console.log(id)

   useEffect(() => { 
    dispatch(oneProductThunk(id))
   },[dispatch,id])

    return product && (

<>
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


</>



    )
}



export default OneProduct