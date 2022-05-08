import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import {useCookies} from 'react-cookie'
import TinderCard from "react-tinder-card";
import ChatContainer from '../components/ChatContainer'



const Dashboard = ({setLoading}) => {
  const [user, setUser] = useState(null);
const [cookies, setCookie, removeCookie]= useCookies(['user']);
const [genderedUsers, setGenderedUsers] = useState([])
const userId = cookies.UserId;

console.log('user',user)
const getUser= async () => {
setLoading(true)
  try{
   const response=  await axios.get('/user', {
      params:{userId}
    } )
    setUser (response.data);
setLoading(false)
  }catch(error){

console.log(error)
  }
}

const getGenderedUsers= async()=>{
try {
  if(user?.gender_interest === 'everyone'){
  const response= await axios.get('/everyone')
  
  setGenderedUsers(response.data)
  }
  else{

    const response= await axios.get('/gendered-users',{
      params:{gender: user?.gender_interest}
  })

  setGenderedUsers(response.data)

  }


} catch (error) {
  console.log(error)
}
}
const matchedUserIds= user?.matches.map(({user_id})=> user_id).concat(userId)
const filteredGenderedUsers= genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser?.user_id))

useEffect(() => {
  getUser()

}, []);

useEffect(() => {
  if (user) {
      getGenderedUsers()
  }
}, [user]);

const updateMatches= async(matchedUserId)=>{
try{
  await axios.put('/addmatch' ,{
    userId,matchedUserId
  });
  getUser()
}catch(error){
  console.log(error)
}
}

    const [lastDirection,setLastDirection ] = useState();

    const swiped = (direction, swipedUserId) => {
      if(direction === 'right'){
        setLoading(true)
        updateMatches(swipedUserId);
        window.location.reload();

        setLoading(false)


      }
      setLastDirection(direction)
    }
  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }

  return (
    <>
    {user && 
    <div className="dashboard">
      <ChatContainer user={user} />
      <div className="swiper-container">
        <div className="card-container">
        {filteredGenderedUsers.map((genderedUser) =>
          <TinderCard 
          className='swipe' 
          key={genderedUser.user_id}
           onSwipe={(dir) => swiped(dir, genderedUser.user_id)} 
           onCardLeftScreen={() => outOfFrame(genderedUser.First_name)}>

            <div style={{ backgroundImage: 'url(' + genderedUser.url + ')' }} className='card'>

              <h3>{genderedUser.First_name}</h3>
            </div>
          </TinderCard>
        )}
        <div className="swipe-info">
            {lastDirection? <p>You swiped {lastDirection}</p> : <p/>}
            </div>
            </div>
      </div>
    </div>
    }
    </>
  );
};

export default Dashboard;
