"use strict";

const express = require("express");
const router = express.Router();


const { Users } = require('./v0/users/routes/users.router');


router.use('/accounts', Users);


router.get('/', (req, res) => {
	res.send('v0')
})

router.post('/', (req, res) => {
	res.send('v0')
})
 
exports.IndexRouter = router; 