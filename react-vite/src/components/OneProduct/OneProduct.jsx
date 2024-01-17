import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { deleteProductThunk, oneProductThunk } from "../../redux/product"
import { useModal } from "../../context/Modal"
import CreateReview from "../CreateReview"
import ReviewList from "../ReviewList"
import { deleteProductImageThunk, getProductImageThunk } from "../../redux/productImage"
import './OneProduct.css'
import { addToCartThunk, getCartItemsThunk } from "../../redux/shoppingCart"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const OneProduct = () => { 
   const dispatch = useDispatch()
   const {id} = useParams()
   const navigate = useNavigate()


   const product = useSelector(state => state.products[id])
   const user = useSelector(state => state.session.user || {})
   const productImage = useSelector(state => state.productImage[id])

   const { setModalContent } = useModal();

const reviews = useSelector(state => Object.values(state.reviews))

   

const hasReviewed = reviews.some(review => review.user_id === user?.id && review.product_id === product?.id);

const proImg = [product?.image, ...(productImage || []).map(img => img.url)];

 const addToCartButton = async (productId,user) => { 
    if (!user.id) alert('you need to sign in add car to your shopping-cart')
  await dispatch(addToCartThunk(productId))
  dispatch(getCartItemsThunk())
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


  const filteredReview = reviews.filter(review => review.product_id == product.id)
  console.log(filteredReview,'filterswssss')
  const totalReview = filteredReview.reduce((acc,rev) => acc+rev.star_rating,0)
  const totalRate = totalReview / reviews.length
  const avgRate = Math.round(totalRate)
  console.log(totalRate)

  
  useEffect(() => {
    updateStarRating(avgRate)
  },[avgRate])

  const updateStarRating = (rating) => { 
    const allStars = document.querySelectorAll('.fa-solid.fa-star')
    console.log('ratinfg in function,',allStars)
    allStars.forEach((star,index) => { 
        if (index < rating) { 
          star.classList.add('filled')
        }
        else {
          star.classList.remove('filled')
        }
      
    })
  }

updateStarRating(avgRate)

 return product && (

  <>
    <div className="product-containers">

        <div className="for-carousel">
       <Carousel  swipeable={true}
       >
        {proImg.map(img => (
          <img src={img}  className="carosel-image" key={img.id}/> 
        ))}

       </Carousel>
       </div>
      <div className="product-detailss">
        <p> <span className="span-text">Year: </span>{product.year}</p>
        <p><span className="span-text">Make: </span> {product.make}</p>
        <p><span className="span-text">Model: </span>{product.model}</p>
        <p><span className="span-text">{product.type} &nbsp; &#183; &nbsp;</span> {product.mileage} miles</p>
        <h3>Price: ${product.price}</h3>
      </div>
       

      <div className="product-actions">
        {user && product.user_id === user.id && (
          <>
            <button onClick={handleUpdateButton} className="button update">Update</button>
            <button onClick={handleDeleteButton} className="button delete">Delete</button>
          </>
        )}
        {user && user.id !== product.user_id && (
          <button onClick={() => addToCartButton(product.id, user)} className="button add-to-cart">
            <i className="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        )}
        {user.id && !hasReviewed && user.id !== product.user_id && (
          <button onClick={handlePostReviewButton} className="button post-review">Post Your Review</button>
        )}
      </div>

    </div>
      <div className="star-rates">
        <span>
      {avgRate ? avgRate.toFixed(2) : ""}
        </span>
        {reviews.length > 0 && (
          <>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          </>
          )}
      </div>
      <div className="review-section">
    <ReviewList productId={product.id} />
    </div>

    </>
  );
}



export default OneProduct