import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { newReviewThunk } from "../../redux/review"
import { useModal } from "../../context/Modal"


const CreateReview = ({productId}) => { 

const [text,setText] = useState("")
const dispatch = useDispatch()
const [hoverRating, setHoverRating] = useState(0);
const [currentRating, setCurrentRating] = useState(0);
const {closeModal} = useModal()



const isButtonDisabled = text.length < 10 || currentRating < 1


const handleMouseOver = (ratingValue) => {
    setHoverRating(ratingValue);
};

const handleMouseLeave = () => {
    setHoverRating(0);
};

const handleClick = (ratingValue) => {
    setCurrentRating(ratingValue);

};
function Star({ filled, onMouseOver, onMouseLeave, onClick }) {
    return (
      <span
        className={`star ${filled ? 'filled' : ''}`}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {filled ? '★' : '☆'}
      </span>
    );
  }


const submitYourReview = async (e) => { 
    e.preventDefault()


    const reviewData = { 
        text_body: text,
        star_rating: currentRating,
    }

    await dispatch(newReviewThunk(reviewData,productId))

    closeModal()

}

    
  return (
    <div>
      <h1>How was your Car?</h1>
      {/* {error && <p className='post-error'>{error}</p>} */}
      <textarea cols="55" rows="15" placeholder="Leave your review here..." value={text} onChange={e => setText(e.target.value)}></textarea>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            filled={star <= (hoverRating || currentRating)}
            onMouseOver={() => handleMouseOver(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(star)}
          />
        ))}
        <span className="rating-label">{"  "}Stars</span>
      </div>
      <button disabled={isButtonDisabled} onClick={submitYourReview} >Submit Your Review</button>
    </div>
  );

}




export default CreateReview