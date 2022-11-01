const express = require("express");
const path = require("path");
const data = require("./data-service");
const multer = require("multer");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const HTTP_PORT = process.env.PORT || 8080;

const upload = multer();

app.get("/", (req, res) => {
  res.redirect("/about");
});

cloudinary.config({
  cloud_name: "dhkahps8x",
  api_key: "335957741563166",
  api_secret: "XlmGf3JKaetz3UOpOBwOhSZwiOs",
  secure: true,
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/blog", (req, res) => {
  data
    .getAllBlogs()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/posts", (req, res) => {
  data
    .getAllPosts()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/post/:id", (req, res) => {
  data
    .getPostById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

app.get("/categories", (req, res) => {
  data
    .getAllCategories()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/posts/add", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/addPost.html"));
});

app.post("/posts/add", upload.single("featureImage"), (req, res) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      console.log(result);
      return result;
    }
    upload(req).then((uploaded) => {
      req.body.featureImage = uploaded.url;
      processPost(uploaded.url);
    });
    data.addPost(req.body).then((post) => {
      res.redirect("/posts");
    });
  }
});

app.use((req, res) => {
  res.status(404).send("<h1>404 page not found</h1>");
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
