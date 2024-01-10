import { useDispatch } from "react-redux"
import { deleteReviewThunk } from "../../redux/review"
import { useModal } from "../../context/Modal"
import './ReviewList.css'



const ReviewDeleteButton = ({reviewId}) => { 

    const dispatch = useDispatch()
    const {closeModal} = useModal()


const yesButton  = () => {
    dispatch(deleteReviewThunk(reviewId))
    closeModal()
}

const noButton = () => { 
    closeModal()
}

return (
    <div className="review-delete-modal">
        <h1>Are you sure you want to delete your review?</h1>
        <button className="yes-button" onClick={yesButton}>Yes</button>
        <button className="no-button" onClick={noButton}>No</button>
    </div>
);
}


export default ReviewDeleteButton