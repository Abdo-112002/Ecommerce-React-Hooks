import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import * as serviceWorkerRegistration from './serviceWorkerRegistration';


import Checkout from './pages/Checkout';
import Details from './pages/Details';
import Home from './pages/Home';
import OrdersList from './pages/OrdersList';
import Root from './routes/Root';
import PageNotFound from './pages/PageNotFound';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement : <PageNotFound/>,
      children : [
        {
            index : true ,
            element : <Home/>
        },
        {
            path : 'details/:product_Id',
            element : <Details/>,
            loader : ({params}) => {
              if(isNaN(params.product_Id)) {
                throw new Response("Bade Request",{status : 400, statusText : "this product id is not found"})
              }
              return null;
            },
        },
        {
          path : 'orders_list',
          element : <OrdersList/>,
          children : [
            {
              path : "checkout",
              element : <Checkout/>,
            },
          ]
        },
      ]
    },
],{
  // basename={process.env.PUBLIC_URL}
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);


serviceWorkerRegistration.register();