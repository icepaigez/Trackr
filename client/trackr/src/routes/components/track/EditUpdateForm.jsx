import React, { useState } from 'react';
 
const EditUpdateForm = ({ initialData, onSubmit, onCancel, updateTimestamp }) => {
  const [formData, setFormData] = useState({
    status: initialData.status || '',
    arrived: {
      location: initialData.arrived?.location || '',
      time: initialData.arrived?.time || '',
    },
    departed: {
      location: initialData.departed?.location || '',
      time: initialData.departed?.time || '',
    },
    details: initialData.details || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prevData => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, true, updateTimestamp);
  };
 
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Edit Update Information</h2>
      <div>
        <label className="block mb-1">Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="">Select a status</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Delayed">Delayed</option>
          <option value="Returned">Returned</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Arrived Location:</label>
        <input
          type="text"
          name="arrived.location"
          value={formData.arrived.location}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block mb-1">Arrived Time:</label>
        <input
          type="text"
          name="arrived.time"
          value={formData.arrived.time}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block mb-1">Departed Location:</label>
        <input
          type="text"
          name="departed.location"
          value={formData.departed.location}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block mb-1">Departed Time:</label>
        <input
          type="text"
          name="departed.time"
          value={formData.departed.time}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block mb-1">Details:</label>
        <textarea
          name="details"
          value={formData.details}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          rows="3"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
      </div>
    </form>
  );
};

export default EditUpdateForm;