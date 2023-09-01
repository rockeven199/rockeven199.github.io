"use strict";

window.onload = function () {
  var dataArray = []; // dataArray = selectTagOption(dataArray);

  toggleControlPreview();
  previewWindowFunctions();
  addTag();
  reset();
  hotkeySubmit();
  removeTag();
  selectAll();
  submitChange();
  selectConfigFile();
  controlArticleList();
  openArticleInfo();
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
          } else {
            console.log(element.target); // if (dataArray.indexOf(element.target.children[1].value) != -1) {
            //   element.target.children[0].checked = true;
            //   console.log("already set this tag !!");
            // } else {
            //   dataArray.push(element.target.children[1].value);
            //   element.target.children[0].checked = true;
            // }
          }

          console.log(dataArray);
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

        console.log(dataArray);
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


function addTag() {
  var count = 0;
  var addTag = document.querySelector("#addTag");
  addTag.addEventListener("click", function () {
    var showTagContainer = document.querySelector(".show-tag");
    var tagContainer = document.createElement("div");
    var checkElement = document.createElement("input");
    var inputElement = document.createElement("input");
    var nameElement = document.createElement("input");
    var selectColor = document.createElement("input");
    tagContainer.setAttribute("class", "tag-container");
    inputElement.type = "text";
    inputElement.classList = "select-values";
    checkElement.type = "checkbox";
    checkElement.classList = "tag-select-check";
    nameElement.type = "text";
    nameElement.id = "tag-name";
    selectColor.type = "color";
    selectColor.id = "select-color";
    tagContainer.append(checkElement);
    tagContainer.append(nameElement);
    tagContainer.append(inputElement);
    tagContainer.append(selectColor);
    showTagContainer.append(tagContainer);
  });
}
/**
 * @name removeTag
 * @description 删除Tag
 */


function removeTag() {
  var removeButton = document.querySelector("#removeTag");
  removeButton.addEventListener("click", function () {
    var allTag = document.querySelectorAll(".tag-container");
    var selectedElement = [];
    allTag.forEach(function (item1) {
      if (item1.firstElementChild.checked) {
        selectedElement.push(item1);
      }

      if (selectedElement.length == 0) {
        if (allTag.length != 0) {
          allTag[allTag.length - 1].remove();
        }
      } else {
        selectedElement.forEach(function (item2) {
          item2.remove();
        });
      }
    });
  });
}
/**
 * @name selectAllTag
 * @description 全选tag
 */


function selectAll() {
  var selectAllButton = document.querySelector("#selectAll");
  var flag = false;
  selectAllButton.addEventListener("click", function () {
    var selectBox = document.querySelectorAll("[type='checkbox']");

    if (flag === false) {
      selectBox.forEach(function (item) {
        item.checked = true;
      });
      flag = true;
    } else {
      selectBox.forEach(function (item) {
        item.checked = false;
      });
      flag = false;
    }
  });
}
/**
 * @name resetEdit
 * @description 重置页面操作
 */


