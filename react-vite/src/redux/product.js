const GET_PRODUCT = 'products/GET_PRODUCT'
const CREATE_PRODUCT = 'products/CREATE_PRODUCT'
const GET_ONE_PRODUCT = 'products/GET_ONE_PRODUCT'

const getProduct = (product) => { 
    return { 
        type: GET_PRODUCT,
        payload: product
    }
}

const CreateProduct = (productData) => { 
    return { 
        type: CREATE_PRODUCT,
        payload: productData
    }
}


const OneProduct  = (product)  => { 
    return {
        type: GET_ONE_PRODUCT,
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



export const oneProductThunk = (productId) => async dispatch => { 
try { 

    const data = await fetch(`/api/products/${productId}`)
    console.log('data in thunkss', data)
    
    if (data.ok) { 
        const product = await data.json()
        console.log('proidiucssttssadaadsads',product)
        dispatch(OneProduct(product))
    }
    else { 
        const error = await data.json()
        console.log('errrorrrr in thunk', error)
        return error
    }

} catch(error) { 
    console.log('catch errror', error)
    return error
}

}


export const createProductThunk = (productData) => async dispatch => { 
    try {
        const response = await fetch('/api/products/new-product',{
            method: "POST",
            body: productData
        })

        if (response.ok) {
            const data = await response.json()
             dispatch(CreateProduct(data))
        }
        else { 
            const error = await response.json()
            return error
        }
    }
    catch (error) { 
        console.log('catch errror',error)
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

        case GET_ONE_PRODUCT : { 
            return {...state, [action.payload.id]: action.payload}
        }
        case CREATE_PRODUCT: { 
            const newState = {...state}
            return {
                ...newState, [action.payload.id] : action.payload
            }
        }
        default:
        return state
    }

}


export default getProductReducer