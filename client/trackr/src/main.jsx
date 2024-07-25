import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './routes/components/ProtectedRoute.jsx';
import Home from './routes/Home.jsx';
import ErrorPage from './ErrorPage.jsx';
import Track from './routes/Track.jsx';
import AdminHome from './routes/AdminHome.jsx';
import GenerateTrackingNumber from './routes/Generate.jsx';
import Signup from './routes/Signup.jsx';
import Login from './routes/Login.jsx';
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/track",
    element: <Track />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/generate",
    element: (
      <ProtectedRoute>
        <GenerateTrackingNumber />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminHome />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/msexpress",
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
