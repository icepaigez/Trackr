import pin from "./assets/pin.png";

function PackageJourney({ journey }) {
    // Process the journey data 
    const processedJourney = Object.entries(journey)
      .filter(([key]) => key !== 'created')
      .map(([timestamp, data]) => ({
        timestamp: parseInt(timestamp),
        ...data
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
  
    return (
        <div className="px-2 sm:px-4 mt-8">
        <h3 className="text-[#111418] text-base sm:text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-4">Package Journey</h3>
        <div className="relative">
          {processedJourney?.map((step, index) => (
            <div key={step.timestamp} className="flex mb-4 last:mb-0">
              <div className="relative flex flex-col items-center mr-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full z-10"></div>
                {index !== processedJourney.length - 1 && <div className="h-full w-0.5 bg-gray-300 absolute top-3"></div>}
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  <img src={pin} alt="Location" className="w-4 h-4 mr-2" />
                  <p className="text-sm font-medium text-gray-900">{step?.departed?.location}</p>
                </div>
                <p className="text-xs text-gray-500 mb-2">Departed: {step?.departed?.time}</p>
                <div className="flex items-center mb-1">
                  <img src={pin} alt="Location" className="w-4 h-4 mr-2" />
                  <p className="text-sm font-medium text-gray-900">{step?.arrived?.location}</p>
                </div>
                <p className="text-xs text-gray-500">Arrived: {step?.arrived?.time}</p>
                {index === processedJourney.length - 1 && (
                  <p className="text-xs font-medium text-blue-500 mt-1">Status: {step?.status}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default PackageJourney;
  
  
  