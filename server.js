// Express Server for NoteTaker
const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

//DATA - ignore for now

// ROUTES
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db", "db.json"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", (req, res) => {
  const url = req.url === "/" ? "/index.html" : req.url;
  res.sendFile(path.join(__dirname, `/public${url}`));
});

// LISTENER
app.listen(PORT, () => {
  console.log(`Note Taker App listening on PORT ${PORT}`);
});
