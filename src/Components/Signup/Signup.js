import React, { useState, useContext} from 'react';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/FirebaseContext';
import './Signup.css';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { app } from '../../firebase/config';
import { getFirestore } from "firebase/firestore";
import {Link, useNavigate} from 'react-router-dom'
import {collection, addDoc} from 'firebase/firestore'
// import { async } from '@firebase/util';


export default function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setemail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  // const {firebase} =useContext(FirebaseContext)
  const auth = getAuth(app)
  const db = getFirestore(app);


  const handleSubmit = (e)=>{
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password).then(async(cred)=>{
     await updateProfile(auth.currentUser,{displayName:username}).then(()=>{
        addDoc(collection(db, 'users'), {
          id: cred.user.uid,
          username: username,
          phone: phone,
        }).then(()=>{
          navigate('/login')
        })
      })
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=""></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button onClick={handleSubmit}>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
