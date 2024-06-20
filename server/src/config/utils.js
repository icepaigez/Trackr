const { v4: uuidv4 } = require('uuid');


const generateTrackingNumber = () => uuidv4();






module.exports = {
    generateTrackingNumber
}