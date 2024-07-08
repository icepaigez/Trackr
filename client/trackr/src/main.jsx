import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './routes/Home.jsx';
import ErrorPage from './ErrorPage.jsx';
import Track from './routes/Track.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/track-package",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Track />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
