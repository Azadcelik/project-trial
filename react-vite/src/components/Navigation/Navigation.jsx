import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteThunk } from "../../redux/favorite";

function Navigation() {

const dispatch = useDispatch()
const [count,setCount] = useState(0)
const fav = useSelector(state => Object.values(state.favorites))


useEffect(() => { 
  dispatch(getFavoriteThunk())
  setCount(fav.length)
},[,dispatch,setCount,fav.length])



  console.log('count int count', count)
  return (
    <ul>
      <li>
        <NavLink to="/">Home {count}</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
