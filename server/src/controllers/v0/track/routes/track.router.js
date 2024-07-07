"use strict";
const express = require("express");
const router = express.Router();
const { generateTrackingNumber } = require("../../../../config/utils");
const { db } = require("../../../../config/firebase/firebase");




router.get('/generate', async(req, res) => {
	let trackingNumber = generateTrackingNumber()
	res.status(200).send({data:trackingNumber})
	//save it to the db
	try {
		const trackingNumberRef = db.ref('trackingNumbers/' + trackingNumber);
		trackingNumberRef.once('value', snapshot => {
			const data = snapshot.val();
			const trackPoint = {}
			const dateTimeEpoch = JSON.stringify(Date.parse(new Date()));
			trackPoint['created'] = dateTimeEpoch;
			if (data === null) {
				trackingNumberRef.set(trackPoint)
			} else {
				trackingNumberRef.update(trackPoint)
			}
		})
	} catch(error) {
		console.log('Error in firebase db operation', err)
	}
})

router.post('/track-package', async(req, res) => {
	const { trackingNumber } = req.body;
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	
	// Check if trackingNumber is a string and matches the UUID format
	if (typeof trackingNumber !== 'string' || !uuidRegex.test(trackingNumber)) {
		return res.status(400).send({ message: 'Invalid tracking number format' });
	}
	try {
		const trackingNumberRef = db.ref('trackingNumbers/' + trackingNumber);
		trackingNumberRef.once('value', snapshot => {
			const data = snapshot.val();
			if (data) {
				res.send(data)
			} else {
				res.status(404).send({message:'Tracking number not found'})
			}
		})
	} catch(error) {
		console.log('Error when getting package status', err)
		res.sendStatus(500)
	}
})

router.post('/update', async(req, res) => {
	const { trackingNumber, details, location, status } = req.body;
	try {
		const trackingNumberRef = db.ref('trackingNumbers/' + trackingNumber);
		trackingNumberRef.once('value', snapshot => {
			const data = snapshot.val();
			if (data) {
				const dataPoint = {}
				const currentStatus = {};
				const dateTimeEpoch = JSON.stringify(Date.parse(new Date()));
				dataPoint['details'] = details;
				dataPoint['location'] = location;
				dataPoint['status'] = status;
				currentStatus[dateTimeEpoch] = dataPoint;
				db.ref('trackingNumbers/' + trackingNumber).update(currentStatus)
				res.sendStatus(200);
			} else {
				res.status(404).send({message:'Tracking number not found'})
			}
		})
	} catch(error) {
		console.log('Error when updating package status', err)
	}	
})





exports.Track = router;  