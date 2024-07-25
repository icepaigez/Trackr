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

router.post('/get-package', async (req, res) => {
    const { trackingNumber } = req.body;
    
    try {
        const trackingNumberRef = db.ref('trackingNumbers/' + trackingNumber.toUpperCase());
        trackingNumberRef.once('value', snapshot => {
            const data = snapshot.val();
            let lastLocation;
            if (data) {
                if (Object.keys(data).length === 1) {
                    //no status yet
                    lastLocation = data?.created?.origin
                } else {
                    //get the most recent status
                    const currentStatus = getLatestStatus(data)
                    if (currentStatus) {
                        lastLocation = currentStatus?.arrived?.location
                        lastLocation = lastLocation?.includes('at') ? lastLocation?.split('at')[1]?.trim() : lastLocation
                    }
                }
                res.status(200).send({ lastLocation })
            } else {
                res.status(404).send({ message: 'Tracking number not found' });
            }
        });
    } catch(error) {
        console.error('Error when getting package', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

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
		const trackingNumberRef = db.ref('trackingNumbers/' + trackingNumber.toUpperCase());
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
    const { packageNumber, updateData, lastLocation, isEdit, timestamp } = req.body;
    const trackingNumberRef = db.ref('trackingNumbers/' + packageNumber.toUpperCase());
    if (isEdit === false) {
        const { currentLocation, arrivalDate, departureDate, status, description } = updateData
        try {
            trackingNumberRef.once('value', snapshot => {
                const data = snapshot.val();
                if (data) {
                    const dataPoint = {}
                    const currentStatus = {};
                    const dateTimeEpoch = JSON.stringify(Date.parse(new Date()));
                    dataPoint['details'] = description;
                    dataPoint['arrived'] = {
                        "location": currentLocation,
                        "time": arrivalDate
                    };
                    dataPoint['departed'] = {
                        "location": lastLocation,
                        "time": departureDate
                    };
                    dataPoint['status'] = status;
                    currentStatus[dateTimeEpoch] = dataPoint;
                    db.ref('trackingNumbers/' + packageNumber).update(currentStatus)
                    res.sendStatus(200);
                } else {
                    res.status(404).send({message:'Tracking number not found!'})
                }
            })
        } catch(error) {
            console.log('Error when updating package status', err)
            res.sendStatus(500)
        }
    } else {
        if (timestamp !== null) {
            try {
                trackingNumberRef?.child(timestamp).update(updateData)
                res.sendStatus(200)
            } catch(error) {
                console.log(`Error when updating package information at timestamp ${timestamp}`, error)
                res.sendStatus(500)
            }
        } else {
            try {
                trackingNumberRef?.child('created').update(updateData)
                res.sendStatus(200)
            } catch(error) {
                console.log('Error when updating original package information', error)
                res.sendStatus(500)
            }
        }
    }  	
})


exports.Track = router;  