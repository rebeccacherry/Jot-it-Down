import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';  


const Admin = () => {

return (
  <div style={{margin: 40}}>
    <h1> Welcome to the Admin Pages </h1>

   
    <Link to={`/admin/shops`} style={{margin: 10}} > Modify Shop </Link>


  </div>
)
}

export default Admin;
