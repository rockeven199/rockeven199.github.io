window.onload = () => {
  let dataArray = [];

  const renderElement = {
    multipe: {
      tagContainer: document.querySelectorAll(".tag-container"),
      selectCheck: document.querySelectorAll("#tag-select-check"),
    },
    single: {
      previewWindow: document.querySelector(".preview-container"),
      previewWindowControlBar: document.querySelector(".control-preview"),
      perviewWindowCloseBar: document.querySelector(".close-bar-button"),
      perviewOutArea: document.querySelector(".output-area"),
      editArticleArea: document.querySelector("textarea"),
      addTagButton: document.querySelector("#addTag"),
      tagSlideButton: document.querySelector(".control-button"),
      tagSlideListContainer: document.querySelector(".control-bar"),
      tagCountShowArea: document.querySelector(".show-tag-count"),
    },
    help: `
          tagContainer：每个tag的容器
          selectCheck：每个tag的复选框
          previewWindow：预览窗口的整体容器
          previewWindowControlBar：预览窗口切换的控制区
          perviewWindowCloseBar：预览窗口的关闭按钮
          perviewOutArea：文章预览输出的区域
          editArticleArea：文章内容编辑的区域
          addTagButton：标签添加按钮
          tagSlideButton：tag侧边栏切换按钮
          tagSlideListContainer：tag侧边栏的容器,
          tagCountShowArea:tag数显示区域
          `,
  };

  var artConfig = () => {
    return new Object();
  };

  // dataArray = selectTagOption(dataArray,renderElement);
  toggleControlPreview(renderElement);
  previewWindowFunctions(renderElement);
  addTag(artConfig, renderElement);
  reset();
  hotkeySubmit();
  removeTag(artConfig);
  selectAll();
  submitChange(artConfig);
  selectConfigFile();
  controlArticleList();
  openArticleInfo(artConfig);
  listenterContentChange();
};

/**
 * @name selectTagOption
 * @description select tag value
 */
function selectTagOption(dataArray, element) {
  //To click container
  const optionContainer = element.multipe.tagContainer;
  for (const i of optionContainer) {
    i.addEventListener("click", (element) => {
      if (element.target.className != "tag-select-check") {
        if (hasChecked(element.target.children[0])) {
          dataArray.splice(
            dataArray.indexOf(
              element.target.children[1].value,
              dataArray.indexOf(element.target.children[1].value == 0)
                ? element.target.children[1].value + 1
                : element.target.children[1].value - 1
            )
          );
          element.target.children[0].checked = false;
        } else {
          // if (dataArray.indexOf(element.target.children[1].value) != -1) {
          //   element.target.children[0].checked = true;
          //   console.log("already set this tag !!");
          // } else {
          //   dataArray.push(element.target.children[1].value);
          //   element.target.children[0].checked = true;
          // }
        }
      }
    });
  }

  // 复选框
  const optionsCheckBox = element.multipe.selectCheck;
  for (const j of optionsCheckBox) {
    j.addEventListener("click", (Element) => {
      if (Element.target.id == "tag-select-check") {
        if (hasChecked(Element.target) == false) {
          dataArray.splice(
            dataArray.indexOf(
              Element.target.nextElementSibling.value,
              dataArray.indexOf(Element.target.nextElementSibling.value == 0)
                ? Element.target.nextElementSibling.value + 1
                : Element.target.nextElementSibling.value - 1
            )
          );
          Element.target.setAttribute("checked", "false");
        } else {
          if (
            dataArray.indexOf(Element.target.nextElementSibling.value) != -1
          ) {
            Element.target.setAttribute("checked", "true");
            console.log("already set this tag !!");
          } else {
            dataArray.push(Element.target.nextElementSibling.value);
            Element.target.setAttribute("checked", "true");
          }
        }
      }
    });
  }
  return dataArray;
}

/**
 * @name toggleControlPreview
 * @description 切换预览窗口
 */
function toggleControlPreview(element) {
  const previewContainer = element.single.previewWindow;
  const togglePreview = element.single.previewWindowControlBar;
  togglePreview.addEventListener("click", (Element) => {
    if (Element.target.dataset.openpreview == "ture") {
      previewContainer.style.zIndex = "-1";
      Element.target.dataset.openpreview = false;
    } else {
      previewContainer.style.zIndex = "999";
      Element.target.dataset.openpreview = true;
    }
  });

  const closePreview = element.single.perviewWindowCloseBar;
  closePreview.addEventListener("click", (Element) => {
    previewContainer.style.zIndex = "-1";
    Element.target.dataset.openpreview = false;
  });
}

/**
 * @name previewEditerContent
 * @description 预览功能实现
 */
function previewWindowFunctions(element) {
  // inputContent
  const textarea = element.single.editArticleArea;
  const outputArea = element.single.perviewOutArea;
  const previewContainer = element.single.previewWindow;
  textarea.addEventListener("input", () => {
    outputArea.innerHTML = marked.parse(textarea.value);
  });

  // dragWindow
  canDrag = false;
  diffX = 0;
  diffY = 0;
  moveX = 0;
  moveY = 0;

  previewContainer.addEventListener("mousedown", (event) => {
    canDrag = true;
    diffx = event.clientX - previewContainer.offsetLeft;
    diffY = event.clientY - previewContainer.offsetTop;
  });

  previewContainer.addEventListener("mousemove", (event) => {
    if (canDrag == true) {
      moveX = event.clientX - diffx;
      moveY = event.clientY - diffY;
    }
    // if (moveX < 0) {
    //   moveX = 0;
    // } else if (moveX > window.innerWidth - previewContainer.offsetWidth) {
    //   moveX = window.innerWidth - previewContainer.offsetWidth;
    // }
    // if (moveY < 0) {
    //   moveY = 0;
    // } else if (moveY > window.innerHeight - previewContainer.offsetHeight) {
    //   moveY = window.innerHeight - previewContainer.offsetHeight;
    // }

    previewContainer.style.left = moveX + "px";
    previewContainer.style.top = moveY + "px";
  });

  previewContainer.addEventListener("mouseup", () => {
    canDrag = false;
  });
}

/**
 * @name addTag
 * @description 添加Tag
 */
function addTag(artConfig, element) {
  const __addTag = element.single.addTagButton;
  const __click_svg = element.single.tagSlideButton;
  const __control_bar = element.single.tagSlideListContainer;
  const __showTagCount = element.single.tagCountShowArea;
  var __flag = false;
  var __count = __showTagCount.innerHTML;

  __addTag.addEventListener("click", () => {
    // 添加标签
    const __showTagContainer = document.querySelector(".show-tag");
    const __tagContainer = document.createElement("div");
    const __checkElement = document.createElement("input");
    const __inputElement = document.createElement("input");
    const __nameElement = document.createElement("input");
    const __selectColor = document.createElement("input");

    __tagContainer.setAttribute("class", "tag-container");
    __inputElement.type = "text";
    __inputElement.classList = "select-values";
    __inputElement.placeholder = "输入标签值";
    __checkElement.type = "checkbox";
    __checkElement.classList = "tag-select-check";
    __nameElement.type = "text";
    __nameElement.id = "tag-name";
    __nameElement.placeholder = "输入标签名";
    __selectColor.type = "color";
    __selectColor.id = "select-color";
    __tagContainer.append(__checkElement);
    __tagContainer.append(__nameElement);
    __tagContainer.append(__inputElement);
    __tagContainer.append(__selectColor);
    __showTagContainer.append(__tagContainer);

    // 标签总数计算
    __showTagCount.innerHTML = __count++;
    artConfig.__proto__.tagCount = __count;
  });

  __click_svg.addEventListener("click", () => {
    if (__flag == false) {
      __control_bar.style.right = "-195px";
      __flag = true;
    } else {
      __control_bar.style.right = "0px";
      __flag = false;
    }
  });
}

/**
 * @name removeTag
 * @description 删除Tag
 */
function removeTag(__artConfig) {
  const __removeButton = document.querySelector("#removeTag");
  const __showTagCount = document.querySelector(".show-tag-count");
  __removeButton.addEventListener("click", () => {
    const __allTag = document.querySelectorAll(".tag-container");
    let __selectedElement = [];
    __allTag.forEach((__item1) => {
      if (__item1.firstElementChild.checked) {
        __selectedElement.push(__item1);
      }

      if (__selectedElement.length == 0) {
        if (__allTag.length != 0) {
          __allTag[__allTag.length - 1].remove();
        }
      } else {
        __selectedElement.forEach((__item2) => {
          __item2.remove();
        });
      }
    });

    if (__artConfig.__proto__.tagCount-- > 0) {
      __showTagCount.innerHTML = __artConfig.__proto__.tagCount--;
    } else {
      __showTagCount.innerHTML = __artConfig.__proto__.tagCount = 0;
    }
    __artConfig.__proto__.tagCount = __showTagCount.innerHTML;
  });
}

/**
 * @name selectAllTag
 * @description 全选tag
 */
function selectAll() {
  const __selectAllButton = document.querySelector("#selectAll");
  var __flag = false;
  __selectAllButton.addEventListener("click", () => {
    const selectBox = document.querySelectorAll("[type='checkbox']");
    if (__flag === false) {
      selectBox.forEach((item) => {
        item.checked = true;
      });
      __flag = true;
    } else {
      selectBox.forEach((item) => {
        item.checked = false;
      });
      __flag = false;
    }
  });
}

/**
 * @name resetEdit
 * @description 重置页面操作
 */
function reset() {
  const __title = document.querySelector("#typeTitle");
  const __content = document.querySelector("#typeContent");
  const __reset = document.querySelector(".reset");

  __reset.addEventListener("click", () => {
    if (confirm("确认清空操作吗？？？（不可恢复）")) {
      __title.value = "";
      __content.value = "";
      const allTag = document.querySelectorAll(".tag-container");
      allTag.forEach((item) => {
        item.remove();
      });
    }
  });
}

/**
 * @name submitChange
 * @description 提交更改
 */

function submitChange(artConfig, element) {
  const submitButton = document.querySelector(".submit");
  let __allTag = [];
  let __submitedContent = {};

  // 获取tag
  function getTag(__allTag) {
    let __tagArr = [];
    const __tagElement = element.multipe.selectCheck;
    if (__tagElement.length != 0) {
      __tagElement.forEach((__item2) => {
        if (__tagArr.length == 3) {
          __allTag.push(__tagArr);
          __tagArr = [];
        }
        __tagArr.push("Tag");
        __tagArr.push(__item2.nextElementSibling.value);
        __tagArr.push(__item2.nextElementSibling.nextElementSibling.value);
        __allTag.push(__tagArr);
      });
      return __tagArr;
    } else {
      return false;
    }
  }

  // 获取发布时间
  function getPubTime() {
    // const __pubDate = document.querySelector("");
    // const date = new Date();
    // let pubtime = ``;
    // pubtime = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    // return pubtime;
  }

  // 获取文章标题
  function getArticleTitle() {
    const __articleTitle = document.querySelector("#typeTitle").value;
    if (__articleTitle.value != "") {
      return __articleTitle;
    } else {
      return false;
    }
  }

  // 获取文章简介
  function getInfoContent() {
    const __info = document.querySelector("textarea").value.substring(0, 30);
    return __info;
  }

  /**
   * @description 获取文章内容
   * @returns false|context
   */
  function getContext() {
    const __context = document.querySelector("textarea").value;
    if (__context.value != "") {
      return __context;
    } else {
      return false;
    }
  }

  function findSameArticle(__articleTitle) {
    const __artList = artConfig.__proto__.config;
    __artList.some((item) => item.articleTitle == __articleTitle)
      ? (__artList.haveSameArticle = true)
      : (__artList.haveSameArticle = false);
    return __artList;
  }

  // 单击提交
  submitButton.addEventListener("click", () => {
    if (confirm("确认提交？")) {
      let __tag = getTag(__allTag);
      let __pubtime = getPubTime();
      let __articleTitle = getArticleTitle();
      let __infoContent = getInfoContent();
      let __context = getContext();
      let __artList = findSameArticle(__articleTitle);

      if (__artList.haveSameArticle === true) {
        __artList.forEach((__item) => {
          console.log(__item.pubDate + __pubtime);
        });
      }
      if (
        __tag != false &&
        __articleTitle != false &&
        __infoContent != false &&
        __context != false
      ) {
        const date = new Date();
        let __tempMonth = "";
        let __tempDay = "";

        date.getMonth().length != 2
          ? (__tempMonth = "0" + date.getMonth().toString())
          : (__tempMonth = date.getMonth().toString());
        date.getDay().length != 2
          ? (__tempDay = "0" + date.getDay())
          : (__tempDay = date.getDay());

        __submitedContent.Tag = __allTag;
        __submitedContent.pubDate = __pubtime;
        __submitedContent.authorName = "Rockeven199";
        __submitedContent.articleTitle = __articleTitle;
        __submitedContent.articleContent = __infoContent;
        __submitedContent.articleUrl =
          "../article/content/" +
          date.getFullYear().toString() +
          __empMonth +
          __empDay +
          ".md";
      } else {
        alert("请检查是否有空缺");
      }
    }
  });
}

/**
 * @name hotkey
 * @description 按下enter键提交
 */

function hotkeySubmit() {
  window.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      const __submitButton = document.querySelector(".submit");
      __submitButton.click();
    }
  });
}

/**
 * @name selectConfigFile
 * @description 选择配置文件
 */

function selectConfigFile() {
  const __mask = document.querySelector(".mask-container");
  const __selectFileButton = document.querySelector("#selectFile");
  __selectFileButton.addEventListener("click", () => {
    window.doSelectConfig.doSelectFile((value) => {
      if (!value[0].canceled) {
        __mask.style.display = "none";
        return value[1];
      }
    });
  });
}

