const path = require("path");
const fs = reuire("fs");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

  app.post("/api/notes", function (req, res) {});

  app.post("/api/notes/:id", function (req, res) {});
};
