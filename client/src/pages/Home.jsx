import React from 'react'
import Nav from '../components/Nav';
import { useState } from 'react';
import AuthModal from '../components/AuthModal';

const Home = ({setLoading}) => {
const [showModal, setShowModal] = useState(false);
const [isSignUp, setIsSignUp] = useState(true)



    const handleClick= ()=>{
        console.log('clicked')
        setShowModal(true)
        setIsSignUp(true)
    }

    const authToken= false;
    const minimal= false;
  return (
      <div className='overlay'>
      <Nav authToken={authToken} minimal={minimal} setShowModal={setShowModal} showModal={showModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    <div className='home'>
        <h1 className='primary-title'>Swipe Right</h1>
        <button className='primary-button' onClick={handleClick}>{authToken ? 'signOut':'create account' }</button>

        {showModal && (
        <AuthModal setShowModal={setShowModal} showModal={showModal}   isSignUp={isSignUp} setIsSignUp={setIsSignUp} setLoading={setLoading} />

        )}
    </div>
    </div>
  )
}

export default Home