import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom'; 
import { deleteShop, editShop } from '../../store/shops'
import { maxWidth } from '@mui/system';




const AdminShopsShop = () => {
const { shops } = useSelector(state => state)
const {id} = useParams()
const dispatch = useDispatch()
const navigate = useNavigate()
const [name, setName] = useState('')
const [category, setCategory] = useState('')
const [imageUrl, setImageUrl] = useState('')
const [description, setDescription] = useState('')
const [price, setPrice] = useState('')

if (!shops) {
  return null
}
const shop = shops.find(shop => shop.id === id)

const destroy = async() => {
  await dispatch(deleteShop(shop))
  navigate('/admin/shops')
}


useEffect(()=>{
  const shop = shops.find(shop => {  
    return shop.id === id
  })
  setName( shop? shop.name : '')
  setCategory( shop? shop.category : '')
  setImageUrl( shop? shop.imageUrl : '')
  setDescription( shop? shop.description : '')
  setPrice(shop? shop.price : '')
}, [id, shops])

const save = async(ev) => {
  ev.preventDefault();
  try{
      await dispatch(editShop({name, category, imageUrl, description, price, id})); 
      navigate('./admin/shops');
    }
  catch(err){
    setErrors(err);
    console.log(err)
  }
}

const categories = ["shirt", "mug", "healthProduct"]



return (
  <div style={{margin: 'auto', maxWidth: "80%", fontSize:"1.4rem", padding:"1rem"}} >
    <h1> {shop.name} </h1>
    <ul>
      <li>Category: {shop.category} </li>
      <li>Image:</li>
      <img src={shop.imageUrl} style={{maxWidth:"300px"}} alt="shop image"/>
      <li>Description: {shop.description} </li>

    </ul>


    <b>edit shop?</b>
    <form onSubmit={save} style={{margin: 'auto', maxWidth: "80%", minWidth:"350px"}}>
      <label>Name:   
      <input value={name} onChange={ev=> setName(ev.target.value)} placeholder={'First Name'}></input>
      </label>

      <label>Category:    
      <select value={category } onChange={ev=> setCategory(ev.target.value)}>
      <option>Pick a Category</option>
        {categories.map( cat => {
          return(
            <option value={ cat } key={ cat.id }>{ cat }</option>
            )})}
      </select>
      </label>

      <label>Image URL:
      <input value={imageUrl} onChange={ev=> setImageUrl(ev.target.value)} placeholder={'Email Address'}></input>
      </label>
      <label>Description:
      <input value={description} onChange={ev=> setDescription(ev.target.value)} placeholder={'Email Address'}></input>
      </label>
      <label>Price:
      <input value={price} onChange={ev=> setPrice(ev.target.value)} placeholder={'Email Address'}></input>
      </label>
      <div style={{display: "flex", justifyContent:"space-around"}}>
      <button style={{width: "200px"}}>update</button>
      <button style={{width: "200px"}} onClick= {destroy}> delete shop?? </button>
      </div>
      </form>

      <h5><Link to={'/admin/shop'}>Back to Shop List</Link></h5>
      <h5><Link to={'/admin'}>Back to Admin Home</Link></h5>
    

  </div>
)
}

export default AdminShopsShop;