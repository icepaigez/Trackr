"use strict";
const express = require("express");
const router = express.Router();
const { generateTrackingNumber } = require("../../../../config/utils");
const { db, getAuth } = require("../../../../config/firebase/firebase");




router.get('/generate', async(req, res) => {
	let trackingNumber = generateTrackingNumber()
	res.status(200).send({data:trackingNumber})
	//save it to the db
	try {
		const trackingNumbersRef = db.ref('trackingNumbers');
		trackingNumbersRef.once('value', snapshot => {
			const data = snapshot.val();
			const trackPoint = {}
			const dateTimeEpoch = JSON.stringify(Date.parse(new Date()));
			trackPoint[dateTimeEpoch] = trackingNumber;
			if (data === null) {
				trackingNumbersRef.set(trackPoint)
			} else {
				trackingNumbersRef.update(trackPoint)
			}
		})
	} catch(error) {
		console.log('Error in firebase db operation', err)
	}
})





exports.Track = router;  