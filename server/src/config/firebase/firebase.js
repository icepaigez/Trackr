const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");

// Import both service accounts
const productionServiceAccount = require("./trackr");
const developmentServiceAccount = require("./trackr_dev");

// Determine the environment
const isProduction = process.env.NODE_ENV === "production";

// Choose the appropriate service account and database URL based on the environment
const serviceAccount = isProduction ? productionServiceAccount : developmentServiceAccount;
const databaseURL = isProduction ? process.env.PROD_DATABASE_URL : process.env.DEV_DATABASE_URL;

// Initialize the app with the selected service account and database URL
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL
});

const db = admin.database();

module.exports = {
    db, 
    getAuth,
    serviceAccount,
    isProduction
}