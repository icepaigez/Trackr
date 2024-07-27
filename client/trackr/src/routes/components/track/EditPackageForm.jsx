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
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? (value === '' ? '' : Number(value)) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isDateField = (key) => {
    return key === 'shippingDate' || key === 'estimatedDelivery';
  };

  const isDropdownField = (key) => {
    return ['serviceType', 'packageType', 'contentsCategory', 'dimensionsUnit', 'weightUnit'].includes(key);
  };

  const isNumberField = (key) => {
    return ['length', 'width', 'height', 'weight'].includes(key);
  };

  const getDropdownOptions = (key) => { 
    switch (key) {
      case 'serviceType':
        return ['Express', 'Air Cargo', 'Sea Cargo', 'Local'];
      case 'packageType':
        return ['Box', 'Envelope', 'Pallet'];
      case 'contentsCategory':
        return ['Gift', 'Documents', 'Commercial', 'Sample'];
      case 'dimensionsUnit':
        return ['cm', 'mm', 'in', 'm'];
      case 'weightUnit':
        return ['kg', 'g', 'lb', 'oz'];
      default:
        return [];
    }
  };

  const renderField = (key, value) => {
    if (isDateField(key)) {
      return (
        <input
          type="date"
          name={key}
          value={value}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      );
    } else if (isDropdownField(key)) {
      return (
        <select
          name={key}
          value={value}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        >
          {getDropdownOptions(key).map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    } else if (isNumberField(key)) {
      return (
        <input
          type="number"
          name={key}
          value={value}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          min="0"
          step="0.01"
        />
      );
    } else {
      return (
        <input
          type="text"
          name={key}
          value={value}
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
        />
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Edit Package Information</h2>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label className="block mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</label>
          {renderField(key, value)}
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