import React, { useState } from 'react';
import config from '../../../config/config';
import axios from 'axios';
import Loader from '../Loader';
import PackageDetails from './PackageDetails';

const TrackPackage = () => {

    const [trackingNumber, setTrackingNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const handleTrackingNumber = async(e) => {
        setLoading(true);
        e.preventDefault();
        const serverUrl = config[import.meta.env.MODE]?.serverUrl;
        let url = `${serverUrl}/api/v0/track/track-package`;
        const response = await axios.post(url, { trackingNumber });
        const { data } = response;
        setData(data);
        setLoading(false);
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
            { loading ? <Loader stroke='#FFFFFF'/> : 'Track' }
            </button>
           { data && <PackageDetails data={data} /> }
        </div>
    );
};

export default TrackPackage;