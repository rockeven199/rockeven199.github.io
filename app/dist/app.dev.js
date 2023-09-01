"use strict";

var _require = require("electron"),
    app = _require.app,
    ipcMain = _require.ipcMain;

var _require2 = require("./module/baseFunction/createWindow"),
    createWin = _require2.createWin;

var _require3 = require("./module/baseFunction/getArticleJSON"),
    getArticleJSON = _require3.getArticleJSON;

var _require4 = require("./module/selectDialog"),
    selectDialog = _require4.selectDialog;

var path = require("path");

var fs = require("fs");

app.whenReady().then(function () {
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
  var readAppConfig = eval("(" + fs.readFileSync(path.resolve(__dirname, "config.ini"), {
    encoding: "utf-8"
  }) + ")"); // 读取文章列表文件

  var readArticleConfig = fs.readFileSync(path.resolve(__dirname, readAppConfig.configFileUrl), {
    encoding: "utf-8"
  }); // 判断是否选择文件

  if (!readAppConfig.selectedConfigFile) {// fs.writeFileSync(
    //   path.resolve(__dirname, "config.ini"),
    //   "{'selectedConfigFile':true,'configFileUrl':'" +
    //     readAppConfig.selectedConfigFile +
    //     "'}"
    // );
  } else {
    // 发送文章Config到渲染进程（仅启动时执行）
    win.webContents.send("sendToArtConfig", readArticleConfig);
    win.webContents.send("initSendConfig", readArticleConfig); // 关闭文件选择蒙版

    win.webContents.send("requireConfig");
  }
} // 选择配置文件时运行


ipcMain.on("selectConfigFile", function _callee(event, value) {
  var selectedFileUrl, afterUrl, resultData, appIni;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(selectDialog(win));

        case 2:
          selectedFileUrl = _context.sent;
          // 文件地址转换
          afterUrl = selectedFileUrl.filePaths[0].replace(/\\/g, "\\\\"); // 读取文章文件

          resultData = fs.readFileSync(afterUrl.toString(), {
            encoding: "utf-8"
          }); // 读取App配置文件

          appIni = eval("(" + fs.readFileSync(path.resolve("config.ini"), {
            encoding: "utf-8"
          }) + ")"); // 判断是否取消选择

          if (!selectedFileUrl.canceled && !appIni.selectedConfigFile && selectedFileUrl.filePaths.length != 0) {
            // 返回config
            event.sender.send("replySelectFile", [resultData, afterUrl]);
            fs.writeFileSync(path.resolve(__dirname, "config.ini"), "{'selectedConfigFile':true,'configFileUrl':'" + afterUrl + "'}");
          } else {
            win.webContents.send("requireConfig");
          }

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
ipcMain.on("fetchForArtConfig", function (event) {
  var tempAppConfigResult = fs.readFileSync(path.resolve(__dirname, "config.ini"), {
    encoding: "utf-8"
  });
  var appConfigResult = eval("(" + tempAppConfigResult + ")");
  var tempArticleResult = fs.readFileSync(path.resolve(__dirname, appConfigResult.configFileUrl));
  var articleResult = eval("(" + tempArticleResult + ")");
  event.sender.send("replyFetchArtConfig", articleResult);
});