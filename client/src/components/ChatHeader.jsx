import React from 'react'
import { Icon } from '@iconify/react';
import { Link,  } from 'react-router-dom';
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'



const ChatHeader = ({user}) => {
  const [cookies, setCookie, removeCookie]= useCookies(['user']);
  let navigate= useNavigate();



  const logout=()=>{
removeCookie('UserId', cookies.UserId);
  removeCookie('AuthToken', cookies.AuthToken);
  navigate('/')
  window.location.reload();

  }
  return (
    <div className='chat-container-header'>
        <div className="profile">
              <Link to='/profile'>
            <div className="img-container">
                <img src={user.url}  alt="" />
                </div>
                <h3>{user.First_name}</h3>
                </Link>
            </div>
            <Link to='/'>

            <Icon icon="carbon:logout"  className='log-out-icon' onClick={logout}/>
            </Link>
        </div>
  )
}

export default ChatHeader