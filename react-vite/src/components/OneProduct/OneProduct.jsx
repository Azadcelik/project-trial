import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteProductThunk, oneProductThunk } from "../../redux/product"
import { useModal } from "../../context/Modal"
import CreateReview from "../CreateReview"
import ReviewList from "../ReviewList"
import { deleteProductImageThunk, getProductImageThunk } from "../../redux/productImage"
import './OneProduct.css'

const OneProduct = () => { 
   const dispatch = useDispatch()
   const {id} = useParams()
   const navigate = useNavigate()
   const [track,setTrack] = useState(0)


   const product = useSelector(state => state.products[id])
   const user = useSelector(state => state.session.user || {})
   const productImage = useSelector(state => state.productImage[id])

   const { setModalContent } = useModal();

const reviews = useSelector(state => Object.values(state.reviews))

console.log(reviews, 'alll revies data in create review')
   

const hasReviewed = reviews.some(review => review.user_id === user?.id && review.product_id === product?.id);

const proImg = [product?.image, ...(productImage || []).map(img => img.url)];




const nextButton = () => { 
    setTrack((track + 1) % proImg.length)
}
const previousButton = () => { 
    if (track === 0) setTrack(proImg.length - 1)
    else setTrack(track - 1)
}
       
        const  handleUpdateButton = () => { 
            if (user.id == product.user_id) { 
            navigate(`/product/${product.id}/update`)
         }
        }

        const handleDeleteButton = () => { 
            if (user.id == product.user_id) {
                dispatch(deleteProductThunk(product.id))
                dispatch(deleteProductImageThunk(product.id))
                navigate('/product')
            }
        }

   useEffect(() => { 
    dispatch(oneProductThunk(id))
    dispatch(getProductImageThunk(id))
   },[dispatch,id])


   
   const handlePostReviewButton = () => { 

    setModalContent( <CreateReview productId={product.id} /> )

   }

    return product && (
        <>

<div className="top-one">
                <i className="fa-solid fa-arrow-left" onClick={previousButton}></i>
               <img src={proImg[track]} alt="Product" />
               <i className="fa-solid fa-arrow-right" onClick={nextButton}></i>
            
            <div className="make-model-years">
                <h3>{product.year}</h3>
                <h3>{product.make}</h3>
                <h3>{product.model}</h3>
            </div>

            <div className="type">
                <span>{product.type} &nbsp; &#183; &nbsp; {product.mileage} miles</span>
                <span></span>
            </div>
            <h2 className="price">$ {product.price}</h2>
            { user && product.user_id == user.id && (
                <>
              <button onClick={handleUpdateButton}>Update</button>
              <button onClick={handleDeleteButton}>Delete</button>
               </> 
                )}
                {  user.id && !hasReviewed &&  user.id != product.user_id && (
            
              <div>
              <button onClick={handlePostReviewButton}>Post Your Review</button>
              </div>

                )}
           
</div>
            <div>
            <ReviewList productId={product.id} />
           </div>
</>
    )
}



export default OneProduct