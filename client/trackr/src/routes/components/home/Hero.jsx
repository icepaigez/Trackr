import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import config from '../../../config/config';

const Hero = () => {

    const navigate = useNavigate();
    const [trackingNumber, setTrackingNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTrackingNumber = async(e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const serverUrl = config[import.meta.env.MODE]?.serverUrl;
            let url = `${serverUrl}/api/v0/track/track-package`;
            //let url = `/api/v0/track/track-package`;
            const response = await axios.post(url, { trackingNumber });
            const { data, status } = response;
            if (status === 200) {
                navigate('/package-details', { state: { trackingData: data } });
            } 
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
        setLoading(false);
        setTrackingNumber('');
    }

    return (
        <div className="px-10 sm:px-20 lg:px-40 justify-center py-5 mt-5">
            <div className="layout-content-container">
                <div>
                <div>
                    <div className="rounded-2xl flex sm:min-h-[480px] flex-col sm:gap-6 bg-cover bg-center bg-no-repeat items-start justify-end p-4 pb-10 sm:px-8"
                    style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/6e94df15-873e-4874-848b-69519342bac2.png")' }}>
                    <div className="gap-2 mb-6 pt-16 sm:pt-0 sm:mb-0">
                        <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                          Track your package
                        </h1>
                        <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">Enter your tracking number below</h2>
                    </div>
                    <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
                        <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                        <div className="text-[#637588] flex border border-[#dce0e5] bg-white items-center justify-center pl-[15px] rounded-l-xl border-r-0" data-icon="MagnifyingGlass" data-size="20px" data-weight="regular">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                            </svg>
                        </div>
                        <input
                            placeholder="Enter your tracking number"
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-full placeholder:text-[#637588] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                            value={trackingNumber}
                            onChange={e => setTrackingNumber(e.target.value)}
                        />
                        <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#dce0e5] bg-white pr-[7px]">
                            <button 
                             className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#1972d2] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                             onClick={handleTrackingNumber}
                             disabled={!trackingNumber}
                            >
                                <span className="truncate">
                                    { loading ? <Loader /> : 'Track' }
                                </span>
                            </button>
                        </div>
                        </div>
                    </label>
                    </div>
                </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Hero;