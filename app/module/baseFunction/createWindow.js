const { BrowserWindow, Menu } = require("electron");
const path = require("path");

function createWin() {
  const mainWindow = new BrowserWindow({
    width: 1184,
    height: 600,
    minWidth: 1184,
    minHeight: 600,
    frame: false,
    webPreferences: {
      preload: path.resolve(__dirname, "../preload.js"),
    },
  });
  mainWindow.loadFile(path.resolve(__dirname, "../../", "editor.html"));
  mainWindow.webContents.openDevTools();

  Menu.setApplicationMenu(null);
  return mainWindow;
}

module.exports = { createWin };
