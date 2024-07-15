import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './routes/Home.jsx';
import ErrorPage from './ErrorPage.jsx';
import Track from './routes/Track.jsx';
import AdminHome from './routes/AdminHome.jsx';
import GenerateTrackingNumber from './routes/Generate.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/package-details",
    element: <Track />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/generate",
    element: <GenerateTrackingNumber />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <AdminHome />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
