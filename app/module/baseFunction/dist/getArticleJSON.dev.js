"use strict";

var fs = require("fs");

var path = require("path");

var _require = require("electron"),
    ipcMain = _require.ipcMain;

var getArticleJSON = function getArticleJSON() {
  var filePath = "../../../article/article_list.json";
  var getJSON = fs.readFileSync(path.resolve(__dirname, filePath), {
    encoding: "utf-8"
  });
  var newString = {
    a: "1",
    b: "2",
    c: "3"
  };
  var temp = JSON.parse(getJSON);
  temp.push(newString);
  fs.writeFileSync(path.resolve(__dirname, filePath), JSON.stringify(temp));
};

getArticleJSON();
module.exports = {
  getArticleJSON: getArticleJSON
};