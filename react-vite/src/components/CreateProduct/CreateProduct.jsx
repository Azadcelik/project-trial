import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createProductThunk } from "../../redux/product"
import { useNavigate } from "react-router-dom"
import "./CreateProduct.css"
import { addProductImagesThunk } from "../../redux/productImage"




const CreateProduct = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image,setImage] = useState(null)
    const [mileage,setMileage] = useState('')
    const [make,setMake] = useState('')
    const [model,setModel] = useState('')
    const [year,setYear] = useState(0)
    const [price,setPrice] = useState('')
    const [type,setType] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})

    const [image1,setImage1] = useState(null)
    const [image2,setImage2] = useState(null)
    const [image3,setImage3] = useState(null)
    const [image4,setImage4] = useState(null)
    const [image5,setImage5] = useState(null)

 
    useEffect(() => { 
        const error = {}
        if (!make) error.make = 'You should choose one of them'
        if (!mileage) error.mileage = 'You should choose one of them'
        if (!model) error.model = 'You should choose one of them'
        if (!year) error.year = 'You should choose one of them'
        if (!price) error.price = 'You should choose one of them'
        if (!type) error.type = 'You should choose one of them'
        if (!image) error.image = 'Image is required'
        if (!image1) error.image1 = 'Image file required'
        if (!image2) error.image2 = 'Image file required'
        // if (!image3) error.image3 = 'Image file required'
        // if (!image4) error.image4 = 'Image file required'
        // if (!image5) error.image5 = 'Image file required'
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
     <form onSubmit={handleSubmit} encType="multipart/form-data" action="/product">
    
    <div className="main-create">

    {hasSubmitted && validationErrors.make && (
        <span className="error">{validationErrors.make}</span>
    )}
        <label>
    Make
    <select value={make} onChange={(e) => setMake(e.target.value)}>
        <option value="">Select Make</option>
        <option value="Toyota">Toyota</option>
        <option value="Ford">Ford</option>
        <option value="Honda">Honda</option>
    </select>
</label>
        
    {hasSubmitted && validationErrors.model && (
        <span className="error">{validationErrors.model}</span>
    )}
     <label>
    Model
    <select value={model} onChange={(e) => setModel(e.target.value)}>
        <option value="">Select Model</option>
        <option value="Camry">Camry</option>
        <option value="F-150">F-150</option>
        <option value="Civic">Civic</option>
        
    </select>
</label>
       
    {hasSubmitted && validationErrors.year && (
        <span className="error">{validationErrors.year}</span>
    )}
       <label>
    Year
    <select value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="">Select Year</option>
        {
            Array.from(new Array(20), (val, index) => new Date().getFullYear() - index).map(year => (
                <option key={year} value={year}>{year}</option>
            ))
        }
    </select>
</label>

       
    {hasSubmitted && validationErrors.mileage && (
        <span className="error">{validationErrors.mileage}</span>
    )}
        <label>
            Mileage
            <input type="text" 
            value={mileage}
            onChange={(e => setMileage(e.target.value))}
            />
        </label>

        {hasSubmitted && validationErrors.type && (
        <span className="error">{validationErrors.type}</span>
    )}
      <label>
    Fuel Type
    <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Select Fuel Type</option>
        <option value="Electric">Electric</option>
        <option value="Hybrid">Hybrid</option>
        <option value="Gasoline">Gasoline</option>
    </select>
</label>

        {hasSubmitted && validationErrors.price && (
        <span className="error">{validationErrors.price}</span>
    )}
        <label>
            Price
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
        onChange={(e => setImage(e.target.files[0]))}
        />
        </label>
        {hasSubmitted && validationErrors.image1 && (
            <span className="error">{validationErrors.image1}</span>)}
            <label>
                Image1
                <input type="file" accept="image/*" onChange={(e) => setImage1(e.target.files[0])} />
            </label>

            {hasSubmitted && validationErrors.image2 && (
            <span className="error">{validationErrors.image2}</span>)}
            <label>
                Image2
                <input type="file" accept="image/*" onChange={(e) => setImage2(e.target.files[0])} />
            </label>
            {/* {hasSubmitted && validationErrors.image3 && (
            <span className="error">{validationErrors.image3}</span>)} */}
            <label>
                Image3
                <input type="file" accept="image/*" onChange={(e) => setImage3(e.target.files[0])} />
            </label>
            {/* {hasSubmitted && validationErrors.image4 && (
            <span className="error">{validationErrors.image4}</span>)} */}
            <label>
                Image4
                <input type="file" accept="image/*" onChange={(e) => setImage4(e.target.files[0])} />
            </label>
            {/* {hasSubmitted && validationErrors.image5 && (
            <span className="error">{validationErrors.image5}</span>)} */}
            <label>
                Image5
                <input type="file" accept="image/*" onChange={(e) => setImage5(e.target.files[0])} />
            </label>
    <button>Submit</button>

    </div>

     </form>
     </div>
    )
}




export default CreateProduct