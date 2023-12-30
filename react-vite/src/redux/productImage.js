const ADD_PRODUCT_IMAGES = 'api/product-images/ADD_PRODUCT_IMAGES'
const GET_PRODUCT_IMAGES = 'api/product-images/GET_PRODUCT_IMAGES'



const addProductImage = (productId, images) => { 
    return { 
        type: ADD_PRODUCT_IMAGES,
        payload: { productId, images }
    }
}

const getProductImage = (productId, images) => { 
    return {
        type: GET_PRODUCT_IMAGES,
        payload: { productId, images }
    }
}


export const getProductImageThunk = (productId) => async dispatch => { 
    try { 
        const response = await fetch(`/api/product-image/${productId}/images`)
        if (response.ok) { 
            const data = await response.json()
            dispatch(getProductImage(productId,data.images))
        }
        else {
            const error = await response.json()
            return error
        }
        
    }   catch(error) { 
        console.log(error)
        return error
    } 

}

export const addProductImagesThunk = (productId,formData) => async dispatch => { 
    try {
        const response = await fetch(`/api/product-image/${productId}/images`, {
            method: "POST",
            body: formData
        })
        if (response.ok) { 
            const data = await response.json()
            console.log('data in productimage thnunk', data)
            dispatch(addProductImage(productId,data.images))
        }
        else { 
            const error = await response.json()
            return error
        }

    } catch(error) { 
        console.log('catch errror in catch thunk',error)
        return error
    }
}


const addProductImageReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_PRODUCT_IMAGES:
        case ADD_PRODUCT_IMAGES:
            const { productId, images } = action.payload;
            return {
                ...state,
                [productId]: images
            };
        default:
            return state;
    }
};

export default addProductImageReducer