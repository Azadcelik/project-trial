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
const user = useSelector(state => state.session.user || {})
console.log('productiso in navigation var haho', products)


useEffect(() => { 
  dispatch(getFavoriteThunk())
},[dispatch])





return (

  <div className="main-div">
    <NavLink to="/product">
      <i className="fa-solid fa-car">Carsy</i>
    </NavLink>
       <div className="second-sub-main">
        {user.id && <NavLink to='/orders'>My Orders</NavLink>}
        {user.id && <NavLink to='/my-products'>My Cars</NavLink>}
        {user.id && <NavLink to='/product/new'>Sell/Trade</NavLink>}
        <NavLink to='/product/favorite'>
            <FaHeart  style={{color: 'red', fontSize: '25px'}}/>
            <span style={{ fontSize: '12px'}}>{fav.length}</span> 
        </NavLink>
          <NavLink to='/shopping-cart'>
            <i className="fa-solid fa-cart-shopping" style={{fontSize: '30px', cursor: 'pointer'}}></i>
          <span style={{ fontSize: '12px'}}>{products.length}</span> 
          </NavLink>
        <ProfileButton />
    <AddToShoppingCart />
    </div>
  </div>
);
}

export default Navigation;
