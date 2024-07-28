import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/home/Header';
import { getApiUrl }from '../config/config';
import Loader from "./components/Loader";
import { useNavigate } from 'react-router-dom';


const GenerateTrackingNumber = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    weight: '',
    recipient: '',
    recipientPhone: '',
    sender: '',
    senderPhone: '',
    serviceType: '',
    packageType: '',
    estimatedDelivery: '',
    length: '',
    width: '',
    height: '',
    description: '',
    recipientEmail: '',
    senderEmail: '',
    declaredValue: '',
    specialHandling: '',
    shippingDate: '',
    deliveryInstructions: '',
    insurance: '',
    billingInfo: '',
    referenceNumber: '',
    contentsCategory: '',
    dimensionsUnit: 'cm',
    weightUnit: 'kg'
  });
  const [trackingNumber, setTrackingNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const requiredFields = [
    'origin', 'destination', 'weight', 'recipient', 'recipientPhone',
    'sender', 'senderPhone', 'shippingDate', 'estimatedDelivery', 'recipientEmail',
    'declaredValue'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Check if all required fields are filled
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      toast.error(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    let url = getApiUrl('/api/v0/track/generate');   
    try {
        const response = await axios.post(url, { formData });
        const { data, status } = response;
        setLoading(false);
        if (status === 200) {
            // Clear form fields
            setFormData({
                origin: '',
                destination: '',
                weight: '',
                recipient: '',
                recipientPhone: '',
                sender: '',
                senderPhone: '',
                serviceType: '',
                packageType: '',
                estimatedDelivery: '',
                length: '',
                width: '',
                height: '',
                description: '',
                recipientEmail: '',
                senderEmail: '',
                declaredValue: '',
                specialHandling: '',
                shippingDate: '',
                deliveryInstructions: '',
                insurance: '',
                billingInfo: '',
                referenceNumber: '',
                contentsCategory: '',
                dimensionsUnit: 'cm',
                weightUnit: 'kg'
            });
            setTrackingNumber(data?.data);
        } 
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate tracking number. Please try again.');
    }
  };

  return (
    <>
        <Header />
         <div className="container mx-auto px-10 sm:px-20 lg:px-60 justify-center py-5 mt-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
                <h1 className="text-2xl font-bold">New Tracking Number</h1>
                <button 
                    onClick={() => navigate('/admin')}
                    className="w-full sm:w-auto bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base"
                >
                    Home
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Required Fields */}
                <div>
                    <label className="block mb-2 font-bold">Origin *</label>
                    <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>
                <div>
                    <label className="block mb-2 font-bold">Destination *</label>
                    <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>
                <div>
                    <label className="block mb-2 font-bold">Weight *</label>
                    <div className="flex">
                    <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-l"
                        required
                    />
                    <select
                        name="weightUnit"
                        value={formData.weightUnit}
                        onChange={handleChange}
                        className="p-2 border border-l-0 rounded-r"
                    >
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                    </select>
                    </div>
                </div>
                <div>
                    <label className="block mb-2 font-bold">Recipient *</label>
                    <input
                    type="text"
                    name="recipient"
                    value={formData.recipient}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>
                <div>
                    <label className="block mb-2 font-bold">Recipient Phone *</label>
                    <input
                    type="tel"
                    name="recipientPhone"
                    value={formData.recipientPhone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>
                <div>
                    <label className="block mb-2 font-bold">Sender *</label>
                    <input
                    type="text"
                    name="sender"
                    value={formData.sender}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>
                <div>
                    <label className="block mb-2 font-bold">Sender Phone *</label>
                    <input
                    type="tel"
                    name="senderPhone"
                    value={formData.senderPhone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>
                <div>
                    <label className="block mb-2 font-bold">Service Type *</label>
                    <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    >
                    <option value="">Select a service type</option>
                    <option value="Express">Express</option>
                    <option value="Air Cargo">Air Cargo</option>
                    <option value="Sea Cargo">Sea Cargo</option>
                    <option value="Local">Local</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2 font-bold">Package Type *</label>
                    <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    >
                    <option value="">Select a package type</option>
                    <option value="box">Box</option>
                    <option value="envelope">Envelope</option>
                    <option value="pallet">Pallet</option>
                    </select>
                </div>
    
                {/* Optional Fields */}
                <div>
                    <label className="block mb-2 font-bold">Estimated Delivery *</label>
                    <input
                    type="date"
                    name="estimatedDelivery"
                    value={formData.estimatedDelivery}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>
                <div>
                    <label className="block mb-2">Dimensions (L x W x H)</label>
                    <div className="flex space-x-2">
                    <input
                        type="number"
                        name="length"
                        value={formData.length}
                        onChange={handleChange}
                        placeholder="L"
                        className="w-1/3 p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="width"
                        value={formData.width}
                        onChange={handleChange}
                        placeholder="W"
                        className="w-1/3 p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        placeholder="H"
                        className="w-1/3 p-2 border rounded"
                    />
                    </div>
                </div>
                <div>
                    <label className="block mb-2">Description</label>
                    <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-2 font-bold">Recipient Email *</label>
                    <input
                    type="email"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>
                <div>
                    <label className="block mb-2">Sender Email</label>
                    <input
                    type="email"
                    name="senderEmail"
                    value={formData.senderEmail}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-bold">Declared Value *</label>
                    <input
                    type="number"
                    name="declaredValue"
                    value={formData.declaredValue}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>
                <div>
                    <label className="block mb-2">Special Handling</label>
                    <input
                    type="text"
                    name="specialHandling"
                    value={formData.specialHandling}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-bold">Shipping Date *</label>
                    <input
                    type="date"
                    name="shippingDate"
                    value={formData.shippingDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />
                </div>
                <div>
                    <label className="block mb-2">Delivery Instructions</label>
                    <textarea
                    name="deliveryInstructions"
                    value={formData.deliveryInstructions}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-2">Insurance</label>
                    <input
                    type="text"
                    name="insurance"
                    value={formData.insurance}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2">Billing Info</label>
                    <input
                    type="text"
                    name="billingInfo"
                    value={formData.billingInfo}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2">Reference Number</label>
                    <input
                    type="text"
                    name="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2">Contents Category</label>
                    <select
                    name="contentsCategory"
                    value={formData.contentsCategory}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    >
                    <option value="">Select a category</option>
                    <option value="gift">Gift</option>
                    <option value="documents">Documents</option>
                    <option value="commercial">Commercial</option>
                    <option value="sample">Sample</option>
                    </select>
                </div>
                </div>
                
                <div className="mt-6 flex items-center space-x-4">
                    <button 
                        type="submit" 
                        className={`bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded ${trackingNumber ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!!trackingNumber}
                    >
                        { loading ? <Loader /> : 'Generate' }
                    </button>
                    {trackingNumber && (
                        <div className="text-green-600 font-semibold">
                        Tracking Number: {trackingNumber}
                        </div>
                    )}
                </div>
            </form>
            <ToastContainer />
        </div>
    </>
   
  );
};

export default GenerateTrackingNumber;