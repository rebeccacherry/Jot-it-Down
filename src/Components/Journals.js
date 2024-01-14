import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createJournal, deleteJournal, fetchJournals } from '../store';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

const Journals = () => {
  const { auth, journals } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!auth.id) {
      navigate('/login');
    } else {
      dispatch(fetchJournals());
    }
  }, [dispatch, auth.id, navigate]);

  useEffect(() => {
    ref.current.addEventListener('change', (ev) => {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        setImageUrl(reader.result);
      });
    });
  }, []);

  const create = async (ev) => {
    ev.preventDefault();
    try {
      const { id: userId } = auth;
      const newJournal = await dispatch(
        createJournal({ title, description, imageUrl, userId })
      );
      setTitle('');
      setDescription('');
      setImageUrl('');
      setErrors([]);

      navigate(`/journals/${newJournal.id}`);
    } catch (ex) {
      console.log(ex);
      const errorMessage = ex.message || 'An error occurred';
      setErrors([errorMessage]);
    }
  };

  const destroy = async (journal) => {
    try {
      await dispatch(deleteJournal(journal));
    } catch (ex) {
      console.log(ex);
      const errorMessage = ex.message || 'An error occurred';
      setErrors([errorMessage]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src="static/images/journal-page-photo.jpg"
        alt="Journal Page Photo"
        style={{ width: '60%', marginTop: '10px', marginBottom: '10px' }}
      />
      <div
        style={{
          background: '#F5F5F5',
          padding: '10px',
          width: '80%',
          display: 'flex', flexDirection: 'column', alignItems: 'center' 
        }}
      >
       
        <div>
          Welcome {auth.username}. Discover the power of Jotit Down. Begin by choosing your journal or start a new one.
        </div>

        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
          <h3>Your Journals</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {journals.map((journal) => (
              <li key={journal.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                {!!journal.imageUrl && (
                  <img
                    src={journal.imageUrl}
                    style={{ maxHeight: '150px', maxWidth: '150px', marginRight: '5px' }}
                  />
                )}
                <Button
                  component={Link}
                  to={`/journals/${journal.id}`}
                  variant="contained"
                  style={{ marginRight: '10px' }}
                  size="small"
                  sx={{
                    mt: 2,
                    color: '#333',
                    backgroundColor: '#F9F6EE',
                    '&:hover': { backgroundColor: '#F5F5F5', color: '#888' },
                  }}
                >
                  {journal.title}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => destroy(journal)}
                  size="small"
                  sx={{
                    mt: 2,
                    color: '#333',
                    backgroundColor: '#F9F6EE',
                    '&:hover': { backgroundColor: '#F5F5F5', color: '#888' },
                  }}
                   >
                  Delete 
                </Button>
              </li>
            ))}
          </ul>
        </div>

          <h4>Create A New Journal</h4>
        <form onSubmit={create} style={{ marginBottom: '10px' }}>
          <TextField
            label="Title"
            value={title}
            placeholder="Enter title"
            onChange={(ev) => setTitle(ev.target.value)}
            fullWidth
            required
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            placeholder="Enter description"
            onChange={(ev) => setDescription(ev.target.value)}
            fullWidth
            required
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
          <div style={{ marginBottom: '10px' }}>
            <InputLabel htmlFor="image">
              Image
              <Input id="image" name="image" type="file" inputRef={ref} />
            </InputLabel>
            {!!imageUrl && <img src={imageUrl} style={{ width: '100px' }} alt="Selected" />}
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ fontSize: '1.2rem' }}
            size="medium"
            sx={{
              mt: 2,
              color: '#333',
              backgroundColor: '#F9F6EE',
              '&:hover': { backgroundColor: '#F5F5F5', color: '#888' },
            }}
          >
            Create Your Journal
          </Button>
          <ul
  style={{ listStyleType: 'none' }}
  sx={{
    padding: 0,
    margin: 0,
  }}
>
  {errors.map((error, idx) => (
    <li key={idx}>{error.message}</li>
  ))}
</ul>

        </form>
        
      </div>
    </div>
  );
};

export default Journals;










// import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
// import Badge from '@mui/material/Badge';
// import dayjs from 'dayjs';
// import Container from '@mui/material/Container';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { createJournal, deleteJournal } from '../store';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
// import Input from '@mui/material/Input';
// import { Link } from 'react-router-dom';
// import { fetchJournals } from '../store';

// const Journals = () => {
//   const { auth, journals } = useSelector(state => state); // Retrieve journals from the state
//   const dispatch = useDispatch();
//   const ref = useRef();
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [errors, setErrors] = useState([]);
//   const navigate = useNavigate('');


//   useEffect(() => {
//     if (!auth.id){
//       navigate('/login')
//     } else {
//       dispatch(fetchJournals());
//     }
//   }, [dispatch, auth.id, navigate]);
  

//   useEffect(() => {
//     ref.current.addEventListener('change', ev => {
//       const file = ev.target.files[0];
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.addEventListener('load', () => {
//         setImageUrl(reader.result);
//       });
//     });
//   }, []);

//   const create = async ev => {
//     ev.preventDefault();
//     try {
//       const { id: userId } = auth;
//       const newJournal = await dispatch(
//         createJournal({ title, description, imageUrl, userId })
//       );
//       setTitle('');
//       setDescription('');
//       setImageUrl('');
//       setErrors([]);

//       navigate(`/journals/${newJournal.data.id}`);
//     } catch (ex) {
//       console.log(ex);
//       const errorMessage = ex.message || 'An error occurred';
//       setErrors([errorMessage]);
//     }
//   };

//   const destroy = async journal => {
//     dispatch(deleteJournal(journal));
//   };

  

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <div>
//         <h1>Journals</h1>
//         <div>
//           Welcome {auth.username}. Discover the power of Jotit Down. Begin by choosing your journal or start a new one.
//         </div>

//         {/* <Container label={'"year", "month" and "day"'}>
//           <DateCalendar defaultValue={dayjs('2023-05-01')} />
//         </Container> */}

//         <div>
//           <ul>
//             {journals.map(journal => { // Map over journals specific to the user
//               console.log('my journal');
//               return (
//                 <li key={journal.id}>
//                   <div>
//                     {!!journal.imageUrl && (
//                       <img
//                         src={journal.imageUrl}
//                         style={{ maxHeight: '100px', maxWidth: '100px' }}
//                       />
//                     )}
//                   </div>
//                   <Link className="link" to={`/journals/${journal.id}`}>
//                     {journal.title}
//                   </Link>
//                   <button
//                     className="delete"
//                     onClick={() => dispatch(deleteJournal(journal))}
//                   >
//                     X
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>


//         <form onSubmit={create}>
//           <TextField
//             label="title"
//             value={title}
//             placeholder="Title"
//             name="title"
//             onChange={ev => setTitle(ev.target.value)}
//           />
//           <div style={{ marginBottom: 1 }} />
//           <TextField
//             label="description"
//             value={description}
//             placeholder="Write a description of your journal"
//             name="description"
//             onChange={ev => setDescription(ev.target.value)}
//           />
//           <div style={{ marginBottom: 1 }} />
//           <div>
//             <InputLabel htmlFor="image">
//               IMAGE
//               <Input id="image" name="image" type="file" inputRef={ref} />
//             </InputLabel>
//             {!!imageUrl && <img src={imageUrl} style={{ width: '100px' }} />}
//           </div>
//           <Button type="submit" style={{ fontSize: '1.2rem' }}>
//             CREATE YOUR JOURNAL
//           </Button>
//           <ul>
//             {errors.map((error, idx) => {
//               return <li key={idx}>{error.message}</li>;
//             })}
//                    </ul>
//         </form>
//       </div>
//     </LocalizationProvider>
//   );
// };

// export default Journals;



