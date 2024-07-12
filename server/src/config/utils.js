const nanoid = require('nanoid');


const generateTrackingNumber = () => nanoid.nanoid(9);

function isValidTrackingNumber(trackingNumber) {
    // Check if the length is exactly 9
    if (trackingNumber.length !== 9) {
      return false;
    }
  
    // Define the alphabet used by nanoid
    const alphabet = '_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    // Check if all characters in the tracking number are from this alphabet
    return trackingNumber.split('').every(char => alphabet.includes(char));
}


function getFormattedDateTime() {
    return new Date().toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).replace(',', '').replace(' at', '');
}

function getLatestUnixTime(arr) {
  const numericTimes = arr
    .filter(item => !isNaN(item)) // Filter out non-numeric values
    .map(Number); // Convert strings to numbers

  if (numericTimes.length === 0) {
    return null; // Return null if there are no valid timestamps
  }

  return Math.max(...numericTimes);
}

const getLatestStatus = obj => {
  const statusKeys = Object.keys(obj);
  const latestStatusTime = String(getLatestUnixTime(statusKeys))
  return obj[latestStatusTime];
}




module.exports = {
    generateTrackingNumber,
    isValidTrackingNumber,
    getLatestStatus
}