const path = require("path");
const fs = require("fs");

const noteData = require("../db/db.json");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

  app.post("/api/notes", function (req, res) {
    newNote = req.body;
    newNote.id = noteData.length + 1;
    noteData.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(noteData), function (
      err,
      data
    ) {
      if (err) {
        return console.log(err);
      }
      console.log("New Note Written to Database");
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    const noteID = req.params.id;
    const removeNote = noteData.filter(
      (note) => note !== (noteData.id === noteID)
    );
    fs.writeFile("./db/db.json", JSON.stringify(removeNote), function (
      err,
      data
    ) {
      if (err) {
        return console.log(err);
      }
      console.log("Note deleted from Database");
    });
  });
};
