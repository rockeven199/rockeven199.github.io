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
  // 读取App配置文件
  // 开启App执行
  var readAppConfig = eval(
    "(" +
      fs.readFileSync(path.resolve(__dirname, "config.ini"), {
        encoding: "utf-8",
      }) +
      ")"
  );

  // 读取文章列表文件
  var readArticleConfig = fs.readFileSync(
    path.resolve(__dirname, readAppConfig.configFileUrl),
    { encoding: "utf-8" }
  );

  // 判断是否选择文件
  if (!readAppConfig.selectedConfigFile) {
    // fs.writeFileSync(
    //   path.resolve(__dirname, "config.ini"),
    //   "{'selectedConfigFile':true,'configFileUrl':'" +
    //     readAppConfig.selectedConfigFile +
    //     "'}"
    // );
  } else {
    // 发送文章Config到渲染进程（仅启动时执行）
    win.webContents.send("sendToArtConfig", readArticleConfig);
    win.webContents.send("initSendConfig", readArticleConfig);
    // 关闭文件选择蒙版
    win.webContents.send("requireConfig");
  }
}

// 选择配置文件时运行
ipcMain.on("selectConfigFile", async (event, value) => {
  // 获取dialog选择的文件
  var selectedFileUrl = await selectDialog(win);
  // 文件地址转换
  var afterUrl = selectedFileUrl.filePaths[0].replace(/\\/g, "\\\\");

  // 读取文章文件
  let resultData = fs.readFileSync(afterUrl.toString(), {
    encoding: "utf-8",
  });

  // 读取App配置文件
  let appIni = eval(
    "(" +
      fs.readFileSync(path.resolve("config.ini"), {
        encoding: "utf-8",
      }) +
      ")"
  );
  // 判断是否取消选择
  if (
    !selectedFileUrl.canceled &&
    !appIni.selectedConfigFile &&
    selectedFileUrl.filePaths.length != 0
  ) {
    // 返回config
    event.sender.send("replySelectFile", [resultData, afterUrl]);
    fs.writeFileSync(
      path.resolve(__dirname, "config.ini"),
      "{'selectedConfigFile':true,'configFileUrl':'" + afterUrl + "'}"
    );
  } else {
    win.webContents.send("requireConfig");
  }
});

ipcMain.on("fetchForArtConfig", (event) => {
  let tempAppConfigResult = fs.readFileSync(
    path.resolve(__dirname, "config.ini"),
    {
      encoding: "utf-8",
    }
  );
  let appConfigResult = eval("(" + tempAppConfigResult + ")");
  let tempArticleResult = fs.readFileSync(
    path.resolve(__dirname, appConfigResult.configFileUrl)
  );
  let articleResult = eval("(" + tempArticleResult + ")");

  event.sender.send("replyFetchArtConfig", articleResult);
});
