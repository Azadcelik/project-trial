const ADD_TO_SHOPPING_CART = 'shopping-cart/ADD_TO_SHOPPING_CART'
const GET_SHOPPING_CART_ITEMS = 'shopping-cart/GET_SHOPPING_CART_ITEMS'
const DELETE_ITEM = 'shopping=cart/DELETE_ITEM'


const addToCart = (data)  => { 
    return {
        type: ADD_TO_SHOPPING_CART,
        payload: data
    }
}

const getCartItems = (data) =>  { 
    return { 
        type: GET_SHOPPING_CART_ITEMS,
        payload: data
    }
}

const deleteItem = (productId) => { 
    return { 
        type: DELETE_ITEM,
        payload: productId
    }
}

export const getCartItemsThunk = () => async dispatch => { 
    try { 
        const response = await fetch('/api/shopping-cart/')
        if (response.ok) { 
            const data = await response.json()
            dispatch(getCartItems(data))
        }
        else {
            const error = await response.json()
            return error
        }
    }catch (error) { 
        return error
    }
}



export const addToCartThunk = (productId) => async dispatch => { 
    try {
        const response = await fetch(`/api/shopping-cart/add-to-cart/${productId}`, {
            method: ["POST"]
        
        })
        if (response.ok) { 
            const data = await response.json()
            dispatch(addToCart(data))
        }
        else {
            const error = await response.json()
            return error
        }
    }
    catch (error) {
        return error
    }
}


export const deleteItemThunk = (productId) => async dispatch =>  { 
    try { 
        const response = await fetch(`/api/shopping-cart/${productId}`, { 
            method: "DELETE"
        })
        if (response.ok) { 
            dispatch(deleteItem(productId))
        }
        else { 
            const error = await response.json()
            return error
        }

    }catch (error) { 
        return error
    }
}






const shoppingCartReducer = (state={},action) => { 
    switch(action.type) { 
        case GET_SHOPPING_CART_ITEMS :{ 
            const newState = {}
            action.payload.map(item => { 
                newState[item.id] = item
            })
            return newState
        }

        case ADD_TO_SHOPPING_CART: {
            const newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        
        case DELETE_ITEM: { 
            const newState = {...state}
            delete newState[action.payload]
            return newState
        }
        default: 
        return state
    }
}

export default shoppingCartReducer