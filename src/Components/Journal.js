import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { createEntry, deleteEntry, fetchEntries, editEntry } from "../store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Day } from "@mui/lab";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

const Journal = () => {
  const { auth, entries } = useSelector((state) => state);
  const dispatch = useDispatch();
  const ref = useRef();
  const [selectedDate, setSelectedDate] = useState(null);
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  


  const { id } = useParams();
 
  useEffect(() => {
    dispatch(fetchEntries(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!editMode) {
      setSubject("");
      setDescription("");
      setImageUrl("");
      setErrors([]);
      setDate(dayjs());
      setTime(dayjs());
    }
  }, [editMode]);


  useEffect(() => {
    ref.current.addEventListener("change", (ev) => {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        setImageUrl(reader.result);
      });
    });
  }, []);

 

  const create = async (ev, journalId) => {
    ev.preventDefault();
    try {
      await dispatch(
        createEntry({ subject, description, imageUrl, journalId, date, time })
      );
      setSubject("");
      setDescription("");
      setImageUrl("");
      setErrors([]);
      setDate(null);
      setTime(null);
    } catch (ex) {
      console.log(ex);
      const errorMessage = ex.message || "An error occurred";
    }
  };

  const handleDelete = async (entry) => {
    await dispatch(deleteEntry(entry));
  };


  
 
  
  // useEffect(() => {
  //   const entry = entries.find((entry) => entry.journalId === id);
  //   console.log(entry);
  //   if (entry) {
  //     setSubject(entry.subject);
  //     setDescription(entry.description);
  //     setDate(dayjs(entry.date));
  //     setTime(dayjs(`1970-01-01T${entry.time}`));

  //     // setEditMode(true);
  //   }
  // }, [entries, id]);




  const update = async (ev) => {
    ev.preventDefault();
    setEditMode(false);
    try {
      await dispatch(
        editEntry({ subject, imageUrl, description, date, time, id })
      );
    } catch (err) {
      setErrors(err);
      console.log(err);
    }
  };



  const today = dayjs();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Container sx={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: "1" }}>
            <Card sx={{ textAlign: 'center', backgroundColor: "#F9F6EE", marginTop: '10px', marginBottom: '10px', }}>
          <h3 sx={{ textAlign: 'center' }}>Start Writing In Your Journal.</h3>
    <h5 sx={{ textAlign: 'center' }}>Great topics are: Your passions, work, family, health, and happiness.</h5>
    </Card>
            {!!editMode ? (
              <form
                onSubmit={update}
                sx={{ backgroundColor: "#1E2D3B", padding: "10px" }}
              >
                <DatePicker
                  defaultValue={today}
                  maxDate={today}
                  onChange={(newDate) => setDate(newDate)}
                  TextField={(params) => <input {...params} />}
                />
                <div style={{ marginBottom: "5px" }} />
                <TimePicker
                  TimePicker
                  defaultValue={time}
                  maxTime={time}
                  onChange={(newTime) => setTime(newTime)}
                />
                <div style={{ marginBottom: "5px" }} />
                <TextField
                  label="Subject"
                  value={subject}
                  name="subject"
                  onChange={(ev) => setSubject(ev.target.value)}
                />
                <div style={{ marginBottom: "5px" }} />
                <TextField
                  label="Description"
                  value={description}
                  multiline
                  rows={6}
                  name="description"
                  onChange={(ev) => setDescription(ev.target.value)}
                  sx={{
                    width: "100%",
                    height: "170px",
                  }}
                />
                <div style={{ marginBottom: "5px" }} />
                <div>
                  <InputLabel
                    style={{ fontSize: "16px", fontFamily: "helvetica" }}
                    htmlFor="image"
                  >
                    Image
                  </InputLabel>
                  <Input id="image" name="image" type="file" inputRef={ref} />
                  {!!imageUrl && (
                    <Card sx={{ maxWidth: 200, margin: "10px 0" }}>
                      <CardMedia
                        component="img"
                        alt="Entry Image"
                        height="150"
                        image={imageUrl}
                      />
                    </Card>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    color: "#333",
                    backgroundColor: "#F9F6EE",
                    "&:hover": { backgroundColor: "#F5F5F5", color: "#888" },
                  }}
                >
                  EDIT YOUR ENTRY
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    color: "#333",
                    backgroundColor: "#F9F6EE",
                    "&:hover": { backgroundColor: "#F5F5F5", color: "#888" },
                  }}
                  onClick={() => {
                    setEditMode(false);
                    setSubject("");
                    setDescription("");
                    setImageUrl("");
                    setErrors([]);
                    setDate(dayjs()); // Set date to the default value (e.g., current date)
                    setTime(dayjs({ time })); // Set time to the default value (e.g., current time)
                  }}
                >
                  GO TO CREATE AN ENTRY
                </Button>
              </form>
            ) : (
              <form
                onSubmit={create}
                sx={{ backgroundColor: "#1E2D3B", padding: "10px" }}
              >
                 <DatePicker
                  defaultValue={today}
                  maxDate={today}
                  onChange={(newDate) => setDate(newDate)}
                  TextField={(params) => <input {...params} />}
                />
                <div style={{ marginBottom: "5px" }} />
                <TimePicker
                  TimePicker
                  defaultValue={time}
                  maxTime={time}
                  onChange={(newTime) => setTime(newTime)}
                />
                <div style={{ marginBottom: "5px" }} />
                <TextField
                  label="Subject"
                  value={subject}
                  placeholder="Subject"
                  name="subject"
                  onChange={(ev) => setSubject(ev.target.value)}
                />
                <div style={{ marginBottom: "5px" }} />
               
                <TextField
                  label="Description"
                  value={description}
                  multiline
                  rows={6}
                  sx={{
                    width: "100%",
                    height: "170px",
                  }}
                  placeholder="Start writing today's entry here..."
                  name="description"
                  onChange={(ev) => setDescription(ev.target.value)}
            
                />
                <div style={{ marginBottom: "5px" }} />

                <div>
                  <InputLabel
                    style={{ fontSize: "16px", fontFamily: "helvetica" }}
                    htmlFor="image"
                  >
                    Image
                  </InputLabel>
                  <Input id="image" name="image" type="file" inputRef={ref} />
                  {!!imageUrl && (
                    <Card sx={{ maxWidth: 200, margin: "10px 0" }}>
                      <CardMedia
                        component="img"
                        alt="Entry Image"
                        height="150"
                        image={imageUrl}
                      />
                    </Card>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 2,
                    color: "#333",
                    backgroundColor: "#F9F6EE",
                    "&:hover": { backgroundColor: "#F5F5F5", color: "#888" },
                  }}
                >
                  CREATE YOUR ENTRY
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/journals"
                  sx={{
                    mt: 2,
                    color: "#333",
                    backgroundColor: "#F9F6EE",
                    "&:hover": { backgroundColor: "#F5F5F5", color: "#888" },
                  }}
                >
                  See All My Journals Or Create A New One
                </Button>

                <ul
                  style={{ listStyleType: "none" }}
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
            )}
          </div>
          <div style={{ flex: "1" }}>
            {entries.length === 0 ? (
              <p>
                There are no current entries. Please create an entry to begin
                your journal.
              </p>
            ) : (
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <ul style={{ listStyle: "none" }}>
                  <Card
                    sx={{
                      backgroundColor: "#F9F6EE",
                      padding: "10px",
                      marginBottom: "10px",
                      textAlign: "center",
                    }}
                  >
                    <h3 sx={{ width: "100%", margin: "10px 0" }}>
                      Your Entries
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <DatePicker
                        className="customDatePicker"
                        value={selectedDate}
                        maxDate={today}
                        onChange={(date) => setSelectedDate(date)}
                      />
                    
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setSelectedDate(null)}
                        sx={{
                          mt: 2,
                          color: "#333",
                          backgroundColor: "#F9F6EE",
                          "&:hover": {
                            backgroundColor: "#F5F5F5",
                            color: "#888",
                          },
                        }}
                      >
                        Show All Entries
                      </Button>
                    </div>
                  </Card>
<div></div> 

                  {entries.filter((entry)=> entry.journalId === id)
                  .map((entry) => {
                    const entryDate = dayjs(entry.date).format("MMMM D, YYYY");
                    if (
                      selectedDate &&
                      entryDate !== dayjs(selectedDate).format("MMMM D, YYYY")
                    ) {
                      return null; // Skip rendering the entry if it doesn't match the selected date
                    }
                    return (
                      <li
                        key={entry.id}
                        style={{
                          border: "1px solid #ccc", //light grey (#ccc)
                          borderRadius: "4px", // radius for rounded corners
                          padding: "10px",
                          marginBottom: "10px",
                          backgroundColor: "#F9F6EE",
                        }}
                      >
                        {!!entry.imageUrl && (
                          <Card sx={{ maxWidth: 600, maxHeight: "auto" }}>
                            <CardMedia
                              component="img"
                              alt="Entry Image"
                              src={entry.imageUrl}
                              style={{
                                height: "auto",
                                maxWidth: "100%",
                                display: "block",
                                margin: "0 auto",
                              }}
                            />
                          </Card>
                        )}

                        <p
                          style={{ fontSize: "14px", fontFamily: "helvetica" }}
                        >
                          {entry.subject}
                        </p>
                        {/* {console.log (dayjs(new Date(entry.createdAt)).format("MMMM D, YYYY LT"))} */}
                        <p
                          style={{ fontSize: "12px", fontFamily: "helvetica" }}
                        >
                          Date: {dayjs(entry.date).format("MMMM D, YYYY")}
                        </p>

                        <details>
                          <summary style={{ fontSize: "12px" }}>
                            Expand description
                          </summary>
                          <p style={{ fontSize: "12px" }}>
                            {entry.description}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <p style={{ fontSize: "12px" }}>
                              Time: {entry.time}
                            </p>
                           <Button
  type="submit"
  variant="contained"
  color="primary"
  sx={{
    mt: 2,
    color: "#333",
    backgroundColor: "#F9F6EE",
    "&:hover": {
      backgroundColor: "#F5F5F5",
      color: "#888",
    },
  }}
  onClick={() => {
    setEditMode(true);

    // Update form values with entry values
    const entry = entries.find((entry) => entry.journalId === id);
    if (entry) {
      setSubject(entry.subject);
      setDescription(entry.description);
      setDate(dayjs(entry.date));
      setTime(dayjs(`1970-01-01T${entry.time}`));
    }
  }}
>
  EDIT
</Button>


                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleDelete(entry)}
                              sx={{
                                mt: 2,
                                color: "#333",
                                backgroundColor: "#F9F6EE",
                                "&:hover": {
                                  backgroundColor: "#F5F5F5",
                                  color: "#888",
                                },
                              }}
                            >
                              Delete Entry
                            </Button>
                          </div>
                        </details>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </Container>
      </div>
    </LocalizationProvider>
  );
};

export default Journal;




















// import React, { useState, useRef, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, Link, useParams } from "react-router-dom";
// import { createEntry, deleteEntry, fetchEntries, editEntry } from "../store";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { Day } from "@mui/lab";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import Input from "@mui/material/Input";
// import Stack from "@mui/material/Stack";
// import dayjs from "dayjs";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";

// const Journal = () => {
//   const { auth, entries } = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const ref = useRef();
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [date, setDate] = useState(dayjs());
//   const [time, setTime] = useState(dayjs());
//   const [subject, setSubject] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [errors, setErrors] = useState([]);

//   const navigate = useNavigate();
//   const [editMode, setEditMode] = useState(false);



//   const { id } = useParams();
//   // console.log(id)
//   useEffect(() => {
//     dispatch(fetchEntries(id));
//   }, [dispatch, id]);

  

  


//   useEffect(() => {
//     ref.current.addEventListener("change", (ev) => {
//       const file = ev.target.files[0];
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.addEventListener("load", () => {
//         setImageUrl(reader.result);
//       });
//     });
//   }, []);

//   useEffect(() => {
//     if (!editMode) {
//       setSubject("");
//       setDescription("");
//       setImageUrl("");
//       setErrors([]);
//       setDate(dayjs());
//       setTime(dayjs());
//     }
//   }, [editMode]);

//   const create = async (ev, journalId) => {
//     ev.preventDefault();
//     try {
//       await dispatch(
//         createEntry({ subject, description, imageUrl, journalId, date, time })
//       );
//       setSubject("");
//       setDescription("");
//       setImageUrl("");
//       setErrors([]);
//       setDate(null);
//       setTime(null);
//     } catch (ex) {
//       console.log(ex);
//       const errorMessage = ex.message || "An error occurred";
//     }
//   };

//   const handleDelete = async (entry) => {
//     await dispatch(deleteEntry(entry));
//   };


  
 
  
//   useEffect(() => {
//     const entry = entries.find((entry) => entry.journalId === id);
//     console.log(entry);
//     if (entry) {
//       setSubject(entry.subject);
//       setDescription(entry.description);
//       setDate(dayjs(entry.date));
//       setTime(dayjs(`1970-01-01T${entry.time}`));

//       // setEditMode(true);
//     }
//   }, [entries, id]);



 


//   const update = async (ev) => {
//     ev.preventDefault();
//     setEditMode(false);
//     try {
//       await dispatch(
//         editEntry({ subject, imageUrl, description, date, time, id })
//       );
//     } catch (err) {
//       setErrors(err);
//       console.log(err);
//     }
//   };

//   const today = dayjs();
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <div>
//         <Container sx={{ display: "flex", gap: "10px" }}>
//           <div style={{ flex: "1" }}>
//             <h3>Prompt will go here!</h3>

//             {!!editMode ? (
//               <form
//                 onSubmit={update}
//                 sx={{ backgroundColor: "#1E2D3B", padding: "10px" }}
//               >
//                 <DatePicker
//                   defaultValue={today}
//                   maxDate={today}
//                   onChange={(newDate) => setDate(newDate)}
//                   TextField={(params) => <input {...params} />}
//                 />
//                 <div style={{ marginBottom: "5px" }} />
//                 <TimePicker
//                   TimePicker
//                   defaultValue={time}
//                   maxTime={time}
//                   onChange={(newTime) => setTime(newTime)}
//                 />
//                 <div style={{ marginBottom: "5px" }} />
//                 <TextField
//                   label="Subject"
//                   value={subject}
//                   name="subject"
//                   onChange={(ev) => setSubject(ev.target.value)}
//                 />
//                 <div style={{ marginBottom: "5px" }} />
//                 <TextField
//                   label="Description"
//                   value={description}
//                   multiline
//                   rows={6}
//                   name="description"
//                   onChange={(ev) => setDescription(ev.target.value)}
//                   sx={{
//                     width: "100%",
//                     height: "170px",
//                   }}
//                 />
//                 <div style={{ marginBottom: "5px" }} />
//                 <div>
//                   <InputLabel
//                     style={{ fontSize: "16px", fontFamily: "helvetica" }}
//                     htmlFor="image"
//                   >
//                     Image
//                   </InputLabel>
//                   <Input id="image" name="image" type="file" inputRef={ref} />
//                   {!!imageUrl && (
//                     <Card sx={{ maxWidth: 200, margin: "10px 0" }}>
//                       <CardMedia
//                         component="img"
//                         alt="Entry Image"
//                         height="150"
//                         image={imageUrl}
//                       />
//                     </Card>
//                   )}
//                 </div>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   sx={{
//                     mt: 2,
//                     color: "#333",
//                     backgroundColor: "#F9F6EE",
//                     "&:hover": { backgroundColor: "#F5F5F5", color: "#888" },
//                   }}
//                 >
//                   EDIT YOUR ENTRY
//                 </Button>

//                 <Button
//                   variant="contained"
//                   color="primary"
//                   sx={{
//                     mt: 2,
//                     color: "#333",
//                     backgroundColor: "#F9F6EE",
//                     "&:hover": { backgroundColor: "#F5F5F5", color: "#888" },
//                   }}
//                   onClick={() => {
//                     setEditMode(false);
//                     setSubject("");
//                     setDescription("");
//                     setImageUrl("");
//                     setErrors([]);
//                     setDate(dayjs()); // Set date to the default value (e.g., current date)
//                     setTime(dayjs({ time })); // Set time to the default value (e.g., current time)
//                   }}
//                 >
//                   GO TO CREATE AN ENTRY
//                 </Button>
//               </form>
//             ) : (
//               <form
//                 onSubmit={create}
//                 sx={{ backgroundColor: "#1E2D3B", padding: "10px" }}
//               >
//                 <DatePicker
//                   defaultvalue={date}
//                   maxDate={today}
//                   onChange={(newDate) => setDate(newDate)}
//                 />
//                 <div style={{ marginBottom: "5px" }} />
//                 <TimePicker
//                   defaultvalue={time}
//                   maxTime={time}
//                   onChange={(newTime) => setTime(newTime)}
//                 />
//                 <div style={{ marginBottom: "5px" }} />
//                 <TextField
//                   label="Subject"
//                   value={subject}
//                   placeholder="Subject"
//                   name="subject"
//                   onChange={(ev) => setSubject(ev.target.value)}
//                 />
//                 <div style={{ marginBottom: "5px" }} />
//                 <TextField
//                   label="Description"
//                   value={description}
//                   multiline
//                   rows={6}
//                   placeholder="Start writing today's entry here..."
//                   name="description"
//                   onChange={(ev) => setDescription(ev.target.value)}
//                   sx={{
//                     width: "100%",
//                     height: "170px",
//                   }}
//                 />
//                 <div style={{ marginBottom: "5px" }} />

//                 <div>
//                   <InputLabel
//                     style={{ fontSize: "16px", fontFamily: "helvetica" }}
//                     htmlFor="image"
//                   >
//                     Image
//                   </InputLabel>
//                   <Input id="image" name="image" type="file" inputRef={ref} />
//                   {!!imageUrl && (
//                     <Card sx={{ maxWidth: 200, margin: "10px 0" }}>
//                       <CardMedia
//                         component="img"
//                         alt="Entry Image"
//                         height="150"
//                         image={imageUrl}
//                       />
//                     </Card>
//                   )}
//                 </div>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   sx={{
//                     mt: 2,
//                     color: "#333",
//                     backgroundColor: "#F9F6EE",
//                     "&:hover": { backgroundColor: "#F5F5F5", color: "#888" },
//                   }}
//                 >
//                   CREATE YOUR ENTRY
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   component={Link}
//                   to="/journals"
//                   sx={{
//                     mt: 2,
//                     color: "#333",
//                     backgroundColor: "#F9F6EE",
//                     "&:hover": { backgroundColor: "#F5F5F5", color: "#888" },
//                   }}
//                 >
//                   See All My Journals Or Create A New One
//                 </Button>

//                 <ul
//                   style={{ listStyleType: "none" }}
//                   sx={{
//                     padding: 0,
//                     margin: 0,
//                   }}
//                 >
//                   {errors.map((error, idx) => (
//                     <li key={idx}>{error.message}</li>
//                   ))}
//                 </ul>
//               </form>
//             )}
//           </div>
//           <div style={{ flex: "1" }}>
//             {entries.length === 0 ? (
//               <p>
//                 There are no current entries. Please create an entry to begin
//                 your journal.
//               </p>
//             ) : (
//               <div style={{ marginTop: "10px", marginBottom: "10px" }}>
//                 <ul style={{ listStyle: "none" }}>
//                   <Card
//                     sx={{
//                       backgroundColor: "#F9F6EE",
//                       padding: "10px",
//                       marginBottom: "10px",
//                       textAlign: "center",
//                     }}
//                   >
//                     <h3 sx={{ width: "100%", margin: "10px 0" }}>
//                       Your Entries
//                     </h3>

//                     <div style={{ display: "flex", flexDirection: "column" }}>
//                       <DatePicker
//                         className="customDatePicker"
//                         value={selectedDate}
//                         maxDate={today}
//                         onChange={(date) => setSelectedDate(date)}
//                       />

//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => setSelectedDate(null)}
//                         sx={{
//                           mt: 2,
//                           color: "#333",
//                           backgroundColor: "#F9F6EE",
//                           "&:hover": {
//                             backgroundColor: "#F5F5F5",
//                             color: "#888",
//                           },
//                         }}
//                       >
//                         Show All Entries
//                       </Button>
//                     </div>
//                   </Card>

//                   {entries.map((entry) => {
//                     const entryDate = dayjs(entry.date).format("MMMM D, YYYY");
//                     if (
//                       selectedDate &&
//                       entryDate !== dayjs(selectedDate).format("MMMM D, YYYY")
//                     ) {
//                       return null; // Skip rendering the entry if it doesn't match the selected date
//                     }
//                     return (
//                       <li
//                         key={entry.id}
//                         style={{
//                           border: "1px solid #ccc", //light grey (#ccc)
//                           borderRadius: "4px", // radius for rounded corners
//                           padding: "10px",
//                           marginBottom: "10px",
//                           backgroundColor: "#F9F6EE",
//                         }}
//                       >
//                         {!!entry.imageUrl && (
//                           <Card sx={{ maxWidth: 600, maxHeight: "auto" }}>
//                             <CardMedia
//                               component="img"
//                               alt="Entry Image"
//                               src={entry.imageUrl}
//                               style={{
//                                 height: "auto",
//                                 maxWidth: "100%",
//                                 display: "block",
//                                 margin: "0 auto",
//                               }}
//                             />
//                           </Card>
//                         )}

//                         <p
//                           style={{ fontSize: "14px", fontFamily: "helvetica" }}
//                         >
//                           {entry.subject}
//                         </p>
//                         {/* {console.log (dayjs(new Date(entry.createdAt)).format("MMMM D, YYYY LT"))} */}
//                         <p
//                           style={{ fontSize: "12px", fontFamily: "helvetica" }}
//                         >
//                           Date: {dayjs(entry.date).format("MMMM D, YYYY")}
//                         </p>

//                         <details>
//                           <summary style={{ fontSize: "12px" }}>
//                             Expand description
//                           </summary>
//                           <p style={{ fontSize: "12px" }}>
//                             {entry.description}
//                           </p>
//                           <div
//                             style={{
//                               display: "flex",
//                               justifyContent: "space-between",
//                             }}
//                           >
//                             <p style={{ fontSize: "12px" }}>
//                               Time: {entry.time}
//                             </p>
//                            <Button
//   type="submit"
//   variant="contained"
//   color="primary"
//   sx={{
//     mt: 2,
//     color: "#333",
//     backgroundColor: "#F9F6EE",
//     "&:hover": {
//       backgroundColor: "#F5F5F5",
//       color: "#888",
//     },
//   }}
//   onClick={() => {
//     setEditMode(true);

//     // Update form values with entry values
//     const entry = entries.find((entry) => entry.journalId === id);
//     if (entry) {
//       setSubject(entry.subject);
//       setDescription(entry.description);
//       setDate(dayjs(entry.date));
//       setTime(dayjs(`1970-01-01T${entry.time}`));
//     }
//   }}
// >
//   EDIT
// </Button>


//                             <Button
//                               variant="contained"
//                               color="primary"
//                               onClick={() => handleDelete(entry)}
//                               sx={{
//                                 mt: 2,
//                                 color: "#333",
//                                 backgroundColor: "#F9F6EE",
//                                 "&:hover": {
//                                   backgroundColor: "#F5F5F5",
//                                   color: "#888",
//                                 },
//                               }}
//                             >
//                               Delete Entry
//                             </Button>
//                           </div>
//                         </details>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </Container>
//       </div>
//     </LocalizationProvider>
//   );
// };

// export default Journal;
