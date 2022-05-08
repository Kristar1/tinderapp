import React from 'react'
import axios from "axios";
import {useCookies} from 'react-cookie'
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'



const Profile = ({setLoading}) => {
  let navigate= useNavigate();

  const [user, setUser] = useState(null);
const [cookies, setCookie, removeCookie]= useCookies(['user']);
const [matchedProfiles, setMatchedProfiles] = useState(null);
const matches= user?.matches
const matchedUserIds= matches?.map(({user_id})=>user_id)

console.log(' matchedUserIds',  matchedUserIds)
console.log(' matches',  matches)

const userId = cookies?.UserId;
//   console.log(matchedUserIds)



  const getUser= async () => {
    try{
     const response=  await axios.get('/user', {
        params:{userId}
      } )
      setUser (response.data);
      console.log(response.data)
  
    }catch(error){
  
  console.log(error)
    }
  }

  const getMatches= async()=>{
// setLoading(true)

    try{
      const response= await axios.get('/users', {
        params: {userIds : JSON.stringify(matchedUserIds)}
      }) 
    setMatchedProfiles(response.data)
    console.log('response.data', response.data)

    }catch(error){
      console.log(error);
    }
  }
  
  

  useEffect(() => {
    getUser();

  }, [user])

  useEffect(() => {
     user && getMatches();
      
   
},[user])
  

  return (
    // <></>
    <div className='userprofile'>
        <div className="user-profile-container">
<div className="big-img-container">
    <img src={user?.url} alt="" />
</div>
<h1>{user?.First_name}</h1>
<div className="details">
<p>{user?.dob}</p>

<p>{user?.email}</p>
<p className='about'>{user?.about}</p>
</div>
{ user?.show_gender && <div className="gender"><p>{user?.gender_identity }</p></div>}
</div>

    <h2>Previous Matches</h2>
<div className="previousMatches">
  {matchedProfiles?.map((match)=>(
      <div   key={match?.user_id} className="matches-card">

    <div className="big-img-container">
    <img src={match?.url} alt="" />
</div>
<h1 className='match-name'>{match?.First_name}</h1>

{ user.show_gender && <div className="matchesGender"><p>{match?.gender_identity}</p></div>}
    <p>{match?.dob}</p>
    </div>
  ))}

</div>
    </div>

  )
}

export default Profile