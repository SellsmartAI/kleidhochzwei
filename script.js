const express = require("express");
const {google} = require("googleapis");


const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));



app.get("/", (req, res) => {
    res.render("index");
})

app.post("/", async (req, res) => {


    const{nummer, name, adress, plz, mail, phone, iban} = req.body;





    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });


    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({version: "v4", auth: client});

    const spreadsheetId = "1pfkEb6zvdBbdLK7PbRkewZhVXT0aCtO1uPt8OHvJ_hI";

    //Get metadata about spreadsheet

    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId

    })

    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Tabellenblatt1"
    })

    // Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Tabellenblatt1",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [
                [nummer, name, adress, plz, mail, phone, iban]
            ],
        },

    })



    res.send("Die Daten wurden erfolgreich in die Tabelle hochgeladen!");
})

app.listen(1337, (req, res) => console.log("running on port localhost:1337"));