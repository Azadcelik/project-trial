// import { createContext, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getFavoriteThunk } from "../../redux/favorite";

// export const CountContext = createContext();

// const CountContextComponent = ({ children }) => {
//     const dispatch = useDispatch()
//     const fav = useSelector(state => Object.values(state.favorites));
//     console.log('fav in context component', fav);

//     const [count, setCount] = useState(0);

//     // const setCountDirectly = (newCount) => setCount(newCount);

//     useEffect(() => { 
//         dispatch(getFavoriteThunk())
//         // setCountDirectly(fav.length);
//         setCount(fav.length)
//     }, [fav.length]);

//     console.log('count in context component', count);

//     return (
//         <CountContext.Provider value={{ count }}>
//             {children}
//         </CountContext.Provider>
//     );
// };

// export default CountContextComponent;