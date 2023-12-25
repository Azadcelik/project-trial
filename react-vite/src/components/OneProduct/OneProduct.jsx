import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteProductThunk, oneProductThunk } from "../../redux/product"


const OneProduct = () => { 
   const dispatch = useDispatch()
   const {id} = useParams()
   const navigate = useNavigate()
   const product = useSelector(state => state.products[id])
   const user = useSelector(state => state.session.user)


       
        const  handleUpdateButton = () => { 
            if (user.id == product.user_id) { 
            navigate(`/product/${product.id}/update`)
         }
        }

        const handleDeleteButton = () => { 
            if (user.id == product.user_id) {
                dispatch(deleteProductThunk(product.id))

                navigate('/product')
            }
        }

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
            { user && product.user_id == user.id && (
                <>
              <button onClick={handleUpdateButton}>Update</button>
              <button onClick={handleDeleteButton}>Delete</button>
               </> 
                )}
</>

    )
}



export default OneProduct