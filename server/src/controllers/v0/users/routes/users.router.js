"use strict";
const express = require("express");
const router = express.Router();
//const { db, getAuth } = require("../../../../config/firebase/firebase");





router.get('/', async(req, res) => {
	res.sendStatus(200)
})





exports.Users = router;  