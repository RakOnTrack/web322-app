const fs = require("fs");

var posts = [];
var categories = [];

module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/posts.json", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        posts = JSON.parse(data);
        fs.readFile("./data/categories.json", "utf-8", (err, data) => {
          if (err) {
            reject(err);
          } else {
            categories = JSON.parse(data);
            resolve();
          }
        });
      }
    });
  });
};

module.exports.getAllPosts = function () {
  return new Promise((resolve, reject) => {
    if (posts.length == 0) {
      reject("Query returned 0 results.");
    }
    resolve(posts);
  });
};

module.exports.getAllCategories = function () {
  return new Promise((resolve, reject) => {
    if (categories.length == 0) {
      reject("Query returned 0 results.");
    }
    resolve(categories);
  });
};

module.exports.getAllBlogs = function () {
  return new Promise((resolve, reject) => {
    var allBlogs = [];
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].published == true) {
        allBlogs.push(posts[i]);
      }
    }
    if (allBlogs.length == 0) {
      reject("No blogs in your list!");
    }

    resolve(allBlogs);
  });
};

// module.exports.addPost = function (postData) {
//   return new Promise(function (resolve, reject) {
//     // postData.id = posts.length + 1;

//     // postData.body =
//     // postData.title =
//     // postData.postDate =
//     // postData.category =
//     // postData.featureImage =
//     // postData.published =

//     // characterData.isHero = characterData.isHero ? true : false;
//     // characterData.charid = characters.length + 1;
//     posts.push(postData);
//     resolve();
//   });
// };

// module.exports.getPostById = function (id) {
//   return new Promise((resolve, reject) => {
//     let foundPost = posts.find((post) => post.id == id);

//     if (foundPost) {
//       resolve(foundPost);
//     } else {
//       reject("no result returned");
//     }
//   });
// };

module.exports.getPostById = function(id){
  return new Promise((resolve,reject)=>{
      let foundPost = posts.find(post => post.id == id);
      foundPost ? resolve(foundPost) : reject("no result returned");
  });
}



module.exports.addPost = function (postData) {
  return new Promise((resolve, reject) => {
    postData.body = postData.body;
    postData.title = postData.title;
    postData.postDate = postData.postDate;
    postData.category = postData.category;
    postData.featureImage = postData.featureImage;
    postData.published = postData.published;

    postData.published = postData.published ? true : false;
    postData.id = posts.length + 1;
    posts.push(postData);
    resolve();
  });
};
