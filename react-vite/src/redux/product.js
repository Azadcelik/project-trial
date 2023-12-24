const GET_PRODUCT = 'products/GET_PRODUCT'

const getProduct = (product) => { 
    return { 
        type: GET_PRODUCT,
        payload: product
    }
}


 export const getProductThunk = () => async dispatch => { 
    try {
        const data =  await fetch('/api/products')
        if (data.ok) {
            const product = await data.json()
            console.log('produict in thunk ss',product)
           await dispatch(getProduct(product))
        }
        else {
            const error = await data.json()
            return error

        }
    }
    catch (error) {
        return error
    }
}


const getProductReducer = (state={},action) =>  {
    switch(action.type) {
        case GET_PRODUCT : {
            const newState = {}
            action.payload.forEach(product => {
              newState[product.id]= product
            });
            console.log('new state in reducer',newState)
            return newState
        }
        default:
        return state
    }

}


export default getProductReducer