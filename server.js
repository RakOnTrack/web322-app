const express = require("express");
const path = require("path");
const data = require("./data-service");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/employees", (req, res) => {
  data
    .getAllEmployees()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.get("/managers", (req, res) => {
  data
    .getAllManagers()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/departments", (req, res) => {
  data
    .getAllDepartments()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

data
  .initialize()
  .then(function () {
    app.listen(HTTP_PORT, function (req, res) {
      console.log("server running, on " + HTTP_PORT);
    });
  })
  .catch(function (err) {
    console.log("unable to start server" + err);
  });
