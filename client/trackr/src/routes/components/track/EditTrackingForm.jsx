import React, { useState } from 'react';

const EditTrackingForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    trackingNumber: initialData.trackingNumber,
    status: initialData.status,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Edit Tracking Information</h2>
      <div>
        <label className="block mb-1">Tracking Number:</label>
        <input
          type="text"
          name="trackingNumber"
          value={formData.trackingNumber}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block mb-1">Status:</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
      </div>
    </form>
  );
};

export default EditTrackingForm;