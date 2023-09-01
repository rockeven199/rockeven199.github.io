window.onload = () => {
  let dataArray = [];

  // dataArray = selectTagOption(dataArray);
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
  const optionContainer = document.querySelectorAll(".tag-container");
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
          console.log(element.target);
          // if (dataArray.indexOf(element.target.children[1].value) != -1) {
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
  }

  // To click checkbox
  const optionsCheckBox = document.querySelectorAll("#tag-select-check");
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
      console.log(dataArray);
    });
  }
  return dataArray;
}

/**
 * @name toggleControlPreview
 * @description 切换预览窗口
 */
function toggleControlPreview() {
  const previewContainer = document.querySelector(".preview-container");
  const togglePreview = document.querySelector(".control-preview");
  togglePreview.addEventListener("click", (Element) => {
    if (Element.target.dataset.openpreview == "ture") {
      previewContainer.style.zIndex = "-1";
      Element.target.dataset.openpreview = false;
    } else {
      previewContainer.style.zIndex = "999";
      Element.target.dataset.openpreview = true;
    }
  });

  const closePreview = document.querySelector(".close-bar-button");
  closePreview.addEventListener("click", (Element) => {
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
  const textarea = document.querySelector("textarea");
  const outputArea = document.querySelector(".output-area");
  textarea.addEventListener("input", () => {
    outputArea.innerHTML = marked.parse(textarea.value);
  });

  // dragWindow
  canDrag = false;
  diffX = 0;
  diffY = 0;
  moveX = 0;
  moveY = 0;
  const previewContainer = document.querySelector(".preview-container");
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

  document.querySelector(".preview-container");
}

/**
 * @name addTag
 * @description 添加Tag
 */
function addTag() {
  let count = 0;
  const addTag = document.querySelector("#addTag");
  addTag.addEventListener("click", () => {
    const showTagContainer = document.querySelector(".show-tag");
    const tagContainer = document.createElement("div");
    const checkElement = document.createElement("input");
    const inputElement = document.createElement("input");
    const nameElement = document.createElement("input");
    const selectColor = document.createElement("input");

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
  const removeButton = document.querySelector("#removeTag");
  removeButton.addEventListener("click", () => {
    const allTag = document.querySelectorAll(".tag-container");
    let selectedElement = [];
    allTag.forEach((item1) => {
      if (item1.firstElementChild.checked) {
        selectedElement.push(item1);
      }

      if (selectedElement.length == 0) {
        if (allTag.length != 0) {
          allTag[allTag.length - 1].remove();
        }
      } else {
        selectedElement.forEach((item2) => {
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
  const selectAllButton = document.querySelector("#selectAll");
  var flag = false;
  selectAllButton.addEventListener("click", () => {
    const selectBox = document.querySelectorAll("[type='checkbox']");
    if (flag === false) {
      selectBox.forEach((item) => {
        item.checked = true;
      });
      flag = true;
    } else {
      selectBox.forEach((item) => {
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
  const title = document.querySelector("#typeTitle");
  const content = document.querySelector("#typeContent");
  const reset = document.querySelector(".reset");

  reset.addEventListener("click", () => {
    if (confirm("确认清空操作吗？？？（不可恢复）")) {
      title.value = "";
      content.value = "";
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

function submitChange() {
  const submitButton = document.querySelector(".submit");
  let allTag = [];
  let submitedContent = {};

  // 获取tag
  function getTag(allTag) {
    let tagArr = [];
    const tagElement = document.querySelectorAll(".tag-select-check");
    tagElement.forEach((item2) => {
      if (tagArr.length == 3) {
        allTag.push(tagArr);
        tagArr = [];
      }
      tagArr.push("Tag");
      tagArr.push(item2.nextElementSibling.value);
      tagArr.push(item2.nextElementSibling.nextElementSibling.value);
      allTag.push(tagArr);
    });
  }

  // 获取发布时间
  function getPubTime() {
    const date = new Date();
    let pubtime = ``;
    pubtime = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    return pubtime;
  }

  // 获取文章标题
  function getArticleTitle() {
    const articleTitle = document.querySelector("#typeTitle").value;
    return articleTitle;
  }

  // 获取文章简介
  function getInfoContent() {
    const info = document.querySelector("textarea").value.substring(0, 30);
    return info;
  }

  // 单击提交
  submitButton.addEventListener("click", () => {
    if (confirm("确认提交？")) {
      getTag(allTag);
      let pubtime = getPubTime();
      let articleTitle = getArticleTitle();
      let infoContent = getInfoContent();
      const date = new Date();
      let tempMonth = "";
      let tempDay = "";

      date.getMonth().length != 2
        ? (tempMonth = "0" + date.getMonth().toString())
        : (tempMonth = date.getMonth().toString());
      date.getDay().length != 2
        ? (tempDay = "0" + date.getDay())
        : (tempDay = date.getDay());

      submitedContent.Tag = allTag;
      submitedContent.pubDate = pubtime;
      submitedContent.authorName = "Rockeven199";
      submitedContent.articleTitle = articleTitle;
      submitedContent.articleContent = infoContent;
      submitedContent.articleUrl =
        "../article/content/" +
        date.getFullYear().toString() +
        tempMonth +
        tempDay +
        ".md";

      console.log(submitedContent);
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
      const submitButton = document.querySelector(".submit");
      submitButton.click();
    }
  });
}

/**
 * @name selectConfigFile
 * @description 选择配置文件
 */

function selectConfigFile() {
  const mask = document.querySelector(".mask-container");
  const selectFileButton = document.querySelector("#selectFile");
  selectFileButton.addEventListener("click", () => {
    window.doSelectConfig.doSelectFile((value) => {
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
  const listBar = document.querySelector(".article-list-control-bar");
  const listContainer = document.querySelector(".article-list-container");
  var showList = true;
  listBar.addEventListener("click", (event) => {
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
  let listElement = document.querySelectorAll(".article-group");
  let listTitle = document.querySelectorAll(".article-title");
  let listInfo = document.querySelectorAll(".other-info");

  // 赋值给函数内全局对象
  var artConfig = new Object();
  artConfig.__proto__.config;
  window.sendConfig.fetchArtConfig(
    (config) => (artConfig.__proto__.config = config)
  );

  /**
   * @description 创建tag
   * @param {*} tagName
   * @param {*} tagContent
   * @param {*} tagIndex
   * @param {*} tagColor
   */
  function createTag(tagName, tagContent, tagIndex, tagColor) {
    const container = document.createElement("div");
    container.dataset.articleIndex = tagIndex;
    container.classList.add("tag-container");

    const checkBox = document.createElement("input");
    checkBox.classList.add("tag-select-check");
    checkBox.type = "checkbox";

    const tagNameEntry = document.createElement("input");
    tagNameEntry.id = "tag-name";
    tagNameEntry.type = "text";
    tagNameEntry.value = tagName;

    const content = document.createElement("input");
    content.id = "tag-content";
    content.classList.add("select-values");
    content.value = tagContent;

    const color = document.createElement("input");
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
    const title = document.querySelector("#typeTitle");
    const content = document.querySelector("#typeContent");
    const configData = artConfig.__proto__.config;
    title.value = configData[elementIndex].articleTitle;
    content.value = configData[elementIndex].articleContent;
    console.log(configData[elementIndex]);
  }

  listTitle.forEach((item, index) => {
    item.addEventListener("click", () => {
      fillArticleInfo(listElement[index].dataset.artIndex);
    });
  });

  listInfo.forEach((item, index) => {
    item.addEventListener("click", () => {
      fillArticleInfo(listElement[index].dataset.artIndex);
    });
  });
}
