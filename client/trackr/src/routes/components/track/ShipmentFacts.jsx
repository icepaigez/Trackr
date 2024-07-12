import React from 'react';

function ShipmentFacts() {
  const facts = [
    { label: "Status", value: "In Transit" },
    { label: "Origin", value: "San Francisco, CA" },
    { label: "Destination", value: "New York, NY" },
    { label: "Shipped on", value: "July 7, 2022" },
    { label: "Service", value: "Morning Star Express" }
  ];

  return (
    <>
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Shipment Facts</h3>
      <div className="p-4">
        {facts.map((fact, index) => (
          <div key={index} className="flex justify-between gap-x-6 py-2">
            <p className="text-[#637588] text-sm font-normal leading-normal">{fact.label}</p>
            <p className="text-[#111418] text-sm font-normal leading-normal text-right">{fact.value}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ShipmentFacts;