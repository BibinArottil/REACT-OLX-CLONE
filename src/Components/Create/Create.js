import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext, AuthContext} from '../../store/FirebaseContext'
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import { collection, addDoc ,getFirestore} from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate()
  const {Firebase} =useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const db = getFirestore(Firebase);
  const handleSubmit =async()=>{
    const date= new Date()
    const uid= Math.floor(Math.random() * 10000)
    const storage = getStorage();
    if(user){
      const storageRef =ref(storage,`/images/${image.name+uid+Date.now()}`);
      const snapshot= await uploadBytes(storageRef, image)
         console.log('Image uploaded');
         const imageurl= await getDownloadURL(snapshot.ref)
         console.log(imageurl);
       await  addDoc(collection(db,"products"),{
           user:user.uid,
           name:name,
           category:category,
           price:price,
           imageurl,
           date:date.toDateString()
         })
         console.log('product added to database')
    }else{
      console.log('Unauthorised access restricted');
    }
     navigate('/')
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          {/* <form> */}
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              id="fname"
              onChange={(e)=>setName(e.target.value)}
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              id="fname"
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input" 
            type="number" 
            value={price}
            id="fname"
            onChange={(e)=>setPrice(e.target.value)}
            name="Price" />
            <br />
          {/* </form> */}
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image): ''}></img>
          {/* <form> */}
            <br />
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          {/* </form> */}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
