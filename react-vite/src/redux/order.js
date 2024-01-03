const ADD_ORDER = '/api/order/ADD_ORDER'
const GET_ORDER = '/api/order/GET_ORDER'

const addOrder = (data) => { 
    return {
        type: ADD_ORDER,
        payload: data
    }
}

const getOrder = (data) => { 
    return { 
        type: GET_ORDER,
        payload: data
    }
}



export const getOrderThunk = () => async dispatch => { 
    try { 
        const response = await fetch('api/order')
        if (response.ok){ 
            const data =  await response.json()
            dispatch(getOrder(data))
            console.log('data in get orerr ', data)

        }
        else {
            const error = await response.json()
            return error
        }
    } catch(error) {
        console.log('erorr in get order catch',error)
        return error
    }
} 



export const addOrderThunk = () => async dispatch => { 
    try { 
        const response = await fetch('api/order', {
            method: "POST"
        })
        if (response.ok) { 
            const data = await response.json()
            dispatch(addOrder(data))
        }
        else { 
            const error = await response.json()
            return error
        }
    } catch(error) {
        console.log('erorr in add order catch',error)

        return error
    }
}

const orderReducer = (state={},action) => {
    switch(action.type) {

        case GET_ORDER: {
            const newState = {}
            action.payload.forEach(order => {
                newState[order.order_id] = order
            });
            return newState
        }

        default: 
        return state
    }
}


export default orderReducer