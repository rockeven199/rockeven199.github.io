function outputError(errorFunction,errorTitle) {
  console.error();
}

/**
 * @param {elementObject} containElement
 * @param {cssSelector} containClass
 * @returns
 */
function hasSameClass(containElement, containClass) {
  try {
    if (element.classList.contain(containClass)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("hasSameClassError:" + error);
  }
}

/**
 * @param {elementObject} Element
 * @param {cssSelector} classSelectorName
 */
function removeClass(Element, classSelectorName) {
  try {
    Element.classList.remove(classSelectorName);
  } catch (error) {
    console.log("removeClassError:" + error);
  }
}

/**
 *
 * @param {elementObject} Element
 * @returns
 */
function hasChecked(Element) {
  try {
    if (Element.checked) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("hasCheckedError:\n" + error);
  }
}
