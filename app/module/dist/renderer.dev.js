"use strict";

window.onload = function () {
  var dataArray = [];

  var artConfig = function artConfig() {
    return new Object();
  }; // dataArray = selectTagOption(dataArray);


  toggleControlPreview();
  previewWindowFunctions();
  addTag(artConfig);
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


function selectTagOption(dataArray) {
  //To click container
  var optionContainer = document.querySelectorAll(".tag-container");
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = optionContainer[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      i.addEventListener("click", function (element) {
        if (element.target.className != "tag-select-check") {
          if (hasChecked(element.target.children[0])) {
            dataArray.splice(dataArray.indexOf(element.target.children[1].value, dataArray.indexOf(element.target.children[1].value == 0) ? element.target.children[1].value + 1 : element.target.children[1].value - 1));
            element.target.children[0].checked = false;
          } else {// if (dataArray.indexOf(element.target.children[1].value) != -1) {
            //   element.target.children[0].checked = true;
            //   console.log("already set this tag !!");
            // } else {
            //   dataArray.push(element.target.children[1].value);
            //   element.target.children[0].checked = true;
            // }
          }
        }
      });
    } // To click checkbox

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var optionsCheckBox = document.querySelectorAll("#tag-select-check");
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = optionsCheckBox[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var j = _step2.value;
      j.addEventListener("click", function (Element) {
        if (Element.target.id == "tag-select-check") {
          if (hasChecked(Element.target) == false) {
            dataArray.splice(dataArray.indexOf(Element.target.nextElementSibling.value, dataArray.indexOf(Element.target.nextElementSibling.value == 0) ? Element.target.nextElementSibling.value + 1 : Element.target.nextElementSibling.value - 1));
            Element.target.setAttribute("checked", "false");
          } else {
            if (dataArray.indexOf(Element.target.nextElementSibling.value) != -1) {
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
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return dataArray;
}
/**
 * @name toggleControlPreview
 * @description 切换预览窗口
 */


function toggleControlPreview() {
  var previewContainer = document.querySelector(".preview-container");
  var togglePreview = document.querySelector(".control-preview");
  togglePreview.addEventListener("click", function (Element) {
    if (Element.target.dataset.openpreview == "ture") {
      previewContainer.style.zIndex = "-1";
      Element.target.dataset.openpreview = false;
    } else {
      previewContainer.style.zIndex = "999";
      Element.target.dataset.openpreview = true;
    }
  });
  var closePreview = document.querySelector(".close-bar-button");
  closePreview.addEventListener("click", function (Element) {
    previewContainer.style.zIndex = "-1";
    Element.target.dataset.openpreview = false;
  });
}
/**
 * @name previewEditerContent
 * @description 预览功能实现
 */


function previewWindowFunctions() {
  // inputContent
  var textarea = document.querySelector("textarea");
  var outputArea = document.querySelector(".output-area");
  textarea.addEventListener("input", function () {
    outputArea.innerHTML = marked.parse(textarea.value);
  }); // dragWindow

  canDrag = false;
  diffX = 0;
  diffY = 0;
  moveX = 0;
  moveY = 0;
  var previewContainer = document.querySelector(".preview-container");
  previewContainer.addEventListener("mousedown", function (event) {
    canDrag = true;
    diffx = event.clientX - previewContainer.offsetLeft;
    diffY = event.clientY - previewContainer.offsetTop;
  });
  previewContainer.addEventListener("mousemove", function (event) {
    if (canDrag == true) {
      moveX = event.clientX - diffx;
      moveY = event.clientY - diffY;
    } // if (moveX < 0) {
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
  previewContainer.addEventListener("mouseup", function () {
    canDrag = false;
  });
  document.querySelector(".preview-container");
}
/**
 * @name addTag
 * @description 添加Tag
 */


function addTag(artConfig) {
  var __addTag = document.querySelector("#addTag");

  var __click_svg = document.querySelector(".control-button");

  var __control_bar = document.querySelector(".control-bar");

  var __showTagCount = document.querySelector(".show-tag-count");

  var __flag = false;
  var __count = __showTagCount.innerHTML;

  __addTag.addEventListener("click", function () {
    // 添加标签
    var __showTagContainer = document.querySelector(".show-tag");

    var __tagContainer = document.createElement("div");

    var __checkElement = document.createElement("input");

    var __inputElement = document.createElement("input");

    var __nameElement = document.createElement("input");

    var __selectColor = document.createElement("input");

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

    __showTagContainer.append(__tagContainer); // 标签总数计算


    __showTagCount.innerHTML = __count++;
    artConfig.__proto__.tagCount = __count;
  });

  __click_svg.addEventListener("click", function () {
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
  var __removeButton = document.querySelector("#removeTag");

  var __showTagCount = document.querySelector(".show-tag-count");

  __removeButton.addEventListener("click", function () {
    var __allTag = document.querySelectorAll(".tag-container");

    var __selectedElement = [];

    __allTag.forEach(function (__item1) {
      if (__item1.firstElementChild.checked) {
        __selectedElement.push(__item1);
      }

      if (__selectedElement.length == 0) {
        if (__allTag.length != 0) {
          __allTag[__allTag.length - 1].remove();
        }
      } else {
        __selectedElement.forEach(function (__item2) {
          __item2.remove();
        });
      }
    });

    __showTagCount.innerHTML = __artConfig.__proto__.tagCount-- > 0 ? __artConfig.__proto__.tagCount-- : __artConfig.__proto__.tagCount = 0; // __artConfig.__proto__.tagCount = __artConfig.__proto__.tagCount--;
  });
}
/**
 * @name selectAllTag
 * @description 全选tag
 */


function selectAll() {
  var __selectAllButton = document.querySelector("#selectAll");

  var __flag = false;

  __selectAllButton.addEventListener("click", function () {
    var selectBox = document.querySelectorAll("[type='checkbox']");

    if (__flag === false) {
      selectBox.forEach(function (item) {
        item.checked = true;
      });
      __flag = true;
    } else {
      selectBox.forEach(function (item) {
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
  var __title = document.querySelector("#typeTitle");

  var __content = document.querySelector("#typeContent");

  var __reset = document.querySelector(".reset");

  __reset.addEventListener("click", function () {
    if (confirm("确认清空操作吗？？？（不可恢复）")) {
      __title.value = "";
      __content.value = "";
      var allTag = document.querySelectorAll(".tag-container");
      allTag.forEach(function (item) {
        item.remove();
      });
    }
  });
}
/**
 * @name submitChange
 * @description 提交更改
 */


function submitChange(artConfig) {
  var submitButton = document.querySelector(".submit");
  var __allTag = [];
  var __submitedContent = {}; // 获取tag

  function getTag(__allTag) {
    var __tagArr = [];

    var __tagElement = document.querySelectorAll(".tag-select-check");

    if (__tagElement.length != 0) {
      __tagElement.forEach(function (__item2) {
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
  } // 获取发布时间


  function getPubTime() {
    var __pubDate = document.querySelector(""); // const date = new Date();
    // let pubtime = ``;
    // pubtime = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;


    return pubtime;
  } // 获取文章标题


  function getArticleTitle() {
    var __articleTitle = document.querySelector("#typeTitle").value;

    if (__articleTitle.value != "") {
      return __articleTitle;
    } else {
      return false;
    }
  } // 获取文章简介


  function getInfoContent() {
    var __info = document.querySelector("textarea").value.substring(0, 30);

    return __info;
  }
  /**
   * @description 获取文章内容
   * @returns false|context
   */


  function getContext() {
    var __context = document.querySelector("textarea").value;

    if (__context.value != "") {
      return __context;
    } else {
      return false;
    }
  }

  function findSameArticle(__articleTitle) {
    var __artList = artConfig.__proto__.config;
    __artList.some(function (item) {
      return item.articleTitle == __articleTitle;
    }) ? __artList.haveSameArticle = true : __artList.haveSameArticle = false;
    return __artList;
  } // 单击提交


  submitButton.addEventListener("click", function () {
    if (confirm("确认提交？")) {
      var __tag = getTag(__allTag);

      var __pubtime = getPubTime();

      var __articleTitle = getArticleTitle();

      var __infoContent = getInfoContent();

      var __context = getContext();

      var __artList = findSameArticle(__articleTitle);

      if (__artList.haveSameArticle === true) {
        __artList.forEach(function (__item) {
          console.log(__item.pubDate + __pubtime);
        });
      }

      if (__tag != false && __articleTitle != false && __infoContent != false && __context != false) {
        var date = new Date();
        var __tempMonth = "";
        var __tempDay = "";
        date.getMonth().length != 2 ? __tempMonth = "0" + date.getMonth().toString() : __tempMonth = date.getMonth().toString();
        date.getDay().length != 2 ? __tempDay = "0" + date.getDay() : __tempDay = date.getDay();
        __submitedContent.Tag = __allTag;
        __submitedContent.pubDate = __pubtime;
        __submitedContent.authorName = "Rockeven199";
        __submitedContent.articleTitle = __articleTitle;
        __submitedContent.articleContent = __infoContent;
        __submitedContent.articleUrl = "../article/content/" + date.getFullYear().toString() + __empMonth + __empDay + ".md";
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
  window.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      var __submitButton = document.querySelector(".submit");

      __submitButton.click();
    }
  });
}
/**
 * @name selectConfigFile
 * @description 选择配置文件
 */


function selectConfigFile() {
  var __mask = document.querySelector(".mask-container");

  var __selectFileButton = document.querySelector("#selectFile");

  __selectFileButton.addEventListener("click", function () {
    window.doSelectConfig.doSelectFile(function (value) {
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
  var __listBar = document.querySelector(".article-list-control-bar");

  var __listContainer = document.querySelector(".article-list-container");

  var __showList = false;

  __listBar.addEventListener("click", function (event) {
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
  var __listElement = document.querySelectorAll(".article-group");

  var __listTitle = document.querySelectorAll(".article-title");

  var __listInfo = document.querySelectorAll(".other-info");

  var __showTagCount = document.querySelector(".show-tag-count");

  var __container = document.querySelectorAll(".tag-container");

  artConfig.__proto__.config;
  window.sendConfig.fetchArtConfig(function (config) {
    return artConfig.__proto__.config = config;
  });
  /**
   * @description 创建tag
   * @param {*} __tagName
   * @param {*} __tagContent
   * @param {*} __tagIndex
   * @param {*} __tagColor
   */

  function createTag(__tagName, __tagContent, __tagColor, __tagIndex) {
    var __container = document.createElement("div");

    __container.dataset.articleIndex = __tagIndex;

    __container.classList.add("tag-container");

    var __checkBox = document.createElement("input");

    __checkBox.classList.add("tag-select-check");

    __checkBox.type = "checkbox";

    var __tagNameEntry = document.createElement("input");

    __tagNameEntry.id = "tag-name";
    __tagNameEntry.type = "text";
    __tagNameEntry.value = __tagName;

    var __content = document.createElement("input");

    __content.id = "tag-content";

    __content.classList.add("select-values");

    __content.value = __tagContent;

    var __color = document.createElement("input");

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
    document.querySelectorAll(".tag-container").forEach(function (item) {
      return item.remove();
    }); // 设置文章信息

    var __title = document.querySelector("#typeTitle");

    var __content = document.querySelector("#typeContent");

    var __configData = artConfig.__proto__.config;
    __title.value = __configData[elementIndex].articleTitle;
    __content.value = __configData[elementIndex].articleContent; // 设置tag

    for (var tagIndex = 0; tagIndex < __configData[elementIndex].Tag.length; tagIndex++) {
      createTag(__configData[elementIndex].Tag[tagIndex][0], __configData[elementIndex].Tag[tagIndex][1], __configData[elementIndex].Tag[tagIndex][2], tagIndex);
    }
  }

  __listTitle.forEach(function (item, index) {
    item.addEventListener("click", function (event) {
      fillArticleInfo(__listElement[index].dataset.artIndex);
      __showTagCount.innerHTML = __container.length;
    });
  });

  __listInfo.forEach(function (item, index) {
    item.addEventListener("click", function () {
      fillArticleInfo(__listElement[index].dataset.artIndex);
      __showTagCount.innerHTML = __container.length;
    });
  });
}
/**
 * @name listenterContentChange
 * @description 监听输入框判读是否有文本输入
 */


function listenterContentChange() {
  var __input = document.querySelectorAll("[type=text]");

  var __textarea = document.querySelector("textarea");

  var __control_main_bar = document.querySelector(".compass-function");

  __input.forEach(function (__item) {
    __item.addEventListener("input", function (__target) {
      {
        __control_main_bar.style.transform = "translateY(0)";
      }
    });

    __item.addEventListener("blur", function (__target) {
      {
        __control_main_bar.style.transform = "translateY(40px)";
      }
    });
  });

  __textarea.addEventListener("input", function () {
    __control_main_bar.style.transform = "translateY(0)";
  });

  __textarea.addEventListener("blur", function () {
    __control_main_bar.style.transform = "translateY(40px)";
  });
}