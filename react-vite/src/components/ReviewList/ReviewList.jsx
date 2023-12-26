import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getReviewThunk } from "../../redux/review"



const ReviewList = ({productId}) => { 

const dispatch = useDispatch()
const review = useSelector(state => Object.values(state.reviews))
console.log('reviews in reviewlist ', review)

    useEffect(() => {

        dispatch(getReviewThunk(productId))
    },[dispatch.productId])


    return (


        <>  
        {review
        .sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
        .map(rev => (
            <div key={rev.id} className="revieww">
            <h2 className="review-namee">{rev.user.username}</h2>
            <h2 className="date-review">
              {new Date(rev.created_at).toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <h2>{rev.text_body}</h2>
            </div>
        ))}
     
        </>
    )
}




export default ReviewList