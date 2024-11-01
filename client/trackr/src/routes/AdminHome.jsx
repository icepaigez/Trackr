import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Header from './components/home/Header';
import TrackingDetails from './components/admin/TrackingDetails';
import UpdatePackage from './components/admin/UpdatePackage';
import EditTrackingForm from './components/track/EditTrackingForm';
import EditPackageForm from './components/track/EditPackageForm';
import EditUpdateForm from './components/track/EditUpdateForm';
import { fetchAllPackages, updatePackageDetails, deleteUpdate } from '../utils/utils';
import { getApiUrl } from '../config/config';
import { useAuth } from '../context/AuthContext';

const AdminHome = () => {
  const [trackingData, setTrackingData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [selectedTracking, setSelectedTracking] = useState(null);
  const [isViewingDetails, setIsViewingDetails] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [lastLocation, setLastLocation] = useState(null);
  const [lastLocationDepartureDate, setlastLocationDepartureDate] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteSection, setDeleteSection] = useState([]);

  const navigate = useNavigate();
  const { userRole, logout } = useAuth();

  const handleGenerateNewTracking = () => {
    navigate('/generate');
  };
 
  const getLastLocation = async (trackingNumber) => { 
    try {
      let url = getApiUrl('/api/v0/track/get-package');
      const response = await axios.post(url, { trackingNumber });
      const { data, status } = response;
      if (status === 200) {
        setLastLocation(data?.lastLocation);
        setlastLocationDepartureDate(data?.date);
      }
    } catch(err) {
      console.error('Failed to get last location:', err);
    }
  };
 
  const handleUpdatePackage = async (updatedData, isEdit = false, timestamp = null) => {
    try {
      const response = await updatePackageDetails(selectedTracking, updatedData, lastLocation, isEdit, timestamp, lastLocationDepartureDate);
      if (response.status === 200) {
        toast.success(isEdit ? 'Package edited successfully!' : 'Package updated successfully!');
        // Refresh tracking data after update
        const newData = await fetchAllPackages();
        setTrackingData(newData?.packages);
        setFilteredData(newData?.packages);
        setIsUpdateModalOpen(false);
        setIsEditing(false);
        setIsViewingDetails(true);
        setEditingSection(null);
      }
    } catch (error) {
      console.error('Failed to update package:', error);
      toast.error(`Failed to ${isEdit ? 'edit' : 'update'} package. Please try again.`);
    }
  };


  const handleLogout = async () => {
    await logout();
    navigate('/login'); 
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setInputValue(value);
    
    const filtered = Object.entries(trackingData).reduce((acc, [number, details]) => {
      if (
        details?.created?.sender?.toLowerCase().includes(value) || 
        details?.created?.recipient?.toLowerCase().includes(value)
      ) {
        acc[number] = details;
      }
      return acc;
    }, {});
    
    if (Object.keys(filtered).length === 0) {
      let trackingNumbers = Object.keys(trackingData);
      let keysToFilter = trackingNumbers.filter(trackingNumber => trackingNumber.toLowerCase().includes(value));  
      const filteredObj = Object.fromEntries(
        Object.entries(trackingData).filter(([key]) => 
          keysToFilter.map(k => k.toLowerCase()).includes(key.toLowerCase())
        )
      );
      setFilteredData(filteredObj);
    } else {
      setFilteredData(filtered);
    }
  };
 
  const handleEditSection = (section) => {
    if (userRole === 'admin') {
      setEditingSection(section);
      setIsEditing(true);
      setIsViewingDetails(false);
    } else {
      toast.error('You do not have permission to edit this section!');
      return
    }
  };

  const handleDeleteSection = (section, trackingNumber) => {
    if (userRole === 'admin') {
      setShowConfirmModal(true)
      setDeleteSection([section, trackingNumber])
    } else {
      toast.error('You do not have permission to delete this section!');
      return
    }
  }


  const renderEditForm = () => {
    const packageData = filteredData[selectedTracking];
    switch (editingSection) {
      case 'tracking':
        return (
          <EditTrackingForm
            initialData={packageData}
            onSubmit={(updatedData) => handleUpdatePackage(updatedData, true)}
            onCancel={() => {
              setIsEditing(false);
              setIsViewingDetails(true);
              setEditingSection(null);
            }}
          />
        );
      case 'package':
        return (
          <EditPackageForm
            initialData={packageData.created}
            onSubmit={(updatedData) => handleUpdatePackage(updatedData, true)}
            onCancel={() => {
              setIsEditing(false);
              setIsViewingDetails(true);
              setEditingSection(null);
            }}
          />
        );
      default:
        if (editingSection?.startsWith('update-')) {
          const updateTimestamp = editingSection.split('-')[1];
          return ( 
            <EditUpdateForm
              initialData={packageData[updateTimestamp]}
              onSubmit={handleUpdatePackage}
              onCancel={() => {
                setIsEditing(false);
                setIsViewingDetails(true);
                setEditingSection(null);
              }}
              updateTimestamp={updateTimestamp}
            />
          );
        }
        return null;
    }
  };

  useEffect(() => {
    const loadTrackingData = async () => {
      const data = await fetchAllPackages();
      setTrackingData(data?.packages);
      setFilteredData(data?.packages);
    };
    loadTrackingData();
  }, []);

  return (
    <>
      <Header btnText='Log out' func={handleLogout} />
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
        <div className='my-4 md:w-1/3 pr-0 md:pr-4'>
          <label className="flex flex-col !h-10">
            <div className="flex w-full flex-1 items-stretch h-full">
              <div className="text-[#637588] flex border-none bg-[#f0f2f4] items-center justify-center pl-4 rounded-lg" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <input
                placeholder="Sender Name"
                className="form-input flex flex-1 resize-none overflow-hidden rounded-lg text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-full placeholder:text-[#637588] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          </label>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 pr-0 md:pr-4 mb-4 md:mb-0">
            <ul className="bg-gray-100 rounded-lg">
              {filteredData && Object.keys(filteredData).map((number) => (
                <li 
                  key={number} 
                  className={`p-2 cursor-pointer hover:bg-gray-200 ${selectedTracking === number ? 'bg-gray-200' : ''}`}
                  onClick={() => {
                    setSelectedTracking(number);
                    setIsViewingDetails(true);
                    setIsEditing(false);
                    setEditingSection(null);
                  }}
                >
                  {number}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-2/3">
            {selectedTracking && filteredData[selectedTracking] && (
              <div>
                {isViewingDetails ? (
                  <>
                    <TrackingDetails 
                      details={filteredData[selectedTracking]} 
                      trackingNumber={selectedTracking} 
                      onEditSection={handleEditSection}
                      onDeleteSection={handleDeleteSection}
                    />
                    <div className="mt-4 flex justify-start space-x-4">
                      <button
                        onClick={() => {
                          setIsUpdateModalOpen(true);
                          getLastLocation(selectedTracking);
                        }}
                        className="px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-600 text-white"
                      >
                        Update Package
                      </button>
                    </div>
                  </>
                ) : isEditing ? (
                  renderEditForm()
                ) : null}
              </div>
            )}
          </div>
        </div>

        {isUpdateModalOpen && (
          <UpdatePackage
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            initialData={filteredData[selectedTracking]}
            onUpdate={handleUpdatePackage}
            lastLocation={lastLocation}
            isEdit={false}
            lastLocationDepartureDate={lastLocationDepartureDate}
          />
        )}

        {/* Confirmation modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md md:w-2/3 lg:w-1/2 text-center">
            <p className="text-lg font-semibold mb-4">This is an irreversible action, are you absolutely sure?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  deleteUpdate(deleteSection[0], deleteSection[1])
                    .then(r => {
                      if (r.status === 200) {
                        setShowConfirmModal(false)
                        const loadTrackingData = async () => {
                          const data = await fetchAllPackages();
                          setTrackingData(data?.packages);
                          setFilteredData(data?.packages);
                        };
                        loadTrackingData();
                        toast.success(r?.data?.message)
                        return;
                      }
                      toast.error("An error occurred, please try again!.")
                    })
                  
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminHome;