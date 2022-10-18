const fs = require("fs");

var employees = [];

module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/employees.json", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        employees = JSON.parse(data);
        fs.readFile("./data/departments.json", "utf-8", (err, data) => {
          if (err) {
            reject(err);
          } else {
            departments = JSON.parse(data);
            resolve();
          }
        });
      }
    });
  });
};

module.exports.getAllEmployees = function () {
  return new Promise((resolve, reject) => {
    if (employees.length == 0) {
      reject("Query returned 0 results.");
    }
    resolve(employees);
  });
};

module.exports.getAllDepartments = function () {
  return new Promise((resolve, reject) => {
    if (departments.length == 0) {
      reject("Query returned 0 results.");
    }
    resolve(departments);
  });
};

module.exports.getAllManagers = function () {
  return new Promise((resolve, reject) => {
    var allManagers = [];
    for (var i = 0; i < employees.length; i++) {
      if (employees[i].isManager == true) {
        allManagers.push(employees[i]);
      }
    }
    if (allManagers.length == 0) {
      reject("No heros in your list!");
    }

    resolve(allManagers);
  });
};
