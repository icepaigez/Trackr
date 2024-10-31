"use strict";
const express = require("express");
const router = express.Router();
const { google } = require('googleapis');
const { connectToSheets, SPREADSHEET_ID } = require("../../../../config/utils");



router.post("/", async (req, res) => {
    const auth = await connectToSheets();
    const sheets = google.sheets({ version: 'v4', auth });
    try {
        const { formData } =  req.body; 
        const { name, email, message } = formData;
        let date = new Date().toUTCString();
        // Append data to the Google Sheet
        const response = await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID, // Set this in your .env file
          range: 'Sheet1!A:D', // Adjust the range as needed
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[date, name, email, message]],
          },
        });
        if (response.status === 200) {
            res.status(200).json({ message: 'Form submitted successfully' });
        }
    } catch (error) {
        console.error('Error appending data:', error);
        res.status(500).json({ message: 'Error submitting form' });
    }
});

exports.Contact = router;