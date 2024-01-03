import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteThunk } from "../../redux/favorite";
import { FaHeart } from "react-icons/fa";
import AddToShoppingCart from "../AddToShoppingCart";

function Navigation() {

const dispatch = useDispatch()
const fav = useSelector(state => Object.values(state.favorites))
const products = useSelector(state => Object.values(state.shoppingCart))
console.log('productiso in navigation var haho', products)


useEffect(() => { 
  dispatch(getFavoriteThunk())
},[dispatch])



  return (
    <>
        <NavLink to="/product">Home</NavLink>
        <div className="heart">
          <div className="heart-icon-container">
          <FaHeart  style={{color: 'red', fontSize: '25px'}}/>
           <span style={{ fontSize: '12px'}}>{fav.length}</span> 
           </div>    
           <div className="heart-icon-container">     
          <i className="fa-solid fa-cart-shopping" style={{fontSize: '30px'}}></i>
          <span style={{ fontSize: '12px'}}>{products.length}</span> 
          </div>
          <ProfileButton />
        </div>
        <AddToShoppingCart />
    </>
  );
}

export default Navigation;
