import axios from 'axios';

const shops = (state = [], action)=> {
  if(action.type === 'SET_SHOPS'){
    return action.shops;
  }
  if(action.type === 'CREATE_SHOP'){
    return [action.shop, ...state]
  }
  if(action.type === 'EDIT_SHOP'){
    state = state.map(shop => {
      if (shop.id === action.shop.id){
        return action.shop
      }
      return shop
    })
  }
  if(action.type === 'DELETE_SHOP'){
    return state.filter(_shop => _shop.id !== action.shop.id)
  }
  return state;
};


export const fetchShops = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/shops');
    dispatch({type: 'SET_SHOPS', shops: response.data})
  };
};
export const createShop = (shop)=> {
  return async(dispatch)=> {
    const response = await axios.post(`api/shops`, shop);
    dispatch({type: 'CREATE_SHOP', shop: response.data})
  };
};
export const editShop = (shop)=> {
  return async(dispatch)=> {
    const response = await axios.put(`api/shops/${shop.id}`, shop);
    dispatch({type: 'EDIT_SHOP', shop: response.data})
  };
};
export const deleteShop = (shop)=> {
  return async(dispatch)=> {
    await axios.delete(`api/shops/${shop.id}`);
    dispatch({type: 'DELETE_SHOP', shop})
  };
};


export default shops;
