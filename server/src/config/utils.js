const nanoid = require('nanoid');


const generateTrackingNumber = () => nanoid.nanoid(9);






module.exports = {
    generateTrackingNumber
}