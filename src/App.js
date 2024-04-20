import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Checkout from './pages/Checkout';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';

import {
  createBrowserRouter,
  RouterProvider
 
} from "react-router-dom";
import ProductDetailsPage from './pages/ProductDetailsPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserprofilePage from './pages/UserprofilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';


const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected>
          <Home></Home>
      </Protected>),
  },
  {
    path: "/login",
    element:<LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element:<SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element:(<Protected>
      <CartPage></CartPage>
      </Protected>),
  },
  {
    path: "/checkout",
    element:(<Protected>
      <Checkout></Checkout>
    </Protected>),
  },
  {
    path: "/product-details/:id",
    element:(<Protected>
      <ProductDetailsPage></ProductDetailsPage>
    </Protected>),
  },
  {
    path: "*",
    element:<PageNotFound></PageNotFound>,
  },
  {
    path: "/order-success/:id",
    element:<OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: "/orders",
    element:<UserOrdersPage></UserOrdersPage>
  },
   {
    path: "/profile",
    element:<UserprofilePage/>
  },
]);

function App() {
  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser);
  // console.log('user->',user)
  useEffect(()=>{
    if(user)
    {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch,user])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
