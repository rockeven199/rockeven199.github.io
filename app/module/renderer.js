window.onload = () => {
  let dataArray = [];

  dataArray = selectTagOption(dataArray);
  toggleControlPreview();
  previewWindowFunctions();
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
      if ((element.target.className != "tag-select-check")) {
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
          console.log(element.target)
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
 * @description toggle preview window
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

  previewContainer.addEventListener("mouseup", () => {
    canDrag = false;
  });

  document.querySelector(".preview-container");
}
