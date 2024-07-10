import { useLocation } from 'react-router-dom';
import PackageDetails from './components/track/PackageDetails';

const Track = () => {
  const location = useLocation();
  const trackingData = location.state?.trackingData;

  return (
    <>
    {  trackingData && <PackageDetails data={trackingData} /> }
    </>
  )
}

export default Track

