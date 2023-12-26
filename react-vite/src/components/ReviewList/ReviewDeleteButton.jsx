import { useDispatch } from "react-redux"
import { deleteReviewThunk } from "../../redux/review"
import { useModal } from "../../context/Modal"




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

<>
    <h1>Are you sure you want to delete your review?</h1>
    <button onClick={yesButton}>Yes</button>
    <button onClick={noButton}>No</button>


</>
)

}


export default ReviewDeleteButton