"use strict";

const express = require("express");
const router = express.Router();


const { Track } = require('./v0/track/routes/track.router');


router.use('/track', Track);


router.get('/', (req, res) => {
	res.send('v0')
})

router.post('/', (req, res) => {
	res.send('v0')
})
 
exports.IndexRouter = router; 