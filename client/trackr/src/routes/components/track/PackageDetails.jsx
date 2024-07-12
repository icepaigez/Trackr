import React from 'react';
import ShipmentProgress from './ShipmentProgress';
import PackageJourney from './PackageJourney';
import ShipmentFacts from './ShipmentFacts';

const PackageDetails = ({ data }) => {
  const { journey, currentStatus } = data;
  return (
    <div className="layout-content-container flex flex-col max-w-[960px] w-full">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#111418] tracking-light text-2xl sm:text-3xl md:text-[32px] font-bold leading-tight min-w-72">Tracking Details</p>
      </div>
      <div className="flex px-4 py-3 justify-end">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="truncate">Track Another Shipment</span>
        </button>
      </div>
      <ShipmentProgress data={currentStatus} />
      <PackageJourney journey={journey} />
      <div>
        <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Estimated Delivery</h3>
        <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">July 9, 2022</p>
      </div>
      <ShipmentFacts />
    </div>
  );
};

export default PackageDetails;