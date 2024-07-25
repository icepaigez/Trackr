import React from 'react';
import ShipmentProgress from './ShipmentProgress';
import PackageJourney from './PackageJourney';
import ShipmentFacts from './ShipmentFacts';
import { useNavigate } from 'react-router-dom';

const PackageDetails = ({ data }) => {
  const navigate = useNavigate();
  const { journey, currentStatus } = data;

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] w-full">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#111418] tracking-light text-2xl sm:text-3xl md:text-[32px] font-bold leading-tight min-w-72">Tracking Details</p>
      </div>
      <div className="flex px-4 py-3 justify-end">
        <button 
         className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]"
         onClick={() => navigate('/')}
        >
          <span className="truncate">Track Another Shipment</span> 
        </button>
      </div>
      { currentStatus ? <ShipmentProgress data={currentStatus} /> : <div className="px-2 sm:px-4">Package is being processed for delivery.</div> }
      { Object.keys(journey).length > 1 && <PackageJourney journey={journey} /> }
      <div>
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Estimated Delivery</h3>
        <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">{ journey?.created?.estimatedDelivery }</p>
      </div>
      <ShipmentFacts 
       status={currentStatus?.status}
       origin={journey?.created?.origin}
       destination={journey?.created?.destination}
       shippedOn={journey?.created?.shippingDate}
      />
    </div>
  );
};

export default PackageDetails;