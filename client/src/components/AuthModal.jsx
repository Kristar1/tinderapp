import React from "react";
import { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import play from '../images/playstore.webp'
import { Icon } from '@iconify/react';
import Loading from "./Loading";
 


const AuthModal = ({ setShowModal, isSignUp, setIsSignUp , setLoading}) => {
  let navigate= useNavigate();
  const [email, setEmail] = useState('')
const [name, setName] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [cookies, setCookie, removeCookie]= useCookies(['user'])
const [error, setError] = useState(false);


const handleClick = () => {
    setShowModal(false);
   
  };


  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (isSignUp && (password !== confirmPassword)){
      setError("Passwords need to match")
      return;
      }
 const response= await  axios.post(`/${isSignUp ? 'signup' : 'login' }`,{email,password})
     setCookie('AuthToken', response.data.token)
     setCookie('UserId', response.data.userId)
     
     const success = response.status === 201;
     if(success && isSignUp)navigate('/onboarding')
     if(success && !isSignUp)navigate('/dashboard')
     setLoading(false)
  window.location.reload();

  } catch (error) {
     console.log(error) 
  }
  };
  return (
    <>
     
    <div className="auth-modal">
      <div className="cross" onClick={handleClick}>
        
        <div className="circle" ><Icon className="cross" icon="akar-icons:cross" /></div>
      </div>
      <Icon  className="loggo" icon="cib:tinder" width="30" height="30" />
      <h1>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h1>
      <p className="terms">
        By clicking Log In, you agree to our terms.Learn how we process our data
        in our Privacy Policy and Cookie Policy
      </p>
      <form onSubmit={handleSubmit}>
          <input type="email"id="email" name="email" placeholder="Your Email" required={true} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password"id="password" name="password" placeholder="Password" required={true} onChange={(e)=>setPassword(e.target.value)} />
{ isSignUp &&  <input type="password"id="password-check" name="password-check" placeholder="Confirm Password" required={true} onChange={(e)=>setConfirmPassword(e.target.value)} />}
          <input  className="secondary-button" type="submit" />
          <p>{error }</p>
          </form>
          <hr />
          <h2 className="bold">GET THE APP!</h2>
          <div className="stores">
              <img src={play} alt=""  className="store"/>
              <img src="https://tinder.com/static/build/d256a5b510a685030be375c63a9010e9.webp" alt="" className="applestore"/>
          </div>
    </div>
    </>
  );
};

export default AuthModal;
