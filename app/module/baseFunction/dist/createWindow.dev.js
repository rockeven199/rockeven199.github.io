"use strict";

var _require = require("electron"),
    BrowserWindow = _require.BrowserWindow,
    Menu = _require.Menu;

var path = require("path");

function createWin() {
  var mainWindow = new BrowserWindow({
    width: 1184,
    height: 600,
    minWidth: 1184,
    minHeight: 600,
    webPreferences: {
      preload: path.resolve(__dirname, "../preload.js")
    }
  });
  mainWindow.loadFile(path.resolve(__dirname, "../../", "editor.html"));
  mainWindow.webContents.openDevTools();
  Menu.setApplicationMenu(null);
  return mainWindow;
}

module.exports = {
  createWin: createWin
};