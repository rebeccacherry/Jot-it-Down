import axios from 'axios';
import auth from '../store/auth';

const journals = (state = [], action)=> {
  if(action.type === 'SET_JOURNALS'){
    return action.journals;
  }
  if(action.type === 'CREATE_JOURNAL'){
    return [action.journal, ...state]
  }
  if(action.type === 'EDIT_JOURNAL'){
    state = state.map(journal => {
      if (journal.id === action.journal.id){
        return action.journal
      }
      return journal
    })
  }
  if(action.type === 'DELETE_JOURNAL'){
    return state.filter(_journal => _journal.id !== action.journal.id)
  }
  return state;
};

export const fetchJournals = (journal) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/journals', {
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: 'SET_JOURNALS', journals: response.data });
  };
};



// export const fetchJournals = () => {
//   return async (dispatch) => {
//     const token = window.localStorage.getItem('token');
//     const response = await axios.get('/api/journals', {
//         headers: {
//           Authorization:  token 
//         }
//       });
//       dispatch({ type: 'SET_JOURNALS', journals: response.data });
//     } 
// };


// export const fetchJournals = () => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get('/api/journals');
//       dispatch({ type: 'SET_JOURNALS', journals: response.data });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };


export const createJournal = (journal)=> {
  return async(dispatch)=> {
    const response = await axios.post(`api/journals`, journal);
    dispatch({type: 'CREATE_JOURNAL', journal: response.data})
  };
};
export const editJournal = (journal)=> {
  return async(dispatch)=> {
    const response = await axios.put(`api/journals/${journal.id}`, journal);
    dispatch({type: 'EDIT_JOURNAL', journal: response.data})
  };
};
export const deleteJournal = (journal)=> {
  return async(dispatch)=> {
    await axios.delete(`api/journals/${journal.id}`);
    dispatch({type: 'DELETE_JOURNAL', journal})
  };
};


export default journals;
