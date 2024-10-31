"use strict";
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');


const { IndexRouter } = require('./controllers/index.router');


const PORT = process.env.PORT || 4003;

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/v0/', IndexRouter);
app.use(express.static(path.join(__dirname, 'public', 'dist')))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'))
});

app.listen(PORT, () => {
	console.log(`The trackr server is listening on port: ${PORT}`)
});




