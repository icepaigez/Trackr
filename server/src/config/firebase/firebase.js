const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = require("./trackr");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
});
  
const db = admin.database();
  
module.exports = {
    db, 
    getAuth
}
  