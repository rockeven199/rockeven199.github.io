const { BrowserWindow, Menu } = require("electron");
const path = require("path");

function createWin() {
  const mainWindow = new BrowserWindow({
    minWidth: 1184,
    minHeight: 600,
    webPreferences: {
      preload: path.resolve(__dirname, "../preload.js"),
    },
  });
  mainWindow.loadFile(path.resolve(__dirname, "../../", "editor.html"));
  mainWindow.webContents.openDevTools();
  // mainWindow.maximize();

  Menu.setApplicationMenu(null);

  return mainWindow;
}

module.exports = { createWin };
