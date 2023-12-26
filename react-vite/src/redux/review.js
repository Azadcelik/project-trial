const NEW_REVIEW = '/review/NEW_REVIEW'
const GET_REVIEW = '/review/GET_REVIEW'


const newReview = (data) => { 
    return { 
        type: NEW_REVIEW,
        payload: data
    }

}

const getReview = (data) => { 
    return { 
        type: GET_REVIEW,
        payload: data
    }
}



export const newReviewThunk = (reviewData,productId) => async (dispatch) =>  { 

    console.log('ptoreudc id in thunk',productId,reviewData)
try {
    const response = await fetch(`/api/products/${productId}/new-review`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    });

    if (response.ok) {
        const data =  await response.json()
        console.log('data in thiunk  sdsdsa', data)
        dispatch(newReview(data))
    }

    else { 
        const error = await response.json()
        console.log('error in respibnse', error)
        return error
    }
}
    catch(error) { 
        console.log('error in catch', error)
        return error
    }
}


export const   getReviewThunk = (productId) => async dispatch => { 
    try { 
        const response = await fetch(`/api/products/${productId}/get-reviews`)

        if (response.ok) { 
            const data = await response.json()
            dispatch(getReview(data))
            console.log('data in getreviasd', data)

        }
        else { 
            const error = await response.error()
            return error
        }
    }
    catch(error) {
        console.log('catch error',error)
        return error
    }
}



const newReviewReducer = (state={},action) => { 


    switch(action.type) { 
        case GET_REVIEW :  {
            const newState = {}
            action.payload.forEach(review => { 
                newState[review.id] = review
            })
            console.log('new state in reducer',newState)
            return newState
        }
        case NEW_REVIEW: { 
        const newState = {...state}
        return {...newState, [action.payload.id]: action.payload}
    }
    default: 
    return state
}
}


export default newReviewReducer