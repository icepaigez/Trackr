"use strict";
const express = require("express");
const router = express.Router();
const { 
	generateTrackingNumber, 
	isValidTrackingNumber, 
	getLatestStatus 
} = require("../../../../config/utils");
const { db } = require("../../../../config/firebase/firebase");



router.get('/packages', (req, res) => {
    const packagesRef = db.ref('trackingNumbers');
    try {
        packagesRef.once('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                res.status(200).send({
                    packages: data
                });
            } else {
                res.status(404).send({ message: 'No packages found' });
            }
        });
    } catch (error) {
        console.error('Error when getting all packagesd', error);
        res.status(500).json({ error: 'Internal server error' });
    }
   
});

router.post('/generate', async (req, res) => {
    const requiredFields = [
        'origin', 
        'destination', 
        'weight',
        'recipient',
        'recipientPhone',
        'sender',
        'senderPhone',
		'shippingDate',
    ];

    const optionalFields = [
        'estimatedDelivery',
        'length',
        'width',
        'height',
        'description',
        'recipientEmail',
        'senderEmail',
        'declaredValue',
        'specialHandling',
        'deliveryInstructions',
        'insurance',
        'billingInfo',
        'referenceNumber',
        'contentsCategory',
        'dimensionsUnit',
        'weightUnit',
		'serviceType',
        'packageType'
    ];

    const missingFields = requiredFields.filter(field => !req.body.formData[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: 'Missing required fields',
            missingFields: missingFields
        });
    }

    // Extract all fields (required and optional) from req.body
    const packageData = {};
    [...requiredFields, ...optionalFields].forEach(field => {
        if (req.body.formData[field] !== undefined) {
            packageData[field] = req.body.formData[field];
        }
    });

    let trackingNumber = generateTrackingNumber();
    trackingNumber = trackingNumber.replace(/[a-z]/g, char => char.toUpperCase());

    try {
        const trackingNumberRef = db.ref('trackingNumbers/' + trackingNumber);
        const snapshot = await trackingNumberRef.once('value');
        const existingData = snapshot.val();
        
        const dateTimeEpoch = Date.now().toString();
        const trackPoint = {
            created: {
                dateTime: dateTimeEpoch,
                ...packageData
            }
        };

        if (existingData === null) {
            await trackingNumberRef.set(trackPoint);
        } else {
            await trackingNumberRef.update(trackPoint);
        }

        res.status(200).json({ data: trackingNumber });
    } catch (error) {
        console.error('Error in firebase db operation', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/track-package', async(req, res) => {
	const { trackingNumber } = req.body;
	
	// Check if trackingNumber is valid
	if (!isValidTrackingNumber(trackingNumber)) {
		return res.status(400).send({ message: 'Invalid tracking number' });
	}
	try {
		const trackingNumberRef = db.ref('trackingNumbers/' + trackingNumber);
		trackingNumberRef.once('value', snapshot => {
			const data = snapshot.val();
			if (data) {
				const currentStatus = getLatestStatus(data)
				res.status(200).send({
					journey:data,
					currentStatus
				})
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
	const { trackingNumber, details, arrived, departed, status, } = req.body;
	try {
		const trackingNumberRef = db.ref('trackingNumbers/' + trackingNumber);
		trackingNumberRef.once('value', snapshot => {
			const data = snapshot.val();
			if (data) {
				const dataPoint = {}
				const currentStatus = {};
				const dateTimeEpoch = JSON.stringify(Date.parse(new Date()));
				dataPoint['details'] = details;
				dataPoint['arrived'] = {
					"location": arrived.location,
					"time": arrived.time
				};
				dataPoint['departed'] = {
					"location": departed.location,
					"time": departed.time
				};
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