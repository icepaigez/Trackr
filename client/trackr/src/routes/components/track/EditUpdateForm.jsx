import React, { useState } from 'react';

const EditUpdateForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    status: initialData.status,
    arrived: initialData.arrived.location,
    departed: initialData.departed.location,
    details: initialData.details,
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
      <h2 className="text-xl font-bold mb-4">Edit Update Information</h2>
      <div>
        <label className="block mb-1">Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Delayed">Delayed</option>
        </select>
      </div>
      <div>
        <label className="block mb-1">Arrived:</label>
        <input
          type="text"
          name="arrived"
          value={formData.arrived}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div>
        <label className="block mb-1">Departed:</label>
        <input
          type="text"
          name="departed"
          value={formData.departed}
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