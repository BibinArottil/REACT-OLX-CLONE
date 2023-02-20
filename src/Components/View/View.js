import React,{useEffect,useState,useContext} from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';
import { PostContext } from '../../store/PostContext';
import { collection, query, where, getDocs ,getFirestore } from "firebase/firestore";
import './View.css';

function View() {
  const [userDetails, setUserDetails] = useState({})
  const {postDetails} = useContext(PostContext)
  const {Firebase} = useContext(FirebaseContext)
  const db = getFirestore(Firebase)

  // useEffect(()=>{
  //   const {userId} = postDetails
  //   getDocs(collection(db, "users")).where('id','===',userId).get().then((res)=>{
  //     res.forEach(doc=>{
  //       setUserDetails(doc.data())
  //     })
  //     console.log(res);
  //         }).catch((error)=>{
  //           console.log(error.message);
  //         })
  // },[])

  useEffect(()=>{
    const view  = async()=>{
      const { user } = postDetails
      const userCollectionRef = collection(db, "users");
      const queryFromUser  =  query(userCollectionRef, where("id", "==", user));
      const querySnapshot =  await getDocs(queryFromUser);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUserDetails(doc.data())
      });
    }
    
    view()
  },[])
  
    return (
      <div className="viewParentDiv">
        <div className="imageShowDiv">
          <img
            src={postDetails.imageurl}
            alt=""
          />
        </div>
        <div className="rightSection">
          <div className="productDetails">
            <p>&#x20B9; {postDetails.price} </p>
            <span>{postDetails.category} </span>
            <p>{postDetails.name} </p>
            <span>{postDetails.createdAt} </span>
          </div>
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        </div>
      </div>
    );
}
export default View;
