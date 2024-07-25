import React, { useState } from 'react';

const EditPackageForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    origin: initialData.origin,
    destination: initialData.destination,
    estimatedDelivery: initialData.estimatedDelivery,
    shippingDate: initialData.shippingDate,
    serviceType: initialData.serviceType,
    packageType: initialData.packageType,
    weight: initialData.weight,
    sender: initialData.sender,
    recipient: initialData.recipient,
    recipientPhone: initialData.recipientPhone,
    senderPhone: initialData.senderPhone,
    length: initialData.length,
    width: initialData.width,
    height: initialData.height,
    description: initialData.description,
    recipientEmail: initialData.recipientEmail,
    senderEmail: initialData.senderEmail,
    declaredValue: initialData.declaredValue,
    specialHandling: initialData.specialHandling,
    deliveryInstructions: initialData.deliveryInstructions,
    insurance: initialData.insurance,
    billingInfo: initialData.billingInfo,
    contentsCategory: initialData.contentsCategory,
    dimensionsUnit: initialData.dimensionsUnit,
    weightUnit: initialData.weightUnit,
  });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isDateField = (key) => {
    return key === 'shippingDate' || key === 'estimatedDelivery';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Edit Package Information</h2>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label className="block mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
          <input
            type={isDateField(key) ? "date" : "text"}
            name={key}
            value={value}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      ))}
      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
      </div>
    </form>
  );
};

export default EditPackageForm;