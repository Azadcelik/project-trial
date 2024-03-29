import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllProduct from '../components/AllProduct';
import CreateProduct from '../components/CreateProduct';
import OneProduct from '../components/OneProduct';
import UpdateProduct from '../components/UpdateProduct';
import GetFavorite from '../components/GetFavorite';
import GetShoppingCart from '../components/AddToShoppingCart/GetShoppingCart';
import Order from '../components/Order';
import Address from '../components/Adress';
import MyProduct from '../components/MyProducts';
import LandingPage from '../components/LandingPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/product",
        element: <AllProduct />
      },
      {
        path: "/product/new",
        element: <CreateProduct />
      },
      {
        path: "/product/:id",
        element: <OneProduct />
      },
      {
        path: "/product/:id/update",
        element: <UpdateProduct />
      },

      {
        path: "/product/favorite",
        element : <GetFavorite />
      },
      {
        path: "/shopping-cart",
        element: <GetShoppingCart />
      },
      {
        path: "/orders",
        element : <Order />
      },
      {
        path: "/adress",
        element : <Address />
      },
      {
        path: "/my-products",
        element: <MyProduct />
      }
    ],
  },
]);