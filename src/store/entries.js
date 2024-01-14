import axios from 'axios';
import auth from '../store/auth';

const entries = (state = [], action)=> {
  if(action.type === 'SET_ENTRIES'){
    return action.entries;
  }
  if(action.type === 'CREATE_ENTRY'){
    return [action.entry, ...state]
  }
  if (action.type === 'EDIT_ENTRY') {
    state = state.map((entry) => {
      if (entry.id === action.entry.id) {
        return action.entry;
      }
      return entry;
    });
  }
  
  if(action.type === 'DELETE_ENTRY'){
    return state.filter(_entry => _entry.id !== action.entry.id)
  }
 
  return state;
};




export const fetchEntries = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.get(`/api/entries/${id}`, {
        headers: {
          Authorization:  token 
        }
      });
      dispatch({ type: 'SET_ENTRIES', entries: response.data });
     
      console.log(response)
    } 
};




export const createEntry = (entry)=> {
  return async(dispatch)=> {
    const response = await axios.post(`/api/entries`, entry);
    dispatch({type: 'CREATE_ENTRY', entry: response.data})
  };
};


export const editEntry = (entry)=> {
  return async(dispatch)=> {
    const response = await axios.put(`api/menu/${entry.id}`, entry);
    dispatch({type: 'EDIT_ENTRY', entry: response.data})
  };
};


export const deleteEntry = (entry) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/entries/${entry.id}`);
      dispatch({ type: 'DELETE_ENTRY', entry });
    } catch (error) {
      console.log(error);
    }
  };
};

export default entries;
