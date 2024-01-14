import React from 'react';
import { Link } from 'react-router-dom';  


const NotAdmin = () => {

return (
  <div>
    <h2 style={{margin: 40}}> You're not a registered administrator. Please log in with your admin user name or password, </h2>
    <Link to='/home' style={{margin:40}}>Home</Link>
  </div>
)
}

export default NotAdmin;
