const { customAlphabet } = require('nanoid');
const { google } = require('googleapis');
const { serviceAccount, isProduction } = require("./firebase/firebase");

const SPREADSHEET_ID = isProduction ? process.env.SPREADSHEET_ID : process.env.SPREADSHEET_ID_DEV;

const client = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

async function connectToSheets() {
  return new Promise((resolve, reject) => {
    client.authorize(function(err, tokens) {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      console.log('Successfully connected!');
      resolve(client);
    });
  });
}

const generateTrackingNumber = () => {
  const nanoidLower = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
  const id10 = nanoidLower();
  return id10
};


function isValidTrackingNumber(trackingNumber) {
    // Check if the length is exactly 10
    if (trackingNumber.length !== 10) {
      return false;
    }
  
    // Define the alphabet used by nanoid
    const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    // Check if all characters in the tracking number are from this alphabet
    return trackingNumber.split('').every(char => alphabet.includes(char));
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
    getLatestStatus,
    connectToSheets,
    SPREADSHEET_ID
}