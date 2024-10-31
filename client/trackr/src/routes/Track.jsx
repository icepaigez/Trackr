import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/home/Header';
import PackageDetails from './components/track/PackageDetails';
import Loader from './components/Loader';
import { getApiUrl } from '../config/config';

const Track = () => {
  const location = useLocation();
  //const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState(location.state?.trackingNumber || '');
  const [trackingData, setTrackingData] = useState(location.state?.trackingData);
  const [loading, setLoading] = useState(false);

  const handleTrackingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let url = getApiUrl('/api/v0/track/track-package');
      const response = await axios.post(url, { trackingNumber });
      const { data, status } = response;
      if (status === 200) {
        setTrackingData(data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-white font-sans overflow-x-hidden">
      <div className="flex h-full grow flex-col">
        <Header />
        <div className="px-4 sm:px-8 md:px-16 lg:px-40 flex flex-1 justify-center py-5">
          {trackingData ? (
            <PackageDetails data={trackingData} />
          ) : (
            <div className="layout-content-container flex flex-col md:max-w-[360px] w-full">
              <h1 className="text-[#111418] text-3xl font-bold mb-4">Track Your Package</h1>
              <form onSubmit={handleTrackingSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                  className="p-2 border rounded"
                />
                <button
                  type="submit"
                  disabled={!trackingNumber || loading}
                  className="bg-emerald-500 text-white p-2 rounded disabled:bg-gray-300"
                >
                  {loading ? <Loader /> : 'Track Package'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Track;