const express = require('express');
const GoogleSheetsApi = require('google-sheets-api');

// Replace with your Google Sheet ID and desired sheet range
const spreadsheetId = '1hbHLZkdYd1qtehehSfe6R2xB1iZrNuzXZlsOpkjU0OA';
const sheetRange = 'LeaderboardData!A2:C21'; // Adjust range as needed (e.g., 'Sheet1!B2:D10')

// Configure Google Sheets API (refer to Google Sheets API documentation for details)
const GOOGLE_SHEETS_API_KEY = 'AIzaSyAyx0zPCUsp3OMBEJJEtPBUgDzPr9mK2PQ'; // Replace with your API key

const app = express();
const port = process.env.PORT || 3000;

async function getSheetData() {
  try {
    const sheetsApi = GoogleSheetsApi.instance(GOOGLE_SHEETS_API_KEY);
    const response = await sheetsApi.spreadsheets.values.get({
      spreadsheetId,
      range: sheetRange,
    });
    return response.data.values;
  } catch (error) {
    console.error(error);
    return []; // Return empty array on error
  }
}

app.get('/data', async (req, res) => {
  const data = await getSheetData();
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins (adjust if needed)
  res.json(data);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
