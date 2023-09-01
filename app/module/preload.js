const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("doSelectConfig", {
  doSelectFile: (callback) => {
    ipcRenderer.send("selectConfigFile");
    ipcRenderer.on("replySelectFile", (event, selectFile) => {
      callback(selectFile);
    });
  },
});

contextBridge.exposeInMainWorld("sendConfig", {
  fetchArtConfig: (callback) => {
    ipcRenderer.send("fetchForArtConfig");
    ipcRenderer.on("replyFetchArtConfig", (event, config) => {
      callback(config);
    });
  },
});

ipcRenderer.on("requireConfig", (event, value) => {
  document.querySelector(".mask-container").style.display = "none";
});

ipcRenderer.on("initSendConfig", (event, value) => {
  /**
   *
   * @returns div element
   */
  function createDiv() {
    return document.createElement("div");
  }

  function createCharapter() {
    return document.createElement("p");
  }

  function createElement(authorName, pubDate, title, index) {
    const __CONTAINER_DIV = createDiv();
    __CONTAINER_DIV.setAttribute("class", "article-group");

    const __TITLE_P = createCharapter();
    __TITLE_P.setAttribute("class", "article-title");
    __TITLE_P.innerHTML = title;

    const __INFO_DIV = createDiv();
    __INFO_DIV.setAttribute("class", "other-info");

    const __DATE_P = createCharapter();
    __DATE_P.setAttribute("class", "pubdate");
    __DATE_P.innerHTML = pubDate;

    const __AUTHORNAME_P = createCharapter();
    __AUTHORNAME_P.setAttribute("class", "author");
    __AUTHORNAME_P.innerHTML = authorName;

    __INFO_DIV.appendChild(__DATE_P);
    __INFO_DIV.appendChild(__AUTHORNAME_P);

    __CONTAINER_DIV.appendChild(__TITLE_P);
    __CONTAINER_DIV.appendChild(__INFO_DIV);
    __CONTAINER_DIV.dataset.artIndex = index;

    return __CONTAINER_DIV;
  }

  const render_container = document.querySelector(
    ".article-renderer-container"
  );

  var articleResult = eval("(" + value + ")");
  for (
    var articleIndex = 0;
    articleIndex < articleResult.length;
    articleIndex++
  ) {
    render_container.appendChild(
      createElement(
        articleResult[articleIndex].authorName,
        articleResult[articleIndex].pubDate,
        articleResult[articleIndex].articleTitle,
        articleIndex
      )
    );
  }
});
