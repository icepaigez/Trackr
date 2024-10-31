import { getApiUrl } from '../config/config';
import axios from 'axios';

export const fetchAllPackages = async () => { 
    try {
        const url = getApiUrl('/api/v0/track/packages');
        const response = await axios.get(url);
        const { data, status } = response;
        if (status === 200) {
            return data;
        }
    } catch(err) {
        console.log('Error when getting all the packages', err);
    }
}

export const updatePackageDetails = async (packageNumber, updateData, lastLocation, isEdit, timestamp, lastLocationDepartureDate) => {
    const url = getApiUrl('/api/v0/track/update');
    const response = await axios.post(url, { packageNumber, updateData, lastLocation, isEdit, timestamp, lastLocationDepartureDate });
    return response;
} 

export const deleteUpdate = async (section, trackingNumber) => {
    const url = getApiUrl('/api/v0/track/delete');
    const response = await axios.delete(url, { 
        data: {
            section, 
            trackingNumber
        } 
    })
    return response;
}