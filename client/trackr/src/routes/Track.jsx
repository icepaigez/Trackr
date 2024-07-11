import { useLocation } from 'react-router-dom';
import Header from './components/home/Header';
import PackageDetails from './components/track/PackageDetails';

const Track = () => {
  const location = useLocation();
  const trackingData = location.state?.trackingData;

  return (
    <div className="relative flex min-h-screen flex-col bg-white font-sans overflow-x-hidden">
      <div className="flex h-full grow flex-col">
        <Header />
        <div className="px-4 sm:px-8 md:px-16 lg:px-40 flex flex-1 justify-center py-5">
          { trackingData && <PackageDetails data={trackingData} /> }
        </div>
      </div>
   </div>
  )
}

export default Track

