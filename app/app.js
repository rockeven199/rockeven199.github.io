const { app } = require("electron");
const { createWin } = require("./module/baseFunction/createWindow");
const { getArticleJSON } = require("./module/baseFunction/getArticleJSON");

app.whenReady().then(() => {
  createWin();
  getArticleJSON();
});
