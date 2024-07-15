import { getApiUrl } from '../config/config';
import axios from 'axios';

export const fetchAllPackages = async () => {
    try {
        let url = getApiUrl('/api/v0/track/packages');
        const response = await axios.get(url);
        const { data, status } = response;
        if (status === 200) {
            return data;
        }
    } catch(err) {
        console.log('Error when getting all the packages', err);
    }
}

export const updatePackageDetails = async (packageNumber, updateData) => {
    console.log(`update data for ${packageNumber} is ${updateData}`);
}