import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'


const MatchesDisplay = ({matches, setClickedUser}) => {
const [matchedProfiles, setMatchedProfiles] = useState(null);

  const matchedUserIds= matches.map(({user_id})=>user_id)

  console.log(matchedUserIds)

const getMatches= async()=>{
  try{
    const response= await axios.get('/users', {
      params: {userIds : JSON.stringify(matchedUserIds)}
    }) 
  setMatchedProfiles(response.data)

  }catch(error){
    console.log(error);
  }
}

useEffect(()=>{
  getMatches();
}, [])

  return (
    <div className='matches-display'>
  {matchedProfiles?.map((match)=>(
    <div key={match.user_id} className='match-card' onClick={()=>setClickedUser(match)}>
<div className="img-container">
  <img src={match.url}  />
</div>
<h3>{match?.First_name}</h3>

    </div>
  ))}

    </div>
  )
}

export default MatchesDisplay