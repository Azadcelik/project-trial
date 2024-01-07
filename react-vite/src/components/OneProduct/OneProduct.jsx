import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteProductThunk, oneProductThunk } from "../../redux/product"
import { useModal } from "../../context/Modal"
import CreateReview from "../CreateReview"
import ReviewList from "../ReviewList"
import { deleteProductImageThunk, getProductImageThunk } from "../../redux/productImage"
import './OneProduct.css'
import { addToCartThunk, getCartItemsThunk } from "../../redux/shoppingCart"

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

console.log(product, 'alll revies data in create review')
   

const hasReviewed = reviews.some(review => review.user_id === user?.id && review.product_id === product?.id);

const proImg = [product?.image, ...(productImage || []).map(img => img.url)];

 const addToCartButton = async (productId,user) => { 
    if (!user.id) alert('you need to sign in add car to your shopping-cart')
  await dispatch(addToCartThunk(productId))
  dispatch(getCartItemsThunk())
 }


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

        <div className="top-top">
        <div>

<div className="top-one">

    <div className="flexo">

     <div>
                <i className="fa-solid fa-arrow-left" onClick={previousButton}></i>
               <img src={proImg[track]} alt="Product" />
               <i className="fa-solid fa-arrow-right" onClick={nextButton}></i>
    </div> 

    <div className="toyotaa">
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
              <button onClick={handleUpdateButton} className="buttono">Update</button>
              <button onClick={handleDeleteButton} className="buttono">Delete</button>
               </> 
                )}
               { user && user.id != product.user_id && (
               <button className="add-to-cart-button" onClick={(() => addToCartButton(product.id,user))}>
                    <i className="fa-solid fa-cart-plus"></i> {/* Example icon, replace with your desired icon */}
                    Add to Cart
                </button>
                )}
    </div>
    </div>
                {  user.id && !hasReviewed &&  user.id != product.user_id && (
            
              <button onClick={handlePostReviewButton} className="review-post">Post Your Review</button>

                )}
           
</div>
            <div>
            <ReviewList productId={product.id} />
           </div>
 
</div>

</div>
    )
}



export default OneProduct