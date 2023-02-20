import React,{ useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';
import {collection, getDocs, getFirestore} from 'firebase/firestore'
import './Post.css';
import Heart from '../../assets/Heart';

function Posts() {
  const navigate = useNavigate()
  const {Firebase} = useContext(FirebaseContext)
  const db = getFirestore(Firebase);
  const [products, setProducts] = useState([])
  const {setPostDetails} = useContext(PostContext)
  useEffect(()=>{
        getDocs(collection(db,"products")).then((querySnapshot)=>{
      const allpost=querySnapshot.docs.map((doc)=>{
        return{
          ...doc.data(),
          id:doc.id
        }
      })
      setProducts(allpost)
    })
  },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

          {
          products.map((product,key)=>{
        return <div key={key}
            className="card"
            // key={product.id}
            onClick={()=>{
                 setPostDetails(product)
              navigate('/viewpost')
            }}
           
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageurl} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAtd}</span>
            </div>
          </div>
        
          })
         }
 
        </div>
      </div>
      {/* <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Posts;
