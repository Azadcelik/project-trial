import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProductThunk } from "../../redux/product"
import { useNavigate, useParams } from "react-router-dom"
import "./UpdateProduct.css"
import { makeModelMap } from "../CreateProduct/CreateProduct"




const UpdateProduct = () => {
    




    const [imageChange,setImageChange] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    
    const product = useSelector(state => state.products[id] || {})
    console.log('in  componenntss', product)


    useEffect(() => {
        //initial preview to the existing product image
        if (product.image) {
            setImagePreview(product.image);
        }
    }, [product]);


    const [availableModel,setAvailableModel] = useState([])
    const [imagePreview,setImagePreview] = useState(null)
    const [image,setImage] = useState(product?.image)
    const [mileage,setMileage] = useState(product?.mileage)
    const [make,setMake] = useState(product?.make)
    const [model,setModel] = useState(product?.model)
    const [year,setYear] = useState(product?.year)
    const [price,setPrice] = useState(product?.price)
    const [type,setType] = useState(product?.type)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})


    const handleBothImage = (event,setImage,setImagePreview) => { 
        const file = event.target.files[0]
        setImage(file)
        setImageChange(true)

        const previewImage = URL.createObjectURL(file)
        setImagePreview(previewImage)
    }

 
  useEffect(() => {
    if (make) { 
        setAvailableModel(makeModelMap[make]);
        // Only reset the model if it's not in the available models for the selected make
        if (!makeModelMap[make].includes(model)) {
            setModel('');
        }
    } else { 
        setAvailableModel([]);
        setModel('');
    }
}, [make, model]);

    


 
    useEffect(() => { 
        const error = {}
        if (!make) error.make = 'Please select a car make.'
        if (!model) error.model = 'Please select a car model.'
        if (!year) error.year = 'Please select the year of the car.'
        if (!mileage) error.mileage = 'Please enter the car\'s mileage.'
        if (!type) error.type = 'Please select the fuel type.'
        if (!price) error.price = 'Please enter the price of the car.'
        if (!image) error.image = 'Please upload a main image of the car.'

        setValidationErrors(error)
    },[make,mileage,model,year,price,type,image])

    const handleSubmit = async (e) => { 
        e.preventDefault()

        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }
        const formData = new FormData()
        if (imageChange) { 
            formData.append("image",image)
        }
        formData.append("mileage",mileage)
        formData.append("make",make)
        formData.append("model",model)
        formData.append("year",year)
        formData.append("price",price)
        formData.append("type",type)
        await dispatch(updateProductThunk(formData,id))

        setHasSubmitted(false)
        navigate(`/product/${id}`)
    }



    return (
      
<div>
    <div className="sell-your-car-heading">SELL YOUR CAR</div>  
    
     <form onSubmit={handleSubmit} encType="multipart/form-data" action="/product">
    
    <div className="main-create">

        <label>
    Make
    {hasSubmitted && validationErrors.make && (
        <span className="error">{validationErrors.make}</span>
    )}
    <select value={make} onChange={(e) => setMake(e.target.value)}>
        <option value="">Select Make</option>
        {Object.keys(makeModelMap).map(key => (
          <option key={key} value={key}>{key}</option>
        ))}
    </select>
</label>
        
 
     <label>
    Model
    {hasSubmitted && validationErrors.model && (
        <span className="error">{validationErrors.model}</span>
    )}
    <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="">Select Model</option>
            {availableModel.map(model => (
             <option key={model} value={model}>{model}</option>
             ))}
    </select>
</label>
  
       <label>
    Year
         
    {hasSubmitted && validationErrors.year && (
        <span className="error">{validationErrors.year}</span>
    )}
    <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Select Year</option>
        {
            Array.from(new Array(20), (val, index) => new Date().getFullYear() - index).map(year => (
                <option key={year} value={year}>{year}</option>
            ))
        }
    </select>
</label>

       
   
        <label>
            Miles
            {hasSubmitted && validationErrors.mileage && (
        <span className="error">{validationErrors.mileage}</span>
    )}
            <input type="text" 
            value={mileage}
            onChange={(e => setMileage(e.target.value))}
            />
        </label>

   
      <label>
    Fuel Type
    {hasSubmitted && validationErrors.type && (
        <span className="error">{validationErrors.type}</span>
    )}
    <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Select Fuel Type</option>
        <option value="Electric">Electric</option>
        <option value="Hybrid">Hybrid</option>
        <option value="Gasoline">Gasoline</option>
    </select>
</label>

  
        <label>
            Price
            {hasSubmitted && validationErrors.price && (
        <span className="error">{validationErrors.price}</span>
    )}
            <input type="text" 
            value={price}
            onChange={(e => setPrice(e.target.value))}
            />
        </label>
       
   
            {hasSubmitted && validationErrors.image && (
        <span className="error">{validationErrors.image}</span>
    )}
        <label>
            Image
        <input type="file"
        accept="image/*"
        onChange={(e => handleBothImage(e,setImage,setImagePreview))}
        />
    {imagePreview && (
         <img src={imagePreview} alt="Preview 1" className="image1"/>
        )}
        
        </label>
        <div className="button-container">
                <button>Submit</button>
        </div> 
    </div>

     </form>
     </div>
    )
}




export default UpdateProduct