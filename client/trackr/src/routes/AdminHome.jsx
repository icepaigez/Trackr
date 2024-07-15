import React, { useState, useEffect } from 'react'
import Header from './components/home/Header';
import TrackingDetails from './components/admin/TrackingDetails';
import { fetchAllPackages, updatePackageDetails } from '../utils/utils';
import UpdatePackage from './components/admin/UpdatePackage';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const [trackingData, setTrackingData] = useState({});
  const [selectedTracking, setSelectedTracking] = useState(null);
  const [isViewingDetails, setIsViewingDetails] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleGenerateNewTracking = () => {
    navigate('/generate');
  };

  const handleUpdatePackage = async (updatedData) => {
    try {
      await updatePackageDetails(selectedTracking, updatedData);
      // Refresh tracking data after update
      const newData = await fetchAllPackages();
      setTrackingData(newData);
      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Failed to update package:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  useEffect(() => {
    const loadTrackingData = async () => {
      const data = await fetchAllPackages();
      setTrackingData(data?.packages);
    };
    loadTrackingData();
  }, []);

  const trackingNumbers = Object.keys(trackingData);
  return (
    <>
        <Header />
        <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-bold">All Packages</h1>
          <button 
            onClick={handleGenerateNewTracking}
            className="w-full sm:w-auto bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base"
          >
            New Package
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 pr-0 md:pr-4 mb-4 md:mb-0">
            <ul className="bg-gray-100 rounded-lg">
              {Object.keys(trackingData).map((number) => (
                <li 
                  key={number} 
                  className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedTracking === number ? 'bg-gray-200' : ''}`}
                  onClick={() => {
                    setSelectedTracking(number);
                    setIsViewingDetails(true);
                  }}
                >
                  {number}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-2/3">
            {selectedTracking && (
              <div>
                {isViewingDetails ? (
                  <TrackingDetails details={trackingData[selectedTracking]} trackingNumber={selectedTracking} />
                ) : (
                  <UpdatePackage
                    initialData={trackingData[selectedTracking]}
                    onUpdate={handleUpdatePackage}
                    onCancel={() => setIsViewingDetails(true)}
                  />
                )}
                <div className="mt-4 flex justify-start">
                  <button
                    onClick={() => setIsUpdateModalOpen(true)}
                    className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    Update Package
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {isUpdateModalOpen && (
          <UpdatePackage
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            initialData={trackingData[selectedTracking]}
            onUpdate={handleUpdatePackage}
          />
        )}
    </div>
    </>
  )
}

export default AdminHome