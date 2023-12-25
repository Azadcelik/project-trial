import { useState } from "react"
import { useDispatch } from "react-redux"
import { createProductThunk } from "../../redux/product"
import { useNavigate } from "react-router-dom"





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


    const handleSubmit = async (e) => { 
        e.preventDefault()

        const formData = new FormData()
        formData.append("image",image)
        formData.append("mileage",mileage)
        formData.append("make",make)
        formData.append("model",model)
        formData.append("year",year)
        formData.append("price",price)
        formData.append("type",type)
        await dispatch(createProductThunk(formData))
        navigate('/product')
    }



    return (
<div>
     <form onSubmit={handleSubmit} encType="multipart/form-data" action="/product">
    
    <div>
        <label>
            Make
            <input type="text" 
            value={make}
            onChange={(e => setMake(e.target.value))}
            />
        </label>
        <label>
            Model
            <input type="text" 
            value={model}
            onChange={(e => setModel(e.target.value))}
            />
        </label>
        <label>
            Year
            <input type="text" 
            value={year}
            onChange={(e => setYear(e.target.value))}
            />
        </label>
        <label>
            Mileage
            <input type="text" 
            value={mileage}
            onChange={(e => setMileage(e.target.value))}
            />
        </label>
        <label>
            Type
            <input type="text" 
            value={type}
            onChange={(e => setType(e.target.value))}
            />
        </label>

        <label>
            Price
            <input type="text" 
            value={price}
            onChange={(e => setPrice(e.target.value))}
            />
        </label>
       
        <label>
            Image
        <input type="file"
        accept="image/*"
        onChange={(e => setImage(e.target.files[0]))}
        />
        </label>
    </div>
    <button>Submit</button>

     </form>
     </div>
    )
}




export default CreateProduct