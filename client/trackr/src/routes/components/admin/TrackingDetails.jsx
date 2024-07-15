const TrackingDetails = ({ details, trackingNumber }) => {
    const formatDate = (timestamp) => {
      return new Date(parseInt(timestamp)).toLocaleString();
    };
  
    const sortedTimestamps = Object.keys(details)
      .filter(key => key !== 'created')
      .sort((a, b) => parseInt(b) - parseInt(a));
  
    const createdInfo = details.created;
  
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Tracking Details for {trackingNumber}</h2>
        
        <div className="mb-6 border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">Package Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <p><strong>Date:</strong> {formatDate(createdInfo.dateTime)}</p>
            <p><strong>Origin:</strong> {createdInfo.origin}</p>
            <p><strong>Destination:</strong> {createdInfo.destination}</p>
            <p><strong>Estimated Delivery:</strong> {createdInfo.estimatedDelivery}</p>
            <p><strong>Shipping Date:</strong> {createdInfo.shippingDate}</p>
            <p><strong>Service Type:</strong> {createdInfo.serviceType}</p>
            <p><strong>Package Type:</strong> {createdInfo.packageType}</p>
            <p><strong>Weight:</strong> {createdInfo.weight} {createdInfo.weightUnit}</p>
            {createdInfo.length && createdInfo.width && createdInfo.height && (
              <p><strong>Dimensions:</strong> {createdInfo.length}x{createdInfo.width}x{createdInfo.height} {createdInfo.dimensionsUnit}</p>
            )}
            <p><strong>Sender:</strong> {createdInfo.sender}</p>
            <p><strong>Sender Phone:</strong> {createdInfo.senderPhone}</p>
            <p><strong>Recipient:</strong> {createdInfo.recipient}</p>
            <p><strong>Recipient Phone:</strong> {createdInfo.recipientPhone}</p>
          </div>
          {createdInfo.description && <p><strong>Description:</strong> {createdInfo.description}</p>}
          {createdInfo.specialHandling && <p><strong>Special Handling:</strong> {createdInfo.specialHandling}</p>}
          {createdInfo.deliveryInstructions && <p><strong>Delivery Instructions:</strong> {createdInfo.deliveryInstructions}</p>}
        </div>
  
        <h3 className="text-lg font-semibold mb-2">Tracking Updates</h3>
        {sortedTimestamps.map((timestamp) => {
          const update = details[timestamp];
          return (
            <div key={timestamp} className="mt-4 border-t pt-2">
              <h4 className="font-semibold">{formatDate(timestamp)}</h4>
              <p><strong>Status:</strong> {update.status}</p>
              <p><strong>Arrived:</strong> {update.arrived.location} at {update.arrived.time}</p>
              <p><strong>Departed:</strong> {update.departed.location} at {update.departed.time}</p>
              <p><strong>Details:</strong> {update.details}</p>
            </div>
          );
        })}
      </div>
    );
};

export default TrackingDetails;