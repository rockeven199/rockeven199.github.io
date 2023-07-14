"use strict";

var _require = require("electron"),
    app = _require.app;

var _require2 = require("./module/baseFunction/createWindow"),
    createWin = _require2.createWin;

var _require3 = require("./module/baseFunction/getArticleJSON"),
    getArticleJSON = _require3.getArticleJSON;

app.whenReady().then(function () {
  createWin();
  getArticleJSON();
});