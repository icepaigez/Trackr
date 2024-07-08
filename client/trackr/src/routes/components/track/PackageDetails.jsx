import React from 'react';

const PackageDetails = ({ data }) => {
    
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Delivery details</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">Details</th>
              <th className="p-2 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {
                Object.entries(data)
                .filter(([key]) => key !== 'created')
                .map(([key, value]) => (
                    <tr key={key} className="border-b">
                        <td className="p-2">{key}</td>
                        <td className="p-2">{value.details}</td>
                        <td className="p-2">{value.location}</td>
                    </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PackageDetails;