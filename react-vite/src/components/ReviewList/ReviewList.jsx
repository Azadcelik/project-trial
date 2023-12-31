import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getReviewThunk } from "../../redux/review"
import { useModal } from "../../context/Modal"
import ReviewDeleteButton from "./ReviewDeleteButton"
import './ReviewList.css'


const ReviewList = ({productId}) => { 

const { setModalContent } = useModal()


const dispatch = useDispatch()
const review = useSelector(state => Object.values(state.reviews))
const currentUser  = useSelector(state => state.session.user || {})


// const total = review.reduce((acc,rev) => acc + rev.star_rating,0)
// const totalRate = total/ review.length 


console.log('reviews in reviewlis', review)

    useEffect(() => {

        dispatch(getReviewThunk(productId))
    },[dispatch,productId])


     const handleDeleteButton = (reviewId) => { 
        setModalContent(<ReviewDeleteButton  reviewId={reviewId}/>)
    }


    return (


        <>  
        {review
        .sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
        .map(rev => (
            <div key={rev.id} className="revieww">
            <h2 className="review-namee">{rev.user?.username}</h2>
            <h2 className="date-review">
              {new Date(rev.created_at).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <h4>{rev.text_body}</h4>
            {/* <h4>{totalRate.toFixed(2)}</h4> */}

            { rev.user_id == currentUser.id && (
              
               <button onClick={() => handleDeleteButton(rev.id)}>Delete</button>
            )}
            </div>
        ))}
        </>
    )
}




export default ReviewList