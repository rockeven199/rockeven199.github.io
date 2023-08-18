const { app, ipcMain } = require("electron");
const { createWin } = require("./module/baseFunction/createWindow");
const { getArticleJSON } = require("./module/baseFunction/getArticleJSON");
const { selectDialog } = require("./module/selectDialog");
const path = require("path");
const fs = require("fs");

app.whenReady().then(() => {
  win = createWin();
  requireStatus();
  getArticleJSON();
});

/**
 * @name requireStatus 校验配置文件
 * @param {*} win
 */
function requireStatus() {
  let resultData = fs.readFileSync(path.resolve(__dirname, "config.ini"), {
    encoding: "utf-8",
  });
  if (!JSON.parse(resultData).selectedConfigFile) {
  fs.writeFileSync(
    path.resolve(__dirname, "config.ini"),
    `{"selectedConfigFile":true}`
  );
  } else {
    win.webContents.send("requireConfig");
  }
}

// 选择配置文件
ipcMain.on("selectConfigFile", async (event, value) => {
  var url = await selectDialog(win);
  // 读取配置文件
  let resultData = fs.readFileSync(url.filePaths.toString(), {
    encoding: "utf-8",
  });

  let appIni = fs.readFileSync(path.resolve("config.ini"), {
    encoding: "utf-8",
  });
  let result = JSON.parse(appIni).selectedConfigFile;

  // 判断是否取消选择
  if (!url.canceled && !result) {
    event.sender.send("replySelectFile", [resultData, url]);
    fs.writeFileSync(
      path.resolve(__dirname, "config.ini"),
      `{"selectedConfigFile":true}`
    );
  }else{
    win.webContents.send("requireConfig");
  }
});
