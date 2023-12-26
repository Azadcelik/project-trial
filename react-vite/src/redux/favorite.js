const ADD_TO_FAVORITE = 'favorites/ADD_TO_FAVORITE'
const GET_FAVORITES =  'favorites/GET_FAVORITES'
const DELETE_FAVORITES = 'favorites/DELETE_FAVORITES'

const addFavorite = (product) =>  { 
    return { 
        type: ADD_TO_FAVORITE,
        payload: product
    }
}

const getFavorite = (fav) => { 
    return { 
        type: GET_FAVORITES,
        payload: fav
    }
}

const deleteFavorite = (productId) => { 
    return {
        type: DELETE_FAVORITES,
        payload: productId
    }
}


export const getFavoriteThunk = () => async dispatch => { 

    try {
        const response = await fetch('/api/products/favorites')

        if  (response.ok) {
        const data = await response.json()
        dispatch(getFavorite(data))
        console.log('this is data frtom fa',data)
    }
    else { 
        const error = response.json()
        return error
    }
    } catch(error) { 
        console.log('this is catch errorr',error)
        return error
    }
}




export const addToFavoriteThunk = (productId) => async dispatch => { 
try { 


    const response = await fetch(`/api/products/${productId}/add-favorite`, {
        method: "POST"
    })

    if (response.ok) { 
        const product = await response.json()
        dispatch(addFavorite(product))
    }
    else {
        const error = await response.json()
        return error
    }

} catch(error) { 
    return error
}

}


export const deleteFavoriteThunk = (productId) => async dispatch => { 
    try { 
        const response = await fetch(`/api/products/${productId}/remove-favorite`, {
            method: "DELETE"
        })
        if (response.ok) { 
     
            const data = response.json()
            console.log('data in delete thunk', data)
            dispatch(deleteFavorite(productId))
    }

     else { 
        const error = await response.json()
        console.log(error)
        return error
     }
    } catch (error) {
        console.log('error in delete catch', error)
        return error
    }
}



const favoriteReducer = (state = {}, action) => {
    console.log('Previous state:', state); // Log previous state
    switch (action.type) {
        case GET_FAVORITES: { 
                const newState = {...state}
                action.payload.forEach(fav => {
                    newState[fav.id] = fav
                });
               return newState
            }

        case ADD_TO_FAVORITE: {
           const newState = {...state}
            return {...newState, [action.payload.id]: action.payload}
        }
        
            case DELETE_FAVORITES: {
                const newStateDelete = {...state}
                delete newStateDelete[action.payload]
                return newStateDelete
            }

        default:
            return state;
    }
};
export default favoriteReducer