function reset() {
  var title = document.querySelector("#typeTitle");
  var content = document.querySelector("#typeContent");
  var reset = document.querySelector(".reset");
  reset.addEventListener("click", function () {
    if (confirm("确认清空操作吗？？？（不可恢复）")) {
      title.value = "";
      content.value = "";
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


function submitChange() {
  var submitButton = document.querySelector(".submit");
  var allTag = [];
  var submitedContent = {}; // 获取tag

  function getTag(allTag) {
    var tagArr = [];
    var tagElement = document.querySelectorAll(".tag-select-check");
    tagElement.forEach(function (item2) {
      if (tagArr.length == 3) {
        allTag.push(tagArr);
        tagArr = [];
      }

      tagArr.push("Tag");
      tagArr.push(item2.nextElementSibling.value);
      tagArr.push(item2.nextElementSibling.nextElementSibling.value);
      allTag.push(tagArr);
    });
  } // 获取发布时间


  function getPubTime() {
    var date = new Date();
    var pubtime = "";
    pubtime = "".concat(date.getFullYear(), "-").concat(date.getMonth(), "-").concat(date.getDay());
    return pubtime;
  } // 获取文章标题


  function getArticleTitle() {
    var articleTitle = document.querySelector("#typeTitle").value;
    return articleTitle;
  } // 获取文章简介


  function getInfoContent() {
    var info = document.querySelector("textarea").value.substring(0, 30);
    return info;
  } // 单击提交


  submitButton.addEventListener("click", function () {
    if (confirm("确认提交？")) {
      getTag(allTag);
      var pubtime = getPubTime();
      var articleTitle = getArticleTitle();
      var infoContent = getInfoContent();
      var date = new Date();
      var tempMonth = "";
      var tempDay = "";
      date.getMonth().length != 2 ? tempMonth = "0" + date.getMonth().toString() : tempMonth = date.getMonth().toString();
      date.getDay().length != 2 ? tempDay = "0" + date.getDay() : tempDay = date.getDay();
      submitedContent.Tag = allTag;
      submitedContent.pubDate = pubtime;
      submitedContent.authorName = "Rockeven199";
      submitedContent.articleTitle = articleTitle;
      submitedContent.articleContent = infoContent;
      submitedContent.articleUrl = "../article/content/" + date.getFullYear().toString() + tempMonth + tempDay + ".md";
      console.log(submitedContent);
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
      var submitButton = document.querySelector(".submit");
      submitButton.click();
    }
  });
}
/**
 * @name selectConfigFile
 * @description 选择配置文件
 */


function selectConfigFile() {
  var mask = document.querySelector(".mask-container");
  var selectFileButton = document.querySelector("#selectFile");
  selectFileButton.addEventListener("click", function () {
    window.doSelectConfig.doSelectFile(function (value) {
      if (!value[0].canceled) {
        mask.style.display = "none";
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
  var listBar = document.querySelector(".article-list-control-bar");
  var listContainer = document.querySelector(".article-list-container");
  var showList = true;
  listBar.addEventListener("click", function (event) {
    if (!showList) {
      listContainer.style.transform = "translateX(0)";
      showList = true;
    } else {
      listContainer.style.transform = "translateX(-100%)";
      showList = false;
    }
  });
}
/**
 * @name openArticleInfo 填充文章信息
 */


function openArticleInfo() {
  var listElement = document.querySelectorAll(".article-group");
  var listTitle = document.querySelectorAll(".article-title");
  var listInfo = document.querySelectorAll(".other-info"); // 赋值给函数内全局对象

  var artConfig = new Object();
  artConfig.__proto__.config;
  window.sendConfig.fetchArtConfig(function (config) {
    return artConfig.__proto__.config = config;
  });
  /**
   * @description 创建tag
   * @param {*} tagName
   * @param {*} tagContent
   * @param {*} tagIndex
   * @param {*} tagColor
   */

  function createTag(tagName, tagContent, tagIndex, tagColor) {
    var container = document.createElement("div");
    container.dataset.articleIndex = tagIndex;
    container.classList.add("tag-container");
    var checkBox = document.createElement("input");
    checkBox.classList.add("tag-select-check");
    checkBox.type = "checkbox";
    var tagNameEntry = document.createElement("input");
    tagNameEntry.id = "tag-name";
    tagNameEntry.type = "text";
    tagNameEntry.value = tagName;
    var content = document.createElement("input");
    content.id = "tag-content";
    content.classList.add("select-values");
    content.value = tagContent;
    var color = document.createElement("input");
    color.type = "color";
    color.id = "select-color";
    color.value = tagColor;
    container.appendChild(checkBox);
    container.appendChild(tagNameEntry);
    container.appendChild(content);
    container.appendChild(color);
    document.querySelector(".show-tag").appendChild(container);
  }
  /**
   * @description 填充文章信息
   * @param {*} artTitle
   * @param {*} artContent
   */


  function fillArticleInfo(elementIndex) {
    var title = document.querySelector("#typeTitle");
    var content = document.querySelector("#typeContent");
    var configData = artConfig.__proto__.config;
    title.value = configData[elementIndex].articleTitle;
    content.value = configData[elementIndex].articleContent;
    console.log(configData[elementIndex]);
  }

  listTitle.forEach(function (item, index) {
    item.addEventListener("click", function () {
      fillArticleInfo(listElement[index].dataset.artIndex);
    });
  });
  listInfo.forEach(function (item, index) {
    item.addEventListener("click", function () {
      fillArticleInfo(listElement[index].dataset.artIndex);
    });
  });
}