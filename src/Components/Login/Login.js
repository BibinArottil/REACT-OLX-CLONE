import React,{useState, useContext} from 'react';
import { Link} from 'react-router-dom';
// import {FirebaseContext} from '../../store/FirebaseContext'
import Logo from '../../olx-logo.png';
import './Login.css';
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {useNavigate} from 'react-router-dom'

function Login() {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  // const {firebase} = useContext(FirebaseContext)
  const auth = getAuth()
  const navigate = useNavigate()

  const handleLogin=(e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth,email,password).then(()=>{
      navigate('/')
    }).catch((error)=>{
      alert(error.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt=""></img>
        <form onSubmit={handleLogin}>
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
          <button>Login</button>
        </form>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
