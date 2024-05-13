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
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserprofilePage from './pages/UserprofilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import AdminHome from './pages/AdminHome';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrderPage from './pages/AdminOrderPage';



const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected>
          <Home></Home>
      </Protected>),
  },
   {
    path: "/admin",
    element: (<ProtectedAdmin>
        <AdminHome/>
      </ProtectedAdmin>),
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
    path: "/admin/product-details/:id",
    element:(<ProtectedAdmin>
      <AdminProductDetailsPage/>
    </ProtectedAdmin>),
  },
     {
    path: "/admin/product-form/edit/:id",
    element:(<ProtectedAdmin>
       <AdminProductFormPage/>
    </ProtectedAdmin>),
  },
   {
    path: "/admin/product-form/",
    element:(<ProtectedAdmin>
      <AdminProductFormPage/>
    </ProtectedAdmin>),
  },
  {
    path: "/admin/orders/",
    element:(<ProtectedAdmin>
      <AdminOrderPage/>
    </ProtectedAdmin>),
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
    path: "/logout",
    element:<Logout></Logout>
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
   const userChecked = useSelector(selectUserChecked);

  useEffect(()=>{
    dispatch(checkAuthAsync())
  }, [dispatch])
  
  useEffect(()=>{
    if(user)
    {
      dispatch(fetchItemsByUserIdAsync())
    // we can get req.user by token on backend so no need to give it on frontend
      dispatch(fetchLoggedInUserAsync())
    }
  },[dispatch,user])
  return (
    <div className="App">
      {userChecked &&<RouterProvider router={router}></RouterProvider>}
    </div>
  );
}

export default App;
