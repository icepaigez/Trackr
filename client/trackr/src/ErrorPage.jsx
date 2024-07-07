import React from 'react';
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page" className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-xl text-gray-700 mb-4">Sorry, an unexpected error has occurred.</p>
        <p className="text-lg text-gray-600 italic">
          {error.statusText || error.message}
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}