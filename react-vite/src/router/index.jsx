import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllProduct from '../components/AllProduct';
import CreateProduct from '../components/CreateProduct';
import OneProduct from '../components/OneProduct';
import UpdateProduct from '../components/UpdateProduct';
import GetFavorite from '../components/GetFavorite';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
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
      }
    ],
  },
]);