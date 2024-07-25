import React from 'react';

const TrackingDetails = ({ details, trackingNumber, onEditSection }) => {
  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleString();
  };


  let sortedTimestamps;
  if (details) {
    sortedTimestamps = Object.keys(details)
    .filter(key => key !== 'created')
    .sort((a, b) => parseInt(b) - parseInt(a));
  }
  
  const createdInfo = details?.created;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
        Tracking Details for {trackingNumber}
        {/* <button
          onClick={() => onEditSection('tracking')}
          className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Edit
        </button> */}
      </h2>
      
      <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold mb-2 flex justify-between items-center">
            Package Information
            <button
              onClick={() => onEditSection('package')}
              className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Edit
            </button>
          </h3> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <p><strong>Date:</strong> {formatDate(createdInfo?.dateTime)}</p>
          <p><strong>Origin:</strong> {createdInfo?.origin}</p>
          <p><strong>Destination:</strong> {createdInfo?.destination}</p>
          <p><strong>Estimated Delivery:</strong> {createdInfo?.estimatedDelivery}</p>
          <p><strong>Shipping Date:</strong> {createdInfo?.shippingDate}</p>
          <p><strong>Service Type:</strong> {createdInfo?.serviceType}</p>
          <p><strong>Package Type:</strong> {createdInfo?.packageType}</p>
          <p><strong>Weight:</strong> {createdInfo?.weight} {createdInfo?.weightUnit}</p>
          <p>
            <strong>Dimensions:</strong>
            {createdInfo?.length && createdInfo?.width && createdInfo?.height
              ? `${createdInfo.length} x ${createdInfo.width} x ${createdInfo.height} ${createdInfo?.dimensionsUnit}`
              : 'None'}
          </p>
          <p><strong>Contents Category:</strong> { createdInfo?.contentsCategory ? createdInfo?.contentsCategory : 'None' }</p>
          <p><strong>Declared Value:</strong> {createdInfo?.declaredValue ? `$${createdInfo?.declaredValue}` : 'None'}</p>
          <p><strong>Insurance:</strong> {createdInfo?.insurance ? createdInfo?.insurance : 'None'}</p>
          <p><strong>Sender:</strong> {createdInfo?.sender}</p>
          <p><strong>Sender Phone:</strong> {createdInfo?.senderPhone}</p>
          <p><strong>Sender Email:</strong> {createdInfo?.senderEmail ? createdInfo?.senderEmail : 'None'}</p>
          <p><strong>Recipient:</strong> {createdInfo?.recipient}</p>
          <p><strong>Recipient Phone:</strong> {createdInfo?.recipientPhone}</p>
          <p><strong>Recipient Email:</strong> {createdInfo?.recipientEmail ? createdInfo?.recipientEmail : 'None'}</p>
        </div>
        <p><strong>Description:</strong> { createdInfo?.description ? createdInfo?.description : 'None' }</p>
        <p><strong>Special Handling:</strong> { createdInfo?.specialHandling ? createdInfo?.specialHandling : 'None' }</p>
        <p><strong>Delivery Instructions:</strong> { createdInfo?.deliveryInstructions ? createdInfo?.deliveryInstructions : 'None' }</p>
        <p><strong>Billing Information:</strong> { createdInfo?.billingInfo ? createdInfo?.billingInfo : 'None' }</p>
      </div>

      <h3 className="text-lg font-semibold mb-2">Tracking Updates</h3>
      {sortedTimestamps?.map((timestamp) => {
        const update = details[timestamp];
        return (
          <div key={timestamp} className="mt-4 border-t pt-2">
            <h4 className="font-semibold flex justify-between items-center">
              {formatDate(timestamp)}
              <button
                onClick={() => onEditSection(`update-${timestamp}`)}
                className="px-2 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Edit
              </button>
            </h4>
            <p><strong>ID:</strong> {timestamp}</p>
            <p><strong>Status:</strong> {update?.status}</p>
            <p><strong>Arrived:</strong> {update?.arrived.location} at {update?.arrived?.time}</p>
            <p><strong>Departed:</strong> {update?.departed.location} at {update?.departed?.time}</p>
            <p><strong>Details:</strong> {update?.details}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TrackingDetails;