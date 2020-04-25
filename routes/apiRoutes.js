const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const noteData = require("../db/db.json");

module.exports = (app) => {
  app.get("/api/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "../db/db.json"))
  );

  app.post("/api/notes", (req, res) => {
    const { body: newNote } = req;
    noteData.push({ ...newNote, id: uuidv4() });
    fs.writeFile("../db/db.json", JSON.stringify(noteData, null, 2), (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("New Note Written to Database");
      res.json({ added: true });
    });
  });

  app.delete("/api/notes/:id", (req, res) => {
    const {
      params: { id: noteId },
    } = req;

    const filteredArray = noteData.filter((note) => note.id != noteId);
    fs.writeFile(
      "db/db.json",
      JSON.stringify(filteredArray, null, 2),
      (err) => {
        if (err) {
          throw err;
        }
        console.log("Note deleted from Database");
        res.json({ deleted: true });
      }
    );
  });
};
