const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("doSelectConfig", {
  doSelectFile: (callback) => {
    ipcRenderer.send("selectConfigFile");
    ipcRenderer.on("replySelectFile", (event, value) => {
      callback(value);
    });
  },
});

ipcRenderer.on("requireConfig", (event, value) => {
  document.querySelector(".mask-container").style.display = "none";
});
