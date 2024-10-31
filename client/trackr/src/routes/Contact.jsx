import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Header from './components/home/Header';
import { getApiUrl } from '../config/config';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setSubmitted(true);
    e.preventDefault();
    try {
      const url = getApiUrl('/api/v0/contact/');
      const response =  await axios.post(url, { formData });
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } 
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error('Error:', error);
    }
    setSubmitted(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden font-sans">
      <div className="flex h-full grow flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col md:flex-row justify-between items-start">
            {/* Contact Information */}
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
              {/* <h2 className="text-2xl md:text-3xl font-bold text-[#2C7A7B] mb-4">How can we help you?</h2> */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Contact us</h1>
              <p className="text-lg text-gray-600 mb-8">
                We're here to help and answer any questions you might have. We look forward to hearing from you!
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2C7A7B] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>3, Bish. (Dr) Festus Odusola St, Freedom Gate Bustop, Idimu-Ikotun road, Lagos</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2C7A7B] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+2348143451317, +2347036677412</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#2C7A7B] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:contact@18morningstar.com" className="text-[#2C7A7B] hover:underline">contact@18morningstar.com</a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                >
                  { submitted ? 'Sending...' : 'Send Message' }
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;