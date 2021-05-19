// Express Server for NoteTaker
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//DATA - ignore for now

// ROUTES
// add new note to array
app.post("/api/notes", (req, res) => {
  const newNote = req.body;

  // read in notes array
  const dbJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db", "db.json"), {
      encoding: "utf-8",
    })
  );

  newNote.id = dbJson[dbJson.length - 1].id + 1;
  dbJson.push(newNote);

  fs.writeFileSync(
    path.join(__dirname, "db", "db.json"),
    JSON.stringify(dbJson),
    { encoding: "utf-8" }
  );

  res.json(newNote);
  // console.log(newNote);
  // console.log(dbJson);

  // add item to array (increment last ID #)
  // re-save array
});

// return note list
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db", "db.json"));
});

// display note page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// display any page requested (filter for index -otherwise return css or js page as appropriate)
app.get("*", (req, res) => {
  const url = req.url === "/" ? "/index.html" : req.url;

  // TODO: check file existence if not return 404

  res.sendFile(path.join(__dirname, `/public${url}`));
});

// LISTENER
app.listen(PORT, () => {
  console.log(`Note Taker App listening on PORT ${PORT}`);
});
