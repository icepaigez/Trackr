import React, { useState, useEffect } from 'react';

const UpdatePackage = ({ isOpen, onClose, initialData, onUpdate, lastLocation, isEdit }) => {
  const [formData, setFormData] = useState({
    currentLocation: '',
    arrivalDate: '',
    departureDate: '',
    status: '',
    description: '',
    // Add more fields as needed for editing
    sender: '',
    recipient: '',
    weight: '',
    dimensions: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        currentLocation: initialData.currentLocation || '',
        arrivalDate: initialData.arrivalDate || '',
        departureDate: initialData.departureDate || '',
        status: initialData.status || '',
        description: initialData.description || '',
        // Add more fields for editing
        sender: initialData.sender || '',
        recipient: initialData.recipient || '',
        weight: initialData.weight || '',
        dimensions: initialData.dimensions || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData, isEdit);
  };

  const isFormValid = () => {
    if (isEdit) {
      return true; // Always valid for edit mode
    } else {
      // For update mode, check if all fields are filled
      const requiredFields = ['currentLocation', 'arrivalDate', 'departureDate', 'status', 'description'];
      return requiredFields.every(field => formData[field].trim() !== '');
    }
  };

  const handleCancel = () => {
    if (isEdit) {
      // For edit mode, reset form data to initial values
      setFormData({
        currentLocation: initialData.currentLocation || '',
        arrivalDate: initialData.arrivalDate || '',
        departureDate: initialData.departureDate || '',
        status: initialData.status || '',
        description: initialData.description || '',
        sender: initialData.sender || '',
        recipient: initialData.recipient || '',
        weight: initialData.weight || '',
        dimensions: initialData.dimensions || '',
      });
    }
    // Call the onClose function passed from the parent
    onClose();
  };

  if (!isOpen && !isEdit) return null;

  return (
    <div className={`${isEdit ? '' : 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto'} h-full w-full z-50 flex items-center justify-center`} id="my-modal">
      <div className={`${isEdit ? 'w-full' : 'relative top-5 md:top-0 mx-auto'} p-5 border w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-lg rounded-md bg-white my-4 mx-4 max-h-[90vh] overflow-y-auto`}>
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mb-4">
            {isEdit ? 'Edit Package' : 'Update Package'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isEdit ? (
              // Edit mode fields
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sender">
                    Sender
                  </label>
                  <input
                    type="text"
                    name="sender"
                    value={formData.sender}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
                    Recipient
                  </label>
                  <input
                    type="text"
                    name="recipient"
                    value={formData.recipient}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dimensions">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              </>
            ) : (
              // Update mode fields
              <>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentLocation">
                    Current Location
                  </label>
                  <input
                    type="text"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrivalDate">
                    Arrival Date @ Location
                  </label>
                  <input
                    type="date"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastLocation">
                    Last Location
                  </label>
                  <input
                    type="text"
                    name="lastLocation"
                    readOnly={true}
                    placeholder={lastLocation}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departureDate">
                    Departure Date from Location
                  </label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select Status</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                  ></textarea>
                </div>
              </>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                type="submit"
                disabled={!isEdit && !isFormValid()}
                className={`w-full sm:w-auto font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isEdit || isFormValid()
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isEdit ? 'Save Changes' : 'Update'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePackage;