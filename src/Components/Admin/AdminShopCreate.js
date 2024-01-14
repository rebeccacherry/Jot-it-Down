import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { createShop } from '../../store';

const categories = ["shirt", "mug", "healthProduct"]

const CreateShop = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [hasImage, setHasImage] = useState(false) 
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (imageURL) {
      setHasImage(true)
    }
    if (!imageURL) {
      setHasImage(false)
    }
  }, [imageURL])



  const create = async(ev) => {
    ev.preventDefault()
    await dispatch(createShop({name, category, imageURL, hasImage, description}))
    navigate('/admin/shop')

  }


  return (
    <div style={{margin: 'auto', maxWidth: "80%", fontSize:"1.4rem", padding:"1rem"}} >
      <h3> Create new shop: </h3>
      <form onSubmit= { create } >

      <input placeholder='Shop  Name' value= { name } onChange= { (ev) => {setName(ev.target.value)}} />
    
      <select value={ category } onChange= {(ev) => setCategory(ev.target.value)} >
      <option>Pick a Category</option>
        {categories.map( cat => {
          return(
            <option value={ cat } key={ cat.id }>{ cat }</option>
            )})}
      </select>
  
      
      <input placeholder='image url' value= { imageURL } onChange= { (ev) => {setImageURL(ev.target.value), useEffect()}} />
      
      <input placeholder='description' value= { description } onChange= { (ev) => {setDescription(ev.target.value)}} />
      
      
      <button> Create Shop </button>
      </form>
    </div>

  )

}



export default CreateShop; 