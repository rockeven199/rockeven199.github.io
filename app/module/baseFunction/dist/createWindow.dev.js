"use strict";

var _require = require("electron"),
    BrowserWindow = _require.BrowserWindow;

var path = require("path");

function createWin() {
  var mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, "../preload.js")
    }
  });
  mainWindow.loadFile(path.resolve(__dirname, "../../", "editor.html"));
  mainWindow.webContents.openDevTools();
  return mainWindow;
}

module.exports = {
  createWin: createWin
};