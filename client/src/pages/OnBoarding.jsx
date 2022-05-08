import React from "react";
import { useState } from "react";
import Nav from "../components/Nav";
import {useCookies} from 'react-cookie'
import { useNavigate } from "react-router-dom";
import axios from "axios";


const OnBoarding = () => {
  const [cookies, setCookie, removeCookie]= useCookies(['user'])
  const navigate= useNavigate();
const [formData, setformData] = useState({
    user_id:cookies.UserId,
    first_name:"",
    dob:'',
    show_gender:false,
    gender_identity:'man',
    gender_interest:'woman',
    url:'',
    about:'',
    matches:[]
})




  const handleSubmit =  async(e) => {
    e.preventDefault();
    console.log("form submitted");


    try {
     const response= await  axios.put(`/user` , {formData});
     const success = response.status === 200;
     if(success) navigate('/dashboard')


    } catch (error) {
      console.log(error)
    }
  };



  const handleChange = (e) => {
    // console.log('e', e);
   const value= e.target.type==='checkbox'? e.target.checked : e.target.value;
   const name=e.target.name;
//    console.log('value: '+ value, 'name: ' + name)

   setformData((prevState)=>({
...prevState,
[name] : value
   }))
   console.log(formData)
  };
  return (
    <>
      <Nav minimal={true} setShowModal={() => {}} showModal={true} />

      <div className="onboarding">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required
              value={formData.first_name}
              onChange={handleChange}
            />
            <label> Birthday</label>
            <input
              id="dob"
              type="date"
              name="dob"
              required
              value={formData.dob}
              
              onChange={handleChange}
            />

            <label> Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity" 
                value="man"
                checked={formData.gender_identity==='man'}
                onChange={handleChange}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value="woman"
                checked={formData.gender_identity==='woman'}
                onChange={handleChange}
              />
              <label htmlFor="woman-gender-identity">Woman</label>

              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value="more"
                checked={formData.gender_identity==='more'}
                onChange={handleChange}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>
            <label htmlFor="show-gender">Show gender on my profile</label>
            <input
                id="show-gender"
                type='checkbox'
                name="show_gender"
                checked={formData.show_gender }
                onChange={handleChange}
              />

            <label >Show Me</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value="man"
                checked={formData.gender_interest === 'man'}
                onChange={handleChange}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value="woman"
                checked={formData.gender_interest === 'woman'}
                onChange={handleChange}
              />
              <label htmlFor="woman-gender-interest">Woman</label>

              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                value="everyone"
                checked={formData.gender_interest === 'everyone'}
                onChange={handleChange}
              />
              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>

            <label htmlFor="about">About Me</label>
            <input type="text"  id="about" name="about" required placeholder="I like long walks..." value={formData.about} onChange={handleChange}  />
            <input type="submit" />
          </section>
          <section>
            <label htmlFor="url">Profile Photo</label>
            <input type="url" placeholder="Image Url" name="url" id="url" onChange={handleChange}  value={formData.url} required/>
            <div className="photo-container">
                {formData.url && <img src={formData.url} />}


            </div>

          </section>
        </form>
      </div>
    </>
  );
};

export default OnBoarding;
