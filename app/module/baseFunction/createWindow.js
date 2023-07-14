const { BrowserWindow, Menu } = require("electron");
const path = require("path");

const createWin = () => {
  const win = new BrowserWindow({
    x: 920,
    y: 0,
    title: "博客编辑器",
    webPreferences: {
      preload: path.resolve(__dirname, "../preload.js"),
    },
  });

  Menu.setApplicationMenu(null);
  win.loadFile(path.resolve("app","editor.html"));
  win.webContents.openDevTools();
  // win.maximize()
};

module.exports = {
  createWin,
};
