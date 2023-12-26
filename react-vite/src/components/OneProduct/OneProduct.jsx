import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteProductThunk, oneProductThunk } from "../../redux/product"
import { useModal } from "../../context/Modal"
import CreateReview from "../CreateReview"
import ReviewList from "../ReviewList"

const OneProduct = () => { 
   const dispatch = useDispatch()
   const {id} = useParams()
   const navigate = useNavigate()
   const product = useSelector(state => state.products[id])
   const user = useSelector(state => state.session.user)
   const { setModalContent } = useModal();

const reviews = useSelector(state => Object.values(state.reviews))

console.log(reviews, 'alll revies data in create review')
   

const hasReviewed = reviews.some(review => review.user_id === user.id && review.product_id === product.id);


       
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


   
   const handlePostReviewButton = () => { 

    setModalContent( <CreateReview productId={product.id} /> )

   }

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
                {  !hasReviewed && (
              <div>
              <button onClick={handlePostReviewButton}>Post Your Review</button>
              </div>

                )}
           <div>
            <ReviewList productId={product.id} />
           </div>
</>

    )
}



export default OneProduct