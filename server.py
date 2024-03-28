from googleapiclient.discovery import build
from httplib2 import Http
from oauth2client.service_account import ServiceAccountCredentials

# Replace with your Google Sheet ID and desired sheet range
SPREADSHEET_ID = '1hbHLZkdYd1qtehehSfe6R2xB1iZrNuzXZlsOpkjU0OA'
SHEET_RANGE = 'LeaderboardData!A2:C21'  # Adjust range as needed

# Replace with the path to your Google Cloud Service Account JSON key file
SERVICE_ACCOUNT_FILE = 'key.json'

def get_sheet_data():
  """
  Fetches data from the specified Google Sheet range using the Google Sheets API.

  Returns:
      list: A list of lists representing the fetched data from the sheet.
  """
  try:
    # Use Service Account credentials for authentication
    credentials = ServiceAccountCredentials.from_json_keyfile_name(
        SERVICE_ACCOUNT_FILE, scopes=['https://spreadsheets.google.com/feeds']
    )
    http = credentials.authorize(Http())
    service = build('sheets', 'v4', http=http)

    # Retrieve data from the specified sheet range
    sheet = service.spreadsheets().values().get(
        spreadsheetId=SPREADSHEET_ID, range=SHEET_RANGE
    ).execute()
    return sheet.get('values', [])  # Return empty list if no values found
  except Exception as e:
    print(f"Error fetching data from Google Sheet: {e}")
    return []  # Return empty list on error