/**
 * @name controlArticleList
 * @description 控制文章列表
 */
function controlArticleList() {
  const __listBar = document.querySelector(".article-list-control-bar");
  const __listContainer = document.querySelector(".article-list-container");
  var __showList = false;
  __listBar.addEventListener("click", (event) => {
    if (!__showList) {
      __listContainer.style.transform = "translateX(0)";
      __showList = true;
    } else {
      __listContainer.style.transform = "translateX(-100%)";
      __showList = false;
    }
  });
}

/**
 * @name openArticleInfo 填充文章信息
 */
function openArticleInfo(artConfig) {
  const __listElement = document.querySelectorAll(".article-group");
  const __listTitle = document.querySelectorAll(".article-title");
  const __listInfo = document.querySelectorAll(".other-info");
  const __showTagCount = document.querySelector(".show-tag-count");
  const __container = document.querySelectorAll(".tag-container");
  const __sideList = document.querySelector(".article-list-container");

  artConfig.__proto__.config;
  window.sendConfig.fetchArtConfig(
    (config) => (artConfig.__proto__.config = config)
  );

  /**
   * @description 创建tag
   * @param {*} __tagName
   * @param {*} __tagContent
   * @param {*} __tagIndex
   * @param {*} __tagColor
   */
  function createTag(__tagName, __tagContent, __tagColor, __tagIndex) {
    const __container = document.createElement("div");
    __container.dataset.articleIndex = __tagIndex;
    __container.classList.add("tag-container");

    const __checkBox = document.createElement("input");
    __checkBox.classList.add("tag-select-check");
    __checkBox.type = "checkbox";

    const __tagNameEntry = document.createElement("input");
    __tagNameEntry.id = "tag-name";
    __tagNameEntry.type = "text";
    __tagNameEntry.value = __tagName;

    const __content = document.createElement("input");
    __content.id = "tag-content";
    __content.classList.add("select-values");
    __content.value = __tagContent;

    const __color = document.createElement("input");
    __color.type = "color";
    __color.id = "select-color";
    __color.value = __tagColor;

    __container.appendChild(__checkBox);
    __container.appendChild(__tagNameEntry);
    __container.appendChild(__content);
    __container.appendChild(__color);

    document.querySelector(".show-tag").appendChild(__container);
  }

  /**
   * @description 填充文章信息
   * @param {*} artTitle
   * @param {*} artContent
   */
  function fillArticleInfo(elementIndex) {
    // 清空Tag
    document
      .querySelectorAll(".tag-container")
      .forEach((item) => item.remove());

    // 设置文章信息
    const __title = document.querySelector("#typeTitle");
    const __content = document.querySelector("#typeContent");
    const __configData = artConfig.__proto__.config;
    __title.value = __configData[elementIndex].articleTitle;
    __content.value = __configData[elementIndex].articleContent;

    // 设置tag
    for (
      var tagIndex = 0;
      tagIndex < __configData[elementIndex].Tag.length;
      tagIndex++
    ) {
      createTag(
        __configData[elementIndex].Tag[tagIndex][0],
        __configData[elementIndex].Tag[tagIndex][1],
        __configData[elementIndex].Tag[tagIndex][2],
        tagIndex
      );
    }
  }

  __listTitle.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      fillArticleInfo(__listElement[index].dataset.artIndex);
      __showTagCount.innerHTML = __container.length;
      __sideList.style.transform = "translateX(-100%)";
    });
  });

  __listInfo.forEach((item, index) => {
    item.addEventListener("click", () => {
      fillArticleInfo(__listElement[index].dataset.artIndex);
      __showTagCount.innerHTML = __container.length;
      __sideList.style.transform = "translateX(-100%)";
    });
  });
}

/**
 * @name listenterContentChange
 * @description 监听输入框判读是否有文本输入
 */
function listenterContentChange() {
  const __input = document.querySelectorAll("[type=text]");
  const __textarea = document.querySelector("textarea");
  const __control_main_bar = document.querySelector(".compass-function");
  __input.forEach((__item) => {
    __item.addEventListener("input", (__target) => {
      {
        __control_main_bar.style.transform = "translateY(0)";
      }
    });

    __item.addEventListener("blur", (__target) => {
      {
        __control_main_bar.style.transform = "translateY(40px)";
      }
    });
  });

  __textarea.addEventListener("input", () => {
    __control_main_bar.style.transform = "translateY(0)";
  });
  __textarea.addEventListener("blur", () => {
    __control_main_bar.style.transform = "translateY(40px)";
  });
}
