const { google } = require("googleapis");
const fs = require("fs");

function handleButtonClick() {
 
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const address = document.getElementById("address").value;
      const agreed = "is Felix"; // Default value for 'agreed'

      main(name, email, address, agreed);
    
  }

async function main(name, email, adress, agreed) {
    try {
         

        console.log(name + email + adress + agreed);
        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets"
        });

        // Create client instance for auth
        const client = await auth.getClient();

        // Instance of Google Sheets API
        const googleSheets = google.sheets({ version: "v4", auth: client });

        const spreadsheetId = "1pfkEb6zvdBbdLK7PbRkewZhVXT0aCtO1uPt8OHvJ_hI";

        // Get metadata about the spreadsheet
        const metaData = await googleSheets.spreadsheets.get({
            auth,
            spreadsheetId
        });

        // Read rows from the spreadsheet
        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "Tabellenblatt1"
        });

        console.log(getRows.data);

        // Write row(s) to the spreadsheet
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Tabellenblatt1",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [name, email, adress, agreed]
                ],
            },
        });

        console.log("Row appended successfully.");

    } catch (error) {
        console.error("Error:", error.message);
    }
}

main("Hello", "my", "name", "is Felix");
