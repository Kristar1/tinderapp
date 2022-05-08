import React from 'react'
import tinder from '../images/tinder.png'
import logo from '../images/logo.png'

const Nav = ({authToken, minimal, setShowModal, showModal, isSignUp, setIsSignUp}) => {

  const handleClick= ()=>{
    setShowModal(true)
    setIsSignUp(false)
}

  return (
    <nav>
      <div className="logo-container">
        <img src={ !minimal? logo : tinder} alt="" className='logo' />
        </div>
       {!authToken && !minimal &&<button className='nav-button' onClick={handleClick} disabled={showModal}> Log in </button>}
    </nav>
  )
}

export default Nav