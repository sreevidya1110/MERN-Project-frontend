import React from 'react';
import { useState} from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './styles.css'; // Assuming you have a styles.css file for your styles
import logo from "./logo.png";
import Axios from "axios";
import { useSearchParams, useNavigate } from 'react-router-dom';

 
const Login = () => {
  const navigate = useNavigate();
  const[data,setData]=useState({
    email:"",
    password:""
  });
  const handleChange=(e)=>{
      const value=e.target.value;
      setData({
          ...data,
          [e.target.name]:value
      });
  };
 
  const handleRedirect = () => {
    // Programmatically click the Link to navigate to the home page
   window.location.href = "/";
  };
  const handleClick = (email) => {
    navigate(`/movies?email=${email}`);
  };
  const handleSubmit=(e)=>{
      e.preventDefault();
      const userData={
          email:data.email,
          password:data.password
       
      };
      Axios.post("https://mern-project-deployment-1.onrender.com/userRoute/login",userData).then((response)=>{
          console.log("This is the response");
          console.log(response.data.message);
          if(response.data.status==200){
             
              
              
              
   
              document.getElementById("userdoesnotexist").innerHTML=response.data.message;
              document.getElementById("userexists").innerHTML="";
              
              
              
  
          }
          else{
              console.log(data.email);
              handleClick(data.email);
              //handleRedirect();
              document.getElementById("userexists").innerHTML=response.data.message;
              document.getElementById("userdoesnotexist").innerHTML="";
          }
      });
  };

  return (
    <div className="container1">
      <img src={logo} alt="Movie Ticket Booking Logo" className="logo" />
      <div className="login-box">
        <h2>Welcome to World of Cinema</h2>
        <form onSubmit={handleSubmit} action="/">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input value={data.email} onChange={handleChange} type="text" name="email" required />
            
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input value={data.password} onChange={handleChange} type="password" name="password" required />
          </div>
          <div>
            <p id="userdoesnotexist" className='text-danger'></p>
            <p id="userexists" className='text-success'></p>
          </div>
          
          <button type="submit">Login</button>
   

          <br />
          
        </form>
   
        
        <div className="text-center">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          {/* The Link component is used to navigate to the /signup route */}
        </div>
      </div>
    </div>
  );
}

export default Login;
