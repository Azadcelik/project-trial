import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { createProductThunk } from "../../redux/product"
import { useNavigate } from "react-router-dom"
import "./CreateProduct.css"




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

 
    useEffect(() => { 
        const error = {}
        if (!make) error.make = 'You should choose one of them'
        if (!mileage) error.mileage = 'You should choose one of them'
        if (!model) error.model = 'You should choose one of them'
        if (!year) error.year = 'You should choose one of them'
        if (!price) error.price = 'You should choose one of them'
        if (!type) error.type = 'You should choose one of them'
        if (!image) error.image = 'Image is required'
        setValidationErrors(error)
    },[make,mileage,model,year,price,type,image])

    const handleSubmit = async (e) => { 
        e.preventDefault()

        setHasSubmitted(true)

        if (Object.values(validationErrors).length) {
            return;
        }
        const formData = new FormData()
        formData.append("image",image)
        formData.append("mileage",mileage)
        formData.append("make",make)
        formData.append("model",model)
        formData.append("year",year)
        formData.append("price",price)
        formData.append("type",type)
        await dispatch(createProductThunk(formData))

        setHasSubmitted(false)
        navigate('/product')
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
    <button>Submit</button>
    </div>

     </form>
     </div>
    )
}




export default CreateProduct