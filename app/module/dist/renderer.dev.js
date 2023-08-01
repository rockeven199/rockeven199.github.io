"use strict";

window.onload = function () {
  var dataArray = [];
  dataArray = selectTagOption(dataArray);
  toggleControlPreview();
  previewWindowFunctions();
  addTag();
  reset();
  removeTag();
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
 * @description toggle preview window
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
 * @naem previewWindowFunctions
 * @description previewEditerContent
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
    }

    if (moveX < 0) {
      moveX = 0;
    } else if (moveX > window.innerWidth - previewContainer.offsetWidth) {
      moveX = window.innerWidth - previewContainer.offsetWidth;
    }

    if (moveY < 0) {
      moveY = 0;
    } else if (moveY > window.innerHeight - previewContainer.offsetHeight) {
      moveY = window.innerHeight - previewContainer.offsetHeight;
    }

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
 * @description add tag
 */


function addTag() {
  var addTag = document.querySelector("#addTag");
  addTag.addEventListener("click", function () {
    var showTagContainer = document.querySelector(".show-tag");
    var tagContainer = document.createElement("div");
    var checkElement = document.createElement("input");
    var inputElement = document.createElement("input");
    tagContainer.setAttribute("class", "tag-container");
    inputElement.type = "text";
    inputElement.classList = "select-values";
    checkElement.type = "checkbox";
    checkElement.classList = "tag-select-check";
    tagContainer.append(checkElement);
    tagContainer.append(inputElement);
    showTagContainer.append(tagContainer);
  });
}
/**
 * @name removeTag
 * @description remove tag
 */


function removeTag() {} // document.querySelector();

/**
 * @name reset edit
 * @description reset button
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