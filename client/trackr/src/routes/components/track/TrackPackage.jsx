import React, { useState } from 'react';
import config from '../../../config/config';

const TrackPackage = () => {

    const [trackingNumber, setTrackingNumber] = useState('');

    const handleTrackingNumber = (e) => {
        e.preventDefault();
        const serverUrl = config[import.meta.env.MODE]?.serverUrl;
        let url = `${serverUrl}/api/v0/track/track-package`;
        console.log(trackingNumber);
        setTrackingNumber('');
    }

    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-2">⚪</span> Track a Package
        </h1>
        <div className="mb-4 sm:w-full md:w-2/4 lg:w-2/5">
            <input
                type="text"
                placeholder="Enter a tracking number"
                className="w-full p-2 border rounded"
                value={trackingNumber} 
                onChange={(e) => {setTrackingNumber(e.target.value)}}
            />
        </div>
            <button 
             className="bg-blue-600 text-white px-4 py-2 rounded"
             onClick={handleTrackingNumber}
             disabled={!trackingNumber}
            >
            Track
            </button>
        </div>
    );
};

export default TrackPackage;