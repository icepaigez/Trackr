import React from 'react';
import truck from "./assets/truck.png";
import copy from "./assets/copy.png";
import pin from "./assets/pin.png";


function ShipmentProgress({ data }) {
    let trackingData = data;
    
    const progressSteps = [
    {
      icon: truck,
      title: trackingData?.departed?.location,
      date: trackingData?.departed?.time
    },
    // {
    //   icon: pin,
    //   title: trackingData?.arrived?.location,
    //   date: trackingData?.arrived?.time
    // },
    {
      icon: pin,
      title: trackingData?.status,
      date: null
    },
    {
      icon: copy,
      title: trackingData?.details,
      date: trackingData?.status
    }
  ];
 
  return (
    <div className="px-2 sm:px-4">
      <h3 className="text-[#111418] text-base sm:text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">Shipment Progress</h3>
      {progressSteps.map((step, index) => (
        <div key={index} className="flex items-start sm:items-center gap-2 sm:gap-4 bg-white py-3 sm:py-4 border-b last:border-b-0">
          <div className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 w-10 h-10 sm:w-12 sm:h-12">
            <img src={step.icon} alt="Shipment icon" className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex flex-col justify-center flex-grow min-w-0">
            <p className="text-[#111418] text-sm sm:text-base font-medium leading-snug sm:leading-normal break-words">{step.title}</p>
            <p className="text-[#637588] text-xs sm:text-sm font-normal leading-snug sm:leading-normal break-words">{step.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShipmentProgress;