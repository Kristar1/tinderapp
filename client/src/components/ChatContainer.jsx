import React from 'react'
import ChatDisplay from './ChatDisplay'
import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import { useState } from 'react'

const ChatContainer = ({user}) => {

const [clickedUser, setClickedUser] = useState(null)
console.log(clickedUser)
  return (
    <div className='chat-container'>
    
      <ChatHeader user={user}/>
      <div>
        <button className='options' onClick={()=>setClickedUser(null)}>Matches</button>
        <button className='options' disabled={!clickedUser}>Chats</button>
      </div>
{  !clickedUser &&    <MatchesDisplay matches={user?.matches} setClickedUser={setClickedUser}/>}
{   clickedUser &&   <ChatDisplay user={user} clickedUser={clickedUser} setClickedUser={setClickedUser} />
}
    </div>
  )
}

export default ChatContainer