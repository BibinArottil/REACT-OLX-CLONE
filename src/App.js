import React,{useEffect, useContext} from 'react';
import {BrowserRouter as Router, Routes,Route,Navigate} from "react-router-dom"
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import './App.css';
import {AuthContext} from './store/FirebaseContext'
import Post from './store/PostContext'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import {getAuth ,onAuthStateChanged } from 'firebase/auth';
function App() {

  const {user,setUser} =useContext(AuthContext)

  const auth = getAuth()
  useEffect(()=>{

   onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user)
      }
    })
  })
  return (
    <div>
      <Post>
      <Router>
        <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={user? <Navigate to='/'/> :<Signup />} />
        <Route path='/login' element={user? <Navigate to='/'/> :<Login />} />
        <Route path='/create' element={<Create />} />
        <Route path='/viewpost' element={<ViewPost />} />
        </Routes>
      </Router>
      </Post>
    </div>
  );
}

export default App;
