import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createProductThunk } from "../../redux/product"
import { useNavigate } from "react-router-dom"
import "./CreateProduct.css"
import { addProductImagesThunk } from "../../redux/productImage"


export const makeModelMap = { 
    'Toyota': ['Camry','Prius','Corolla'],
    'Honda': ['Civic','Accord','CR-V'],
    'Ford': ['Mustang','F-150','Explorer'],
    'Mercedes': ['EQS','E-Class','C350e']
}


const CreateProduct = () => {
    
    const [availableModel,setAvailableModel] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [mileage,setMileage] = useState('')
    const [make,setMake] = useState('')
    const [model,setModel] = useState('')
    const [year,setYear] = useState(0)
    const [price,setPrice] = useState('')
    const [type,setType] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

    const [image,setImage] = useState(null)
    const [image1,setImage1] = useState(null)
    const [image2,setImage2] = useState(null)
    const [image3,setImage3] = useState(null)
    const [image4,setImage4] = useState(null)
    const [image5,setImage5] = useState(null)

    const [imagePreview,setImagePreview] = useState(null)
    const [imagePreview1,setImagePreview1] = useState(null)
    const [imagePreview2,setImagePreview2] = useState(null)
    const [imagePreview3,setImagePreview3] = useState(null)
    const [imagePreview4,setImagePreview4] = useState(null)
    const [imagePreview5,setImagePreview5] = useState(null)

    
    const handleBothImage = (event,setImage,setImagePreview) => { 
        const file = event.target.files[0]
        setImage(file)

        const previewImage = URL.createObjectURL(file)
        setImagePreview(previewImage)
    }



    useEffect(() => { 
        if (make) { 
            setAvailableModel(makeModelMap[make])
        }
        else {
            setAvailableModel([])
        }
        setModel('')
    },[make])

 
    useEffect(() => { 
        const error = {}
        if (!make) error.make = 'Please select a car make.'
        if (!model) error.model = 'Please select a car model.'
        if (!year) error.year = 'Please select the year of the car.'
        if (!mileage) error.mileage = 'Please enter the car\'s mileage.'
        if (!type) error.type = 'Please select the fuel type.'
        if (!price) error.price = 'Please enter the price of the car.'
        if (!image) error.image = 'Please upload a main image of the car.'
        if (!image1) error.image1 = 'Additional image file required.'
        if (!image2) error.image2 = 'Additional image file required.'
        setValidationErrors(error)
    },[make,mileage,model,year,price,type,image,image1,image2,image3,image4,image5])

    const handleSubmit = async (e) => { 
        e.preventDefault()

        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return 'something went wrong please try agian aaaa';
        }
        const formData = new FormData()
        formData.append("image",image)
        formData.append("mileage",mileage)
        formData.append("make",make)
        formData.append("model",model)
        formData.append("year",year)
        formData.append("price",price)
        formData.append("type",type)
        const responseData = await dispatch(createProductThunk(formData));

        if (responseData && responseData.id) {
            const imageFormData = new FormData()
            imageFormData.append('image1',image1)
            imageFormData.append('image2',image2)
            imageFormData.append('image3',image3)
            imageFormData.append('image4',image4)
            imageFormData.append('image5',image5)
    
            await dispatch(addProductImagesThunk(responseData.id,imageFormData))
            navigate(`/product/${responseData.id}`);
        }
        setHasSubmitted(false);
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
       
   
  
        <label>
            Image*
            {hasSubmitted && validationErrors.image && (
        <span className="error">{validationErrors.image}</span>
    )}
        <input type="file"
        accept="image/*"
        onChange={(e => handleBothImage(e,setImage,setImagePreview))}
        />
    {imagePreview && <img src={imagePreview} alt="Preview 1" className="image1"/>}
        
        </label>
            <label>
                Image1*
                {hasSubmitted && validationErrors.image1 && (
            <span className="error">{validationErrors.image1}</span>)}
                <input type="file" accept="image/*" onChange={(e) => handleBothImage(e,setImage1,setImagePreview1)} />
    {imagePreview1 && <img src={imagePreview1} alt="Preview 1" className="image1"/>}
                
            </label>

            <label>
                Image2*
            {hasSubmitted && validationErrors.image2 && (
            <span className="error">{validationErrors.image2}</span>)}
                <input type="file" accept="image/*" onChange={(e) => handleBothImage(e,setImage2,setImagePreview2)} />
    {imagePreview2 && <img src={imagePreview2} alt="Preview 2" className="image1"/>}

            </label>
            {/* {hasSubmitted && validationErrors.image3 && (
            <span className="error">{validationErrors.image3}</span>)} */}
            <label>
                Image3
                <input type="file" accept="image/*" onChange={(e) => handleBothImage(e,setImage3,setImagePreview3)} />
    {imagePreview3 && <img src={imagePreview3} alt="Preview 1" className="image1"/>}

            </label>
            {/* {hasSubmitted && validationErrors.image4 && (
            <span className="error">{validationErrors.image4}</span>)} */}
            <label>
                Image4
                <input type="file" accept="image/*" onChange={(e) => handleBothImage(e,setImage4,setImagePreview4)} />
    {imagePreview4 && <img src={imagePreview4} alt="Preview 1" className="image1"/>}

            </label>
            {/* {hasSubmitted && validationErrors.image5 && (
            <span className="error">{validationErrors.image5}</span>)} */}
            <label>
                Image5
                <input type="file" accept="image/*" onChange={(e) => handleBothImage(e,setImage5,setImagePreview5)} />
                
    {imagePreview5 && <img src={imagePreview5} alt="Preview 1" className="image1"/>}
            </label>
            <div className="button-container">
                <button>Submit</button>
            </div>      
    </div>

     </form>
     </div>
    )
}




export default CreateProduct